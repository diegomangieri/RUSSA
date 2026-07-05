import { NextResponse } from 'next/server'
import { sendPurchaseEvent } from '@/lib/meta-capi'

// ============================================================================
// Webhook da Fruitfy.
//
// Configure este endpoint no painel da Fruitfy como URL de notificação:
//   https://SEU-DOMINIO/api/webhook/fruitfy
//
// Ele dispara SOMENTE quando a venda é paga e envia o evento de Purchase
// server-side (Conversions API) para o Meta, garantindo que a venda apareça
// no Gerenciador de Eventos. Usa event_id = order_id para deduplicar com o
// evento disparado pelo navegador (fbq) e pelo /api/capi/purchase.
// ============================================================================

// Considera pago qualquer um destes status
const PAID_STATUSES = ['paid', 'approved', 'completed', 'confirmed', 'success']

// Procura recursivamente uma chave (case-insensitive) dentro do payload,
// já que o formato exato do webhook da Fruitfy pode variar.
function findValue(obj: unknown, keys: string[]): unknown {
  if (!obj || typeof obj !== 'object') return undefined
  const lowerKeys = keys.map((k) => k.toLowerCase())
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (lowerKeys.includes(k.toLowerCase()) && v != null && typeof v !== 'object') {
      return v
    }
  }
  for (const v of Object.values(obj as Record<string, unknown>)) {
    if (v && typeof v === 'object') {
      const found = findValue(v, keys)
      if (found !== undefined) return found
    }
  }
  return undefined
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}))

    const status = String(
      findValue(payload, ['status', 'payment_status', 'order_status']) || '',
    ).toLowerCase()

    // Só dispara quando estiver pago
    if (!PAID_STATUSES.includes(status)) {
      return NextResponse.json({ received: true, ignored: true, status })
    }

    const orderId = String(
      findValue(payload, ['order_id', 'orderId', 'id', 'transaction_id']) || '',
    )

    // Valor pode vir em centavos ou em reais — normaliza para reais
    const rawAmount = Number(
      findValue(payload, ['amount', 'value', 'total', 'paid_amount']) || 0,
    )
    const value = rawAmount > 1000 ? rawAmount / 100 : rawAmount

    const email = findValue(payload, ['email', 'customer_email']) as string | undefined
    const phone = findValue(payload, ['phone', 'customer_phone', 'telephone']) as string | undefined

    if (!orderId) {
      return NextResponse.json({ received: true, error: 'order_id ausente' }, { status: 200 })
    }

    const result = await sendPurchaseEvent({
      eventId: orderId,
      value,
      currency: 'BRL',
      email,
      phone,
      contentName: 'Assinatura',
    })

    return NextResponse.json({ received: true, sent: result.ok, meta: result.body })
  } catch (error) {
    console.error('Erro no webhook da Fruitfy:', error)
    // Retorna 200 para a Fruitfy não ficar reenviando indefinidamente
    return NextResponse.json({ received: true, error: 'Erro interno' }, { status: 200 })
  }
}

// Alguns provedores validam o webhook com um GET antes de ativar
export async function GET() {
  return NextResponse.json({ ok: true, webhook: 'fruitfy' })
}
