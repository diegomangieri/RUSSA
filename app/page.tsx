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
    text: "Não aguentei, assinei por curiosidade e fiquei viciado. A Lana é diferente de todas, gostosa demais! 😮‍💨",
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
  const bioText = 'LOIRINHA, GOSTOSA E SAFADA 💗🤪🔥 NÃO SOU ATRIZ, SOU PUTA DE VERDADE. E eu não vim pra brincar, vim pra ser a melhor. 👑 Aqui é vida real: putaria com tesão 💦, gozada de verdade 😌, boquete até engasgar 😝 e muito mais...'
  
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



export default function VIPSubscriptionPage() {
  const [showQuiz, setShowQuiz] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [pageReady, setPageReady] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPassword, setCustomerPassword] = useState('')
  const [customerConfirmPassword, setCustomerConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const planValue = parseFloat(getPlanDetails(plan).price.replace('R$ ', '').replace(',', '.'))
      ;(window as any).fbq('track', 'InitiateCheckout', {
        content_name: `Plano ${plan}`,
        content_category: 'subscription',
        value: planValue,
        currency: 'BRL'
      })
    }
    
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
    setCustomerEmail('')
    setCustomerPassword('')
    setCustomerConfirmPassword('')
    setShowPassword(false)
    setShowConfirmPassword(false)
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
          
          // Facebook Pixel tracking - Purchase
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {
              content_name: `Plano ${selectedPlan}`,
              content_category: 'subscription',
              value: amount,
              currency: 'BRL'
            })
          }
          
          // TikTok Pixel tracking - Purchase
          if (typeof window !== 'undefined' && (window as any).ttq) {
            (window as any).ttq.track('CompletePayment', {
              content_name: `Plano ${selectedPlan}`,
              content_category: 'subscription',
              value: amount,
              currency: 'BRL'
            })
          }
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
    const amount = parseFloat(planDetails.price.replace('R$ ', '').replace(',', '.'))

    // E-mail fictício gerado automaticamente (não pedimos dados ao usuário)
    const randomEmail = `${Math.random().toString(36).substring(2, 12)}@gmail.com`

    try {
      const response = await fetch('/api/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerEmail: randomEmail,
          plan: plan,
        }),
      })
      
      const data = await response.json()
      
      if (!data.success) {
        setError(data.error || 'Erro ao gerar QR Code')
        return
      }
      
      // Facebook Pixel tracking - Lead/PIX generated
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: `Plano ${plan}`,
          content_category: 'subscription',
          value: amount,
          currency: 'BRL'
        })
      }
      
      // TikTok Pixel tracking - AddToCart (QR Code gerado)
      if (typeof window !== 'undefined' && (window as any).ttq) {
        (window as any).ttq.track('AddToCart', {
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
      case '30dias': return { name: '30 Dias', price: 'R$ 9,99', days: '30 dias' }
      case '3meses': return { name: '3 Meses', price: 'R$ 14,90', days: '90 dias' }
      case '1ano': return { name: '1 Ano', price: 'R$ 19,90', days: '365 dias' }
      case 'vitalicio': return { name: 'Vitalício', price: 'R$ 24,90', days: 'Acesso vitalício' }
      default: return { name: '', price: '', days: '' }
    }
  }

  useEffect(() => {
    setPageReady(true)
  }, [])

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
    },
    {
    question: "Como funciona a chamada de vídeo?",
    answer: "Basta mandar uma mensagem no chat da criadora de conteúdo e combinar o horário."
    }
  ]

  const checkoutLinks = {
    semanal: 'https://go.fruitfypay.com/jGPNBy9dln3rDgyl',
    mensal: 'https://go.fruitfypay.com/prx2C8zbuRY689eG',
    semestral: 'https://go.fruitfypay.com/9gbJc3tfUXvv634Z',
  }

  if (showQuiz) {
    return <Quiz onComplete={() => setShowQuiz(false)} />
  }

  return (
    <>
      {/* Main content with fade-in effect */}
      <div className={`min-h-screen bg-background transition-opacity duration-700 ease-out ${pageReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Banner Section */}
      <div className="w-full bg-zinc-900">
        <div className="relative w-full h-[180px] overflow-hidden">
          <video
            src="/videos/banner.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-1/2 -translate-x-1/2 w-full object-cover"
            style={{ height: '260px', top: '-40px' }}
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
                  src="/images/profile.jpg"
                  alt="Lana Oficial"
                  width={84}
                  height={84}
                  className="w-full h-full object-cover rounded-full"
                  priority
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
              <span className="font-semibold">371</span>
            </div>
            <div className="flex items-center gap-1">
              <Video className="w-4 h-4 text-primary" />
              <span className="font-semibold">383</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4 text-zinc-500" />
              <span className="font-semibold">176</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-zinc-500" />
              <span className="font-semibold">385.5K</span>
            </div>
          </div>
        </div>

        {/* Name and username */}
        <div className="mt-2 mb-2">
          <div className="flex items-center gap-2 mb-0">
              <h2 className="text-lg font-bold text-foreground">LANA OFICIAL</h2>
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
              <p className="text-sm text-muted-foreground">@lanaoficial1_</p>
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
          likes="97,7K"
          comments="2.523"
          videoSrc="/videos/video1.mp4"
          onUnlock={() => openCheckout('30dias')}
        />

        <LockedPost
          caption="Fiz um vídeo novo me provocando no espelho... 🤤 se você visse o final ia se arrepender de não ter assinado antes 🔥"
          likes="84,2K"
          comments="1.907"
          videoSrc="/videos/video2.mp4"
          onUnlock={() => openCheckout('30dias')}
        />

        <LockedPost
          caption="Acordei com muito tesão e resolvi gravar tudo pra vocês... 😈 vem ver o que eu fiz sozinha na cama 💦"
          likes="112K"
          comments="3.148"
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
              
              {/* Close button */}
              <button 
                onClick={closeCheckout}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-600" />
              </button>

              {/* Creator profile header */}
              {!showPayment && (
              <>
              <div className="flex flex-col items-center mb-4 mt-2">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                      src="/images/profile.jpg"
                      alt="LANA OFICIAL"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <h3 className="text-lg font-bold text-foreground">LANA OFICIAL</h3>
                  <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">@lanaoficial1_</p>
              </div>

              {/* Benefits */}
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 mb-5">
                <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
                  <span className="text-primary">���</span> BENEFÍCIOS EXCLUSIVOS
                </p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    'Vídeos com fãs e meu Ex Namorado',
                    'Mais de 754+ mídias explícitas',
                    'Melhores amigos no instagram',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2.5 text-sm text-foreground">
                      <span className="w-5 h-5 rounded-full bg-[#fde4cc] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              </>
              )}

              {/* Payment section */}
              {!showPayment ? (
                <Button 
                  size="lg" 
                  className="w-full font-bold text-base h-14 text-white shadow-md active:scale-95 transition-all duration-150 rounded-full bg-gradient-to-r from-[#f7561e] to-[#f9a531] hover:opacity-90"
                  onClick={() => selectedPlan && generatePix(selectedPlan)}
                >
                  {selectedPlan ? `ASSINAR AGORA! (${getPlanDetails(selectedPlan).price})` : 'ASSINAR AGORA!'}
                </Button>
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
                    {selectedPlan ? getPlanDetails(selectedPlan).price : ''}
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
                        className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white shadow-md active:scale-95 transition-all duration-150 ${copied ? 'bg-green-500' : 'bg-gradient-to-r from-[#f7561e] to-[#f9a531]'}`}
                        onClick={() => {
                          if (!copied) {
                            navigator.clipboard.writeText(qrCodeData.qrCode)
                            setCopied(true)
                            setTimeout(() => setCopied(false), 2500)

                            // TikTok Pixel tracking - InitiateCheckout (copiou PIX)
                            if (typeof window !== 'undefined' && (window as any).ttq) {
                              const planDetails = getPlanDetails(selectedPlan || 'semanal')
                              const amount = parseFloat(planDetails.price.replace('R$ ', '').replace(',', '.'))
                              ;(window as any).ttq.track('InitiateCheckout', {
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
