import { NextResponse } from 'next/server'

const FRUITFY_API_URL = 'https://api.fruitfy.io'

// Gerar E-mail aleatorio
function generateRandomEmail(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let email = ''
  for (let i = 0; i < 10; i++) {
    email += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${email}@gmail.com`
}

// Gerar telefone aleatorio (formato brasileiro)
function generateRandomPhone(): string {
  const ddd = Math.floor(Math.random() * 90) + 10 // DDD entre 10-99
  const number = Math.floor(Math.random() * 900000000) + 100000000 // 9 digitos
  return `${ddd}${number}`
}

// Gerar CPF aleatorio valido
function generateRandomCPF(): string {
  const randomDigits = () => Math.floor(Math.random() * 9)
  
  const cpf = []
  for (let i = 0; i < 9; i++) {
    cpf.push(randomDigits())
  }
  
  // Calcula primeiro digito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += cpf[i] * (10 - i)
  }
  let firstDigit = (sum * 10) % 11
  if (firstDigit === 10) firstDigit = 0
  cpf.push(firstDigit)
  
  // Calcula segundo digito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += cpf[i] * (11 - i)
  }
  let secondDigit = (sum * 10) % 11
  if (secondDigit === 10) secondDigit = 0
  cpf.push(secondDigit)
  
  return cpf.join('')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, customerEmail, plan, productId } = body

    // Validacao basica - so precisa do email
    if (!amount || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos. Preencha todos os campos.' },
        { status: 400 }
      )
    }

    const apiToken = process.env.FRUITFY_API_TOKEN
    // Limpa o Store ID caso tenha vindo com prefixo "Store-Id: "
    const rawStoreId = process.env.FRUITFY_STORE_ID || ''
    const storeId = rawStoreId.replace('Store-Id:', '').replace('Store-Id', '').trim()
    const defaultProductId = process.env.FRUITFY_PRODUCT_ID

    if (!apiToken || !storeId) {
      return NextResponse.json(
        { success: false, error: 'Chaves da API não configuradas' },
        { status: 500 }
      )
    }

    // Gerar dados aleatorios (nome e email ficticios para a API)
    const randomPhone = generateRandomPhone()
    const randomCpf = generateRandomCPF()
    const randomEmail = generateRandomEmail()
    // Nome fixo como "Anônimo" - a criação de conta é fictícia
    const generatedName = 'Anônimo'

    // Valor em centavos (a API da Fruitfy espera centavos)
    const amountInCents = Math.round(amount * 100)

    const requestBody = {
      name: generatedName,
      email: randomEmail,
      phone: randomPhone,
      cpf: randomCpf,
      items: [
        {
          id: productId || defaultProductId,
          value: amountInCents,
          quantity: 1,
        },
      ],
    }

    const response = await fetch(`${FRUITFY_API_URL}/api/pix/charge`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Store-Id': storeId,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'pt_BR',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.message || 'Erro ao gerar PIX' },
        { status: response.status }
      )
    }

    // A resposta da Fruitfy vem no formato { success: true, data: { pix: { code, qr_code_base64 } } }
    const pixData = data.data.pix || {}
    
    return NextResponse.json({
      success: true,
      data: {
        orderId: data.data.order_id,
        qrCode: pixData.code,
        qrCodeImage: pixData.qr_code_base64,
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
