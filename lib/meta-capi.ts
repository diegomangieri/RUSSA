import crypto from 'crypto'

// ============================================================================
// Credenciais do Meta Pixel / Conversions API (CAPI) fixas no código.
// Assim, ao duplicar/gerar o projeto de novo, NÃO precisa reconfigurar nada.
// Se existir env var, ela tem prioridade sobre estes valores.
// ============================================================================
export const META_PIXEL_ID = process.env.META_PIXEL_ID || '1334045988921801'
export const META_CAPI_TOKEN =
  process.env.META_CAPI_TOKEN ||
  'EAAVkvItA744BR2N1F7FzQZBtSH4T8aYWIx9VTZC4cCCn59ZAsi93XfVga4n4NUbp2YPIZCpQAm42nv21NqFydGn5wIBbZAOmcVWYVuUfDoLmjGJ11Fi2CYVgooHLQEHEJb6r6FsqhysWZA426ZBK7Qd3ynxUIlh0CHMUn8O7pViuzWOUraFVtxQvrFZBVisTtgZDZD'

const GRAPH_API_VERSION = 'v21.0'

// Faz o hash SHA-256 exigido pela Meta para dados pessoais (email, telefone...)
function hashSHA256(value?: string | null): string | undefined {
  if (!value) return undefined
  const normalized = value.trim().toLowerCase()
  if (!normalized) return undefined
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

export type PurchaseEventInput = {
  /** ID único do evento (usamos o orderId) para deduplicar com o Pixel do navegador */
  eventId: string
  value: number
  currency?: string
  email?: string | null
  phone?: string | null
  clientIp?: string | null
  userAgent?: string | null
  /** cookie _fbp do navegador */
  fbp?: string | null
  /** cookie _fbc do navegador */
  fbc?: string | null
  eventSourceUrl?: string | null
  contentName?: string | null
}

/**
 * Envia o evento de "Purchase" server-side para o Meta (Conversions API).
 * É isso que garante que a venda apareça no Gerenciador de Eventos, mesmo
 * quando o Pixel do navegador é bloqueado. Usa event_id = orderId para que
 * o Meta deduplique com o evento disparado pelo navegador (fbq).
 */
export async function sendPurchaseEvent(input: PurchaseEventInput): Promise<{
  ok: boolean
  status: number
  body: unknown
}> {
  const userData: Record<string, unknown> = {}

  const emHash = hashSHA256(input.email)
  if (emHash) userData.em = [emHash]

  const phHash = hashSHA256(input.phone?.replace(/\D/g, ''))
  if (phHash) userData.ph = [phHash]

  if (input.clientIp) userData.client_ip_address = input.clientIp
  if (input.userAgent) userData.client_user_agent = input.userAgent
  if (input.fbp) userData.fbp = input.fbp
  if (input.fbc) userData.fbc = input.fbc

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: 'website',
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: userData,
        custom_data: {
          value: input.value,
          currency: input.currency || 'BRL',
          ...(input.contentName ? { content_name: input.contentName } : {}),
        },
      },
    ],
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const body = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body }
}

/** Extrai o IP real do cliente a partir dos headers da requisição. */
export function getClientIp(request: Request): string | undefined {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return request.headers.get('x-real-ip') || undefined
}
