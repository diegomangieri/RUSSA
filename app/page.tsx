'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, ChevronDown, ChevronLeft, ChevronRight, Lock, Check, Crown, X, Images, Video, Loader2, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Quiz from "@/components/quiz"
import SubscriptionCard from "@/components/subscription-card"
import LockedPost, { ContentTabs } from "@/components/locked-post"


const testimonials = [
  {
    text: "Foi a melhor punheta que já bati! A buceta dela cheia de manchas é muito diferente, tava curioso pra ver como era 😂",
    user: "Lucas M.",
    time: "3 horas atrás"
  },
  {
    text: "Assinei sem esperar muito… mas quando vi os vídeos dela, pqp… que mulher absurda. Aquele vídeo dela pagando boquete é papo de loucura kkkkk",
    user: "Pedro R.",
    time: "1 dia atrás"
  },
  {
    text: "Não aguentei, assinei por curiosidade e fiquei viciado. A Ana é diferente de todas, gostosa demais! 😮‍💨",
    user: "Matheus S.",
    time: "2 dias atrás"
  },
  {
    text: "Corpo diferente e muito gostoso. Não consigo parar de ver os vídeos slkk",
    user: "Gabriel F.",
    time: "5 dias atrás"
  }
]

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="px-4 py-6 bg-white">
      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600" />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 text-zinc-600" />
        </button>

        <div className="overflow-hidden mx-8">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 h-[180px] flex flex-col justify-between">
                  <p className="text-sm text-foreground leading-relaxed">{`"${testimonial.text}"`}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{testimonial.user.charAt(0)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">{testimonial.user}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{testimonial.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-zinc-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function ProfileBio() {
  const [expanded, setExpanded] = useState(false)
  const bioText = 'ALBINA, GOSTOSA E SAFADA! 💗🤪🔥 Sou safadinha de verdade. E eu não vim pra brincar, vim pra ser a melhor. Aqui é vida real: putaria com tesão 💦, gozada de verdade 😌, boquete até engasgar 😝 e muito mais...'
  
  return (
    <div className="text-sm text-foreground leading-relaxed">
      {expanded ? (
        <>
          <p>{bioText}</p>
          <button 
            onClick={() => setExpanded(false)}
            className="text-primary font-medium mt-1 hover:underline"
          >
            Ver menos
          </button>
        </>
      ) : (
        <>
          <p className="line-clamp-2">{bioText}</p>
          <button 
            onClick={() => setExpanded(true)}
            className="text-primary font-medium mt-1 hover:underline"
          >
            Ver mais
          </button>
        </>
      )}
    </div>
  )
}



// Lê um cookie pelo nome (usado para pegar os cookies do Facebook _fbp/_fbc)
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : undefined
}

// Chaves de rastreamento que queremos capturar e persistir.
const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  // Parâmetros de clique / UTMify (ajudam no match da origem)
  'src',
  'sck',
  'fbclid',
  'gclid',
  'ttclid',
]

const UTM_STORAGE_KEY = 'russa_tracking_params'

// Preço do order bump (Grupo VIP no WhatsApp)
const ORDER_BUMP_PRICE = 9.9

// Formata um número para o padrão de preço brasileiro (R$ 00,00)
function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

// Captura os parâmetros de rastreamento da URL atual e os persiste em
// localStorage. Deve rodar assim que a pessoa entra no site (com os parâmetros
// do anúncio na URL), para não perder a origem caso a URL mude depois.
function captureTrackingParams(): void {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(window.location.search)
    const captured: Record<string, string> = {}
    TRACKING_KEYS.forEach((k) => {
      const v = params.get(k)
      if (v) captured[k] = v
    })
    // Só sobrescreve o storage se a URL atual trouxe algum parâmetro novo.
    if (Object.keys(captured).length > 0) {
      const existing = getStoredTrackingParams() || {}
      const merged = { ...existing, ...captured }
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged))
    }
  } catch {
    // ignora erros de storage
  }
}

function getStoredTrackingParams(): Record<string, string> | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

// Retorna apenas os parâmetros utm_* (formato esperado pela Fruitfy), lendo
// primeiro da URL atual e caindo para o que foi persistido no storage.
function getUtmParams(): Record<string, string> | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const stored = getStoredTrackingParams() || {}
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const utm: Record<string, string> = {}
  utmKeys.forEach((k) => {
    const v = params.get(k) || stored[k]
    if (v) utm[k] = v
  })
  return Object.keys(utm).length > 0 ? utm : null
}

export default function VIPSubscriptionPage() {
  const [showQuiz, setShowQuiz] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [pageReady, setPageReady] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [orderBump, setOrderBump] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [qrCodeData, setQrCodeData] = useState<{
    qrCode: string
    qrCodeImage: string
    orderId: string
    amount: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const [scrollPosition, setScrollPosition] = useState(0)

  const openCheckout = (plan: string) => {
    const currentScroll = window.scrollY
    setScrollPosition(currentScroll)
    setSelectedPlan(plan)
    setShowCheckoutModal(true)

    requestAnimationFrame(() => {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${currentScroll}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
    })
  }

  const closeCheckout = () => {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    window.scrollTo(0, scrollPosition)
    setShowCheckoutModal(false)
    setSelectedPlan(null)
    setCustomerName('')
    setCustomerEmail('')
    setOrderBump(false)
    setQrCodeData(null)
    setError(null)
    setCopied(false)
    setIsPaid(false)
    setShowPayment(false)
  }

  // Polling para verificar status do pagamento
  useEffect(() => {
    if (!qrCodeData?.orderId || isPaid) return

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch('/api/pix/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: qrCodeData.orderId }),
        })
        const data = await response.json()
        
        if (data.success && data.data.isPaid) {
          setIsPaid(true)

          const planDetails = getPlanDetails(selectedPlan || 'semanal')
          const amount = parseFloat(planDetails.price.replace('R$ ', '').replace(',', '.'))
          const orderId = qrCodeData.orderId

          // Facebook Pixel (navegador) - Purchase. event_id = orderId para
          // deduplicar com o disparo server-side (CAPI).
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {
              content_name: `Plano ${selectedPlan}`,
              content_category: 'subscription',
              value: amount,
              currency: 'BRL',
            }, { eventID: orderId })
          }

          // Disparo server-side (Conversions API) para garantir que a venda
          // apareça no Gerenciador de Eventos. Envia os cookies do Facebook
          // do navegador para melhor correspondência.
          fetch('/api/capi/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              value: amount,
              contentName: `Plano ${selectedPlan}`,
              fbp: getCookie('_fbp'),
              fbc: getCookie('_fbc'),
              eventSourceUrl: window.location.href,
            }),
          }).catch(() => {})
        }
      } catch (error) {
        // Silently ignore check errors
      }
    }

    // Verifica a cada 3 segundos
    const interval = setInterval(checkPaymentStatus, 3000)
    
    // Verifica imediatamente na primeira vez
    checkPaymentStatus()

    return () => clearInterval(interval)
  }, [qrCodeData?.orderId, isPaid, selectedPlan])

  const generatePix = async (plan: string) => {
    if (!plan) return

    setShowPayment(true)
    setIsLoading(true)
    setError(null)

    const planDetails = getPlanDetails(plan)
    const basePrice = parseFloat(planDetails.price.replace('R$ ', '').replace(',', '.'))
    const amount = orderBump ? basePrice + ORDER_BUMP_PRICE : basePrice

    try {
      const response = await fetch('/api/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerName,
          customerEmail,
          plan: plan,
          orderBump,
          utm: getUtmParams(),
        }),
      })
      
      const data = await response.json()
      
      if (!data.success) {
        setError(data.error || 'Erro ao gerar QR Code')
        return
      }
      
      // Facebook Pixel tracking - AddToCart (clicou em ASSINAR AGORA / gerou PIX)
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'AddToCart', {
          content_name: `Plano ${plan}`,
          content_category: 'subscription',
          value: amount,
          currency: 'BRL'
        })
      }
      
      setQrCodeData(data.data)
    } catch (err) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const getPlanDetails = (plan: string) => {
    switch(plan) {
      case '30dias': return { name: '30 Dias', price: 'R$ 19,90', days: '30 dias' }
      case '3meses': return { name: '3 Meses', price: 'R$ 24,90', days: '90 dias' }
      case '1ano': return { name: '1 Ano', price: 'R$ 29,90', days: '365 dias' }
      case 'vitalicio': return { name: 'Vitalício', price: 'R$ 34,90', days: 'Acesso vitalício' }
      default: return { name: '', price: '', days: '' }
    }
  }

  useEffect(() => {
    setPageReady(true)
    // Captura e persiste as UTMs/parâmetros de rastreamento assim que a pessoa
    // entra no site, antes de qualquer navegação que possa limpar a URL.
    captureTrackingParams()
  }, [])

  // Trava o scroll do body enquanto o quiz (overlay) estiver ativo.
  // A página real fica renderizada por baixo, carregando vídeos e imagens,
  // de modo que ao concluir o quiz tudo já esteja 100% pronto.
  useEffect(() => {
    if (showQuiz) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showQuiz])

  const faqItems = [
    {
      question: "É sigiloso? Vai aparecer na minha fatura?",
      answer: "Sim, é 100% sigiloso. Na sua fatura aparecerá apenas um nome genérico, sem referência ao conteúdo."
    },
    {
      question: "Tenho acesso imediato aos conteúdos?",
      answer: "O acesso é imediato! Assim que o pagamento for confirmado, você já pode acessar todos os meus conteúdos exclusivos."
    },
    {
      question: "Posso cancelar quando eu quiser?",
      answer: "Sim, você pode cancelar a qualquer momento. A assinatura não renova automaticamente, você tem total controle."
    },
    {
      question: "Possui reembolso ou garantia?",
      answer: "Temos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro."
    }
  ]

  const checkoutLinks = {
    semanal: 'https://go.fruitfypay.com/jGPNBy9dln3rDgyl',
    mensal: 'https://go.fruitfypay.com/prx2C8zbuRY689eG',
    semestral: 'https://go.fruitfypay.com/9gbJc3tfUXvv634Z',
  }

  return (
    <>
      {/* Quiz como overlay por cima: a página real (abaixo) já renderiza
          seus vídeos e imagens durante o quiz, eliminando o delay ao concluir. */}
      {showQuiz && (
        <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
          <Quiz onComplete={() => setShowQuiz(false)} />
        </div>
      )}

      {/* Main content with fade-in effect */}
      <div className={`min-h-screen bg-background transition-opacity duration-700 ease-out ${pageReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Banner Section */}
      <div className="w-full bg-white">
        <div className="relative w-full h-[180px] overflow-hidden bg-white">
          <video
            src="/videos/banner.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto object-cover"
            style={{ transform: 'translate(-50%, -50%) scale(1.3)', objectPosition: 'center 62%' }}
          />
        </div>
      </div>

      {/* Profile Header Section */}
      <div className="px-4 pb-3 bg-white relative">
        {/* Profile picture and stats row */}
        <div className="flex items-end justify-between">
          {/* Profile picture - half overlapping banner */}
          <div className="-mt-[42px] relative">
            <div className="w-[84px] h-[84px] rounded-full bg-red-500 overflow-hidden shadow-lg p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src="/images/aninha-profile.png"
                  alt="Aninha Oficial"
                  width={84}
                  height={84}
                  className="w-full h-full object-cover rounded-full"
                  priority
                  unoptimized
                />
              </div>
            </div>
            {/* AO VIVO badge */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-red-500 rounded-full px-2.5 py-0.5 shadow-md whitespace-nowrap">
              <span className="text-[9px] font-bold text-white tracking-wide leading-none">AO VIVO</span>
            </div>
          </div>
          
          {/* Stats row - aligned right, same line as profile pic bottom */}
          <div className="flex items-center gap-3.5 text-sm text-foreground pb-2">
            <div className="flex items-center gap-1">
              <Images className="w-4 h-4 text-zinc-500" />
              <span className="font-semibold">80</span>
            </div>
            <div className="flex items-center gap-1">
              <Video className="w-4 h-4 text-primary" />
              <span className="font-semibold">38</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4 text-zinc-500" />
              <span className="font-semibold">7</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-zinc-500" />
              <span className="font-semibold">17.9K</span>
            </div>
          </div>
        </div>

        {/* Name and username */}
        <div className="mt-2 mb-2">
          <div className="flex items-center gap-2 mb-0">
              <h2 className="text-lg font-bold text-foreground">ANINHA OFICIAL</h2>
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
              <p className="text-sm text-muted-foreground">@ana_bernardes99</p>
        </div>
        
        <ProfileBio />
      </div>

      {/* Subscription Card - right after bio */}
      <SubscriptionCard onSubscribe={openCheckout} />

      {/* Content Tabs + feed / media grid */}
      <ContentTabs onUnlock={() => openCheckout('30dias')}>
        {/* Publication - locked video post */}
        <LockedPost
          caption="Amor... imagina eu brincando com a minha buceta gordinha, gemendo alto... na casa do meu primo e cheio de gente na sala 😈💦"
          likes="1.247"
          comments="43"
          videoSrc="/videos/video1.mp4"
          onUnlock={() => openCheckout('30dias')}
        />

        <LockedPost
          caption="Fiz um vídeo novo me provocando no espelho... 🤤 se você visse o final ia se arrepender de não ter assinado antes 🔥"
          likes="1.893"
          comments="61"
          videoSrc="/videos/video2.mp4"
          onUnlock={() => openCheckout('30dias')}
        />

        <LockedPost
          caption="Acordei com muito tesão e resolvi gravar tudo pra vocês... 😈 vem ver o que eu fiz sozinha na cama 💦"
          likes="1.056"
          comments="34"
          videoSrc="/videos/video3.mp4"
          onUnlock={() => openCheckout('30dias')}
        />
      </ContentTabs>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Lower subscription CTA */}
      <div className="bg-zinc-50 py-2">
        <SubscriptionCard onSubscribe={openCheckout} />
      </div>

      {/* FAQ Section */}
      <div className="px-4 py-6 bg-zinc-50">
        <h3 className="text-2xl font-bold text-primary mb-4">Perguntas Frequentes</h3>
        
        <div className="flex flex-col gap-3">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border-2 border-zinc-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-4 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-foreground text-sm pr-4">{item.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4">
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-6 bg-white border-t">
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <button className="hover:text-primary">Termos de Uso</button>
          <span>|</span>
          <button className="hover:text-primary">{'Política de Privacidade'}</button>
        </div>
      </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
            onClick={qrCodeData ? undefined : closeCheckout}
          />
          
          {/* Modal */}
          <div 
            className="fixed inset-x-0 bottom-0 z-50"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <div className="bg-white rounded-t-3xl p-6 max-w-lg mx-auto shadow-2xl relative">
              {/* Handle bar */}
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mb-4" />
              
              {/* Close button - escondido após gerar o PIX para evitar duplicar eventos */}
              {!qrCodeData && (
                <button 
                  onClick={closeCheckout}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-600" />
                </button>
              )}

              {/* Creator profile header */}
              {!showPayment && (
              <>
              <div className="flex flex-col items-center mb-4 mt-2">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                      src="/images/aninha-profile.png"
                      alt="ANINHA OFICIAL"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <h3 className="text-lg font-bold text-foreground">ANINHA OFICIAL</h3>
                  <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                </div>
              <p className="text-sm text-muted-foreground">@ana_bernardes99</p>
              </div>

              {/* Customer info form */}
              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-semibold text-foreground mb-1.5">
                    Nome completo
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Digite seu nome"
                    className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-[#f78f3e]"
                  />
                </div>
                <div>
                  <label htmlFor="customer-email" className="block text-xs font-semibold text-foreground mb-1.5">
                    E-mail
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Digite seu melhor e-mail"
                    className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-[#f78f3e]"
                  />
                </div>
              </div>

              {/* Order bump - Grupo VIP no WhatsApp */}
              <button
                type="button"
                onClick={() => setOrderBump((prev) => !prev)}
                className={`w-full text-left rounded-2xl border-2 border-dashed p-4 mb-5 transition-colors ${
                  orderBump ? 'border-green-500 bg-green-50' : 'border-[#f78f3e] bg-[#fff7f0]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      orderBump ? 'bg-green-500 border-green-500' : 'bg-white border-zinc-300'
                    }`}
                  >
                    {orderBump && <Check className="w-3 h-3 text-white" />}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-[#f78f3e] fill-[#f78f3e]" />
                      Grupo VIP no WhatsApp
                      <span className="text-[#f78f3e]">{`+ ${formatBRL(ORDER_BUMP_PRICE)}`}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Acesso ao meu grupo secreto com conteúdos que não posto em nenhum outro lugar. Toque para adicionar!
                    </p>
                  </div>
                </div>
              </button>
              </>
              )}

              {/* Payment section */}
              {!showPayment ? (
                (() => {
                  const isFormValid =
                    customerName.trim().length > 1 && /\S+@\S+\.\S+/.test(customerEmail)
                  const basePrice = selectedPlan
                    ? parseFloat(getPlanDetails(selectedPlan).price.replace('R$ ', '').replace(',', '.'))
                    : 0
                  const totalPrice = orderBump ? basePrice + ORDER_BUMP_PRICE : basePrice
                  return (
                    <Button
                      size="lg"
                      disabled={!isFormValid}
                      className="w-full font-bold text-base h-14 text-white shadow-md active:scale-95 transition-all duration-150 rounded-full bg-gradient-to-r from-[#f7561e] to-[#f9a531] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                      onClick={() => selectedPlan && generatePix(selectedPlan)}
                    >
                      {isFormValid
                        ? `ASSINAR AGORA! (${formatBRL(totalPrice)})`
                        : 'PREENCHA SEUS DADOS'}
                    </Button>
                  )
                })()
              ) : isPaid ? (
                <div className="text-center">
                  <div className="bg-green-100 border-2 border-green-500 rounded-xl p-6 mb-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">
                      Pagamento Confirmado!
                    </h3>
                    <p className="text-sm text-green-600">
                      Seu acesso foi liberado com sucesso.
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full font-bold text-base h-12 bg-primary text-white hover:bg-[#e07520] active:scale-95"
                    onClick={() => window.open('https://russa.live/login', '_blank')}
                  >
                    Acessar Plataforma
                  </Button>
                </div>
              ) : (
                <>
                  <h4 className="text-base font-bold text-foreground mb-1">
                    {selectedPlan ? getPlanDetails(selectedPlan).days : ''}
                  </h4>
                  <p className="text-xs text-muted-foreground">Valor</p>
                  <p className="text-2xl font-bold text-foreground mb-4">
                    {selectedPlan
                      ? formatBRL(
                          parseFloat(
                            getPlanDetails(selectedPlan).price.replace('R$ ', '').replace(',', '.')
                          ) + (orderBump ? ORDER_BUMP_PRICE : 0)
                        )
                      : ''}
                  </p>

                  {error ? (
                    <div className="text-center">
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                        <p className="text-xs text-center text-red-600">{error}</p>
                      </div>
                      <Button
                        size="lg"
                        className="w-full font-bold text-base h-12 bg-primary text-white hover:bg-[#e07520] active:scale-95"
                        onClick={() => selectedPlan && generatePix(selectedPlan)}
                      >
                        Tentar novamente
                      </Button>
                    </div>
                  ) : qrCodeData ? (
                    <div className="flex flex-col items-center">
                      {/* QR Code */}
                      <div className="bg-white p-2 rounded-xl border border-zinc-200 mb-4">
                        <img 
                          src={qrCodeData.qrCodeImage} 
                          alt="QR Code PIX" 
                          className="w-48 h-48"
                        />
                      </div>

                      {/* PIX code field */}
                      <div className="w-full bg-[#eef4ff] rounded-lg px-3 py-2.5 mb-3">
                        <p className="text-[11px] text-[#3b6cc9] break-all font-mono truncate">
                          {qrCodeData.qrCode}
                        </p>
                      </div>

                      {/* Copy PIX button */}
                      <button
                        disabled={copied}
                        className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white shadow-md transition-all duration-150 ${copied ? 'bg-green-500 cursor-default' : 'bg-gradient-to-r from-[#f7561e] to-[#f9a531] active:scale-95'}`}
                        onClick={() => {
                          if (!copied) {
                            navigator.clipboard.writeText(qrCodeData.qrCode)
                            // Trava o botão permanentemente para não duplicar o evento
                            setCopied(true)

                            const planDetails = getPlanDetails(selectedPlan || 'semanal')
                            const amount = parseFloat(planDetails.price.replace('R$ ', '').replace(',', '.'))

                            // Facebook Pixel tracking - InitiateCheckout (copiou PIX) - dispara uma única vez
                            if (typeof window !== 'undefined' && (window as any).fbq) {
                              (window as any).fbq('track', 'InitiateCheckout', {
                                content_name: `Plano ${selectedPlan}`,
                                content_category: 'subscription',
                                value: amount,
                                currency: 'BRL'
                              })
                            }
                          }
                        }}
                      >
                        {copied ? (
                          <>
                            <Check className="w-5 h-5" /> PIX COPIADO
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" /> COPIAR PIX
                          </>
                        )}
                      </button>

                      <div className="bg-[#fef0e4] border border-[#f78f3e] rounded-xl p-2 mt-3 w-full">
                        <p className="text-xs text-center text-primary">
                          Aguardando pagamento...<br />
                          Seu acesso será liberado automaticamente!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                      <p className="text-sm text-muted-foreground">Gerando seu PIX...</p>
                    </div>
                  )}
                </>
              )}

              {/* Security note */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>Pagamento 100% seguro via PIX</span>
              </div>
            </div>
          </div>

          {/* Animations */}
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </>
      )}
    </>
  )
}
