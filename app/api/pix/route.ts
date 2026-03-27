import { NextResponse } from 'next/server'

const FRUITFY_API_URL = 'https://api.fruitfy.io'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, customerName, customerEmail, customerPhone, customerCpf, plan, productId } = body

    // Validação básica
    if (!amount || !customerName || !customerEmail || !customerPhone || !customerCpf) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos. Preencha todos os campos.' },
        { status: 400 }
      )
    }

    const apiToken = process.env.FRUITFY_API_TOKEN
    const storeId = process.env.FRUITFY_STORE_ID
    const defaultProductId = process.env.FRUITFY_PRODUCT_ID

    if (!apiToken || !storeId) {
      return NextResponse.json(
        { success: false, error: 'Chaves da API não configuradas' },
        { status: 500 }
      )
    }

    // Valor em centavos (a API da Fruitfy espera centavos)
    const amountInCents = Math.round(amount * 100)

    const response = await fetch(`${FRUITFY_API_URL}/api/pix/charge`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Store-Id': storeId,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'pt_BR',
      },
      body: JSON.stringify({
        name: customerName,
        email: customerEmail,
        phone: customerPhone.replace(/\D/g, ''),
        cpf: customerCpf.replace(/\D/g, ''),
        items: [
          {
            id: productId || defaultProductId,
            value: amountInCents,
            quantity: 1,
          },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      console.error('Erro Fruitfy:', data)
      return NextResponse.json(
        { success: false, error: data.message || 'Erro ao gerar PIX' },
        { status: response.status }
      )
    }

    // A resposta da Fruitfy vem no formato { success: true, data: { ... } }
    return NextResponse.json({
      success: true,
      data: {
        orderId: data.data.order_uuid || data.data.id,
        qrCode: data.data.pix_qr_code || data.data.qr_code,
        qrCodeImage: data.data.pix_qr_code_base64 || data.data.qr_code_image,
        amount: amountInCents,
        status: data.data.status || 'waiting_payment',
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
