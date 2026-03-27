import { NextResponse } from 'next/server'

const EXPFY_API_URL = 'https://expfypay.com/api/v1'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, description, customerName, customerEmail, plan } = body

    // Validação básica
    if (!amount || !customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const publicKey = process.env.EXPFY_PUBLIC_KEY
    const secretKey = process.env.EXPFY_SECRET_KEY

    if (!publicKey || !secretKey) {
      return NextResponse.json(
        { success: false, error: 'Chaves da API não configuradas' },
        { status: 500 }
      )
    }

    // Gerar ID externo único
    const externalId = `sydney_${plan}_${Date.now()}`

    const response = await fetch(`${EXPFY_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'X-Public-Key': publicKey,
        'X-Secret-Key': secretKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        description: description || `Assinatura ${plan} - Sydney VIP`,
        customer: {
          name: customerName,
          email: customerEmail,
        },
        external_id: externalId,
        callback_url: process.env.WEBHOOK_URL || '',
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Erro ao gerar PIX' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        transactionId: data.data.transaction_id,
        qrCode: data.data.qr_code,
        qrCodeImage: data.data.qr_code_image,
        amount: data.data.amount,
        status: data.data.status,
      },
    })
  } catch (error) {
    console.error('Erro ao processar pagamento PIX:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
