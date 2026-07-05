import { NextResponse } from 'next/server'
import { sendPurchaseEvent, getClientIp } from '@/lib/meta-capi'

// ============================================================================
// Webhook da Fruitfy.
//
// Configure este endpoint no painel da Fruitfy em Integrações > Webhooks,
// cadastrando a URL de notificação:
//   https://SEU-DOMINIO/api/webhook/fruitfy
//
// Ele dispara SOMENTE quando a venda é paga (evento "order_paid" /
// order.status === "paid") e envia o evento de Purchase server-side
// (Conversions API) para o Meta, garantindo que a venda apareça no
// Gerenciador de Eventos. Usa event_id = order.id para deduplicar com o
// evento disparado pelo navegador (fbq) e pelo /api/capi/purchase.
// ============================================================================

// Eventos/statuses que representam pagamento confirmado
const PAID_EVENTS = ['order_paid']
const PAID_STATUSES = ['paid', 'approved', 'completed', 'confirmed']

// Evita reprocessar o mesmo pedido (idempotência em memória).
// Para produção com múltiplas instâncias, o Meta já deduplica pelo event_id,
// então mesmo que dispare 2x a venda só é contada uma vez.
const processedOrders = new Set<string>()

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}))

    const event = String(payload?.event || '').toLowerCase()
    const order = payload?.order || {}
    const status = String(order?.status || payload?.status || '').toLowerCase()

    const isPaid = PAID_EVENTS.includes(event) || PAID_STATUSES.includes(status)

    // Só dispara quando estiver pago
    if (!isPaid) {
      return NextResponse.json({ received: true, ignored: true, event, status })
    }

    const orderId = String(order?.id || payload?.order_id || payload?.id || '')

    if (!orderId) {
      return NextResponse.json(
        { received: true, error: 'order.id ausente no payload' },
        { status: 200 },
      )
    }

    // Idempotência: se já processamos este pedido, não dispara de novo
    if (processedOrders.has(orderId)) {
      return NextResponse.json({ received: true, duplicated: true, orderId })
    }
    processedOrders.add(orderId)

    // Valor pago vem em centavos -> converte para reais
    const rawAmount = Number(
      order?.total_paid_amount ??
        order?.total_gross_amount ??
        order?.total_net_amount ??
        payload?.amount ??
        0,
    )
    const value = rawAmount / 100

    const customer = order?.customer || {}
    const email = customer?.email as string | undefined
    const phone = customer?.phone as string | undefined
    const fullName = customer?.name as string | undefined
    const document = customer?.document as string | undefined
    const contentName =
      order?.main_product?.name || order?.main_product_offer?.name || 'Assinatura'

    const result = await sendPurchaseEvent({
      eventId: orderId,
      value,
      currency: order?.currency || 'BRL',
      email,
      phone,
      fullName,
      document,
      clientIp: getClientIp(request),
      contentName,
    })

    return NextResponse.json({
      received: true,
      sent: result.ok,
      orderId,
      value,
      meta: result.body,
    })
  } catch (error) {
    console.error('Erro no webhook da Fruitfy:', error)
    // Retorna 200 para a Fruitfy não ficar reenviando indefinidamente
    return NextResponse.json({ received: true, error: 'Erro interno' }, { status: 200 })
  }
}

// A Fruitfy/alguns provedores podem validar o webhook com um GET antes de ativar
export async function GET() {
  return NextResponse.json({ ok: true, webhook: 'fruitfy' })
}
