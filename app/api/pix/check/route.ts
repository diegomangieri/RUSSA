import { NextResponse } from 'next/server'

const FRUITFY_API_URL = 'https://api.fruitfy.io'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID não fornecido' },
        { status: 400 }
      )
    }

    const apiToken = process.env.FRUITFY_API_TOKEN
    const rawStoreId = process.env.FRUITFY_STORE_ID || ''
    const storeId = rawStoreId.replace('Store-Id:', '').replace('Store-Id', '').trim()

    if (!apiToken || !storeId) {
      return NextResponse.json(
        { success: false, error: 'Chaves da API não configuradas' },
        { status: 500 }
      )
    }

    const response = await fetch(`${FRUITFY_API_URL}/api/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Store-Id': storeId,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Erro ao verificar status' },
        { status: response.status }
      )
    }

    // Verifica se o status é "paid" ou "approved"
    const isPaid = data.data?.status === 'paid' || data.data?.status === 'approved'

    return NextResponse.json({
      success: true,
      data: {
        orderId: orderId,
        status: data.data?.status || 'waiting_payment',
        isPaid: isPaid,
      },
    })
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
