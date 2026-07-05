import { NextResponse } from 'next/server'
import { sendPurchaseEvent, getClientIp } from '@/lib/meta-capi'

/**
 * Disparo server-side do evento de Purchase, acionado pelo próprio site
 * assim que o pagamento é confirmado. Aproveita o IP, o user-agent e os
 * cookies do Facebook (_fbp / _fbc) do navegador do comprador para ter a
 * melhor qualidade de correspondência possível no Gerenciador de Eventos.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, value, fbp, fbc, email, phone, contentName, eventSourceUrl } = body

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'orderId ausente' }, { status: 400 })
    }

    const result = await sendPurchaseEvent({
      eventId: String(orderId),
      value: Number(value) || 0,
      currency: 'BRL',
      email,
      phone,
      fbp,
      fbc,
      clientIp: getClientIp(request),
      userAgent: request.headers.get('user-agent'),
      eventSourceUrl,
      contentName,
    })

    return NextResponse.json({ success: result.ok, data: result.body })
  } catch (error) {
    console.error('Erro no CAPI purchase:', error)
    return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 })
  }
}
