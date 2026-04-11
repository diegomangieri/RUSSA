'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Lock, Check, Crown, X, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


function getPromoDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

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
    text: "Não aguentei, assinei por curiosidade e fiquei viciado. A Thayse é diferente de todas, gostosa demais! 😮‍💨",
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
      <h3 className="text-2xl font-bold text-foreground mb-4">{"O que estão falando 🤭"}</h3>
      
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
  const bioText = 'Oi, meus amores 🔥 Sou a Thayse Mangieri e depois de muitos pedidos, vou revelar tudinho do meu corpo com manchinhas, rs. Irei mostrar um lado meu que vai te deixar sem fôlego! Aqui você vai encontrar vídeos meus me masturbando, pagando boquete, fazendo sexo no pelo e muito mais... 😈'
  
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
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [promoDate] = useState(getPromoDate)
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

  const [scrollPosition, setScrollPosition] = useState(0)

  const openCheckout = (plan: string) => {
    const currentScroll = window.scrollY
    setScrollPosition(currentScroll)
    setSelectedPlan(plan)
    setShowCheckoutModal(true)
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: `Plano ${plan}`,
        content_category: 'subscription',
        value: plan === 'semanal' ? 12.95 : plan === 'mensal' ? 17.95 : 27.95,
        currency: 'BRL'
      })
    }
    
    // TikTok Pixel tracking
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('InitiateCheckout', {
        content_name: `Plano ${plan}`,
        content_category: 'subscription',
        value: plan === 'semanal' ? 12.95 : plan === 'mensal' ? 17.95 : 27.95,
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

  const handleCreateAccount = async () => {
    if (!customerEmail.trim() || !customerPassword.trim() || !customerConfirmPassword.trim() || !selectedPlan) return
    
    if (customerPassword !== customerConfirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    
    if (customerPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    const planDetails = getPlanDetails(selectedPlan)
    const amount = parseFloat(planDetails.price.replace('R$ ', '').replace(',', '.'))
    
    try {
      const response = await fetch('/api/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerEmail: customerEmail.trim(),
          plan: selectedPlan,
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
          content_name: `Plano ${selectedPlan}`,
          content_category: 'subscription',
          value: amount,
          currency: 'BRL'
        })
      }
      
      // TikTok Pixel tracking - Lead/PIX generated
      if (typeof window !== 'undefined' && (window as any).ttq) {
        (window as any).ttq.track('SubmitForm', {
          content_name: `Plano ${selectedPlan}`,
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
      case 'semanal': return { name: 'Semanal', price: 'R$ 12,95', days: '7 dias' }
      case 'mensal': return { name: 'Mensal', price: 'R$ 17,95', days: '30 dias' }
      case 'semestral': return { name: 'Semestral', price: 'R$ 27,95', days: '180 dias' }
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
      question: "Como vou acessar os conteúdos?",
      answer: "Após assinar, você receberá o acesso exclusivo via E-mail + o Grupo VIP com conteúdos extras, interação direta e atualizações diárias."
    }
  ]

  const checkoutLinks = {
    semanal: 'https://go.fruitfypay.com/jGPNBy9dln3rDgyl',
    mensal: 'https://go.fruitfypay.com/prx2C8zbuRY689eG',
    semestral: 'https://go.fruitfypay.com/9gbJc3tfUXvv634Z',
  }

  return (
    <>
      {/* Main content with fade-in effect */}
      <div className={`min-h-screen bg-background transition-opacity duration-700 ease-out ${pageReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Promotional Banner */}
      <div className="bg-primary text-white text-center py-3 px-4 font-semibold text-sm">
        ESSA PROMOÇÃO É VÁLIDA ATÉ {promoDate}
      </div>



      {/* Banner Section */}
      <div className="w-full bg-zinc-900">
        <div className="relative w-full h-[130px] overflow-hidden">
          <Image
            src="/images/banner.png"
            alt="Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Profile Header Section */}
      <div className="px-4 pb-3 bg-white relative">
        {/* Profile picture and stats row */}
        <div className="flex items-end justify-between">
          {/* Profile picture - half overlapping banner */}
          <div className="-mt-[38px]">
            <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#f78f3e] to-[#f9a55c] overflow-hidden border-[3px] border-white shadow-lg">
              <Image
                src="/images/profile.png"
                alt="Thayse Mangieri"
                width={76}
                height={76}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Stats row - aligned right, same line as profile pic bottom */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pb-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">159</span>
              <span>Fotos</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">68</span>
              <span>{'Vídeos'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">69.2K</span>
              <span>Likes</span>
            </div>
          </div>
        </div>

        {/* Name and username */}
        <div className="mt-2 mb-2">
          <div className="flex items-center gap-2 mb-0">
            <h2 className="text-lg font-bold text-foreground">Thayse Mangieri</h2>
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">@thayse.mangieri</p>
        </div>
        
        <ProfileBio />
      </div>

      {/* Divider line */}
      <div className="h-px bg-zinc-200" />

      {/* Hero Video Section - Preview */}
      <div className="relative">
        <div className="w-full h-[400px] bg-zinc-800 relative overflow-hidden flex items-center justify-center">
          <video
            src="/videos/preview-locked.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
          
          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-zinc-100 rounded-2xl px-8 py-6 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7 text-zinc-600" />
              </div>
              <p className="text-foreground font-semibold mb-1">{'Conteúdo Exclusivo'}</p>
              <p className="text-muted-foreground text-sm">Assine para desbloquear</p>
            </div>
          </div>

          {/* Engagement Stats Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <Heart className="w-5 h-5" />
              <span className="font-semibold text-sm">22.4K</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">342</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Subscription Section */}
      <div className="px-4 py-6 bg-zinc-50">
        <h3 className="text-2xl font-bold text-foreground mb-4">Assinaturas</h3>
        
        <div className="flex gap-2 mb-4">
          <Badge variant="secondary" className="bg-[#fde4cc] text-[#f78f3e] border-0 font-semibold">
            VEJA TUDO AGORA
          </Badge>
          <Badge variant="secondary" className="bg-[#f78f3e] text-white border-0 font-semibold">
            {'Promoção'}
          </Badge>
        </div>

        {/* Plans */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Semanal Plan */}
          <Card className="bg-white border-2 border-zinc-200 p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold text-foreground mb-0.5">Semanal</p>
                <p className="text-xs text-muted-foreground">7 dias de acesso</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground line-through">R$ 29,95</p>
                <p className="text-2xl font-bold text-foreground">R$ 12,95</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-md hover:shadow-lg"
              onClick={() => openCheckout('semanal')}
            >
              Assinar o plano Semanal!
            </Button>
          </Card>

          {/* Mensal Plan - Featured */}
          <Card className="bg-gradient-to-br from-[#f78f3e] to-[#f9a55c] text-white p-5 border-0 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold mb-0.5">Mensal</p>
                <p className="text-xs text-white/70">30 dias de acesso</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70 line-through">R$ 49,95</p>
                <p className="text-2xl font-bold">R$ 17,95</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-[#e07520] text-white hover:bg-[#c96a1c] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-lg hover:shadow-xl"
              onClick={() => openCheckout('mensal')}
            >
              Assinar o plano Mensal!
            </Button>
          </Card>

          {/* Semestral Plan */}
          <Card className="bg-white border-2 border-zinc-200 p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold text-foreground mb-0.5">Semestral</p>
                <p className="text-xs text-muted-foreground">180 dias de acesso</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground line-through">R$ 89,95</p>
                <p className="text-2xl font-bold text-foreground">R$ 27,95</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-md hover:shadow-lg"
              onClick={() => openCheckout('semestral')}
            >
              Assinar o plano Semestral!
            </Button>
          </Card>
        </div>

        <div className="bg-[#fef0e4] border-2 border-[#f78f3e] rounded-lg p-3 mb-4">
          <p className="text-sm font-bold text-primary text-center">
            Acesso imediato via E-mail!
          </p>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center gap-4 text-sm mb-6">
          <div className="flex items-center gap-1 text-[#f78f3e]">
            <Lock className="w-4 h-4" />
            <span className="font-medium">Pagamento 100% seguro</span>
          </div>
          <div className="text-muted-foreground">|</div>
          <div className="flex items-center gap-1 text-primary">
            <Check className="w-4 h-4" />
            <span className="font-medium">Acesso imediato</span>
          </div>
        </div>

        {/* Locked Content Preview - Portrait */}
        <div className="relative aspect-square bg-zinc-800 rounded-2xl overflow-hidden mb-4">
          <Image
            src="/images/gallery2.png"
            alt="Conteúdo Exclusivo"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          
          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center bg-zinc-100 rounded-2xl px-8 py-6 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7 text-zinc-600" />
              </div>
              <p className="text-foreground font-semibold mb-1">{'Conteúdo Exclusivo'}</p>
              <p className="text-muted-foreground text-sm">Assine para desbloquear</p>
            </div>
          </div>
        </div>

        {/* Locked Content Preview 2 */}
        <div className="relative aspect-square bg-zinc-800 rounded-2xl overflow-hidden -mb-6">
          <Image
            src="/images/gallery4.png"
            alt="Conteúdo Exclusivo"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          
          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center bg-zinc-100 rounded-2xl px-8 py-6 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7 text-zinc-600" />
              </div>
              <p className="text-foreground font-semibold mb-1">{'Conteúdo Exclusivo'}</p>
              <p className="text-muted-foreground text-sm">Assine para desbloquear</p>
            </div>
          </div>
        </div>
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
              
              {/* Close button - only show when QR Code is NOT generated */}
              {!qrCodeData && (
                <button 
                  onClick={closeCheckout}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-600" />
                </button>
              )}

              {/* Plan info */}
              {selectedPlan && (
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-foreground">
                    Plano {getPlanDetails(selectedPlan).name}
                  </h3>
                  <p className="text-xl font-bold text-primary">
                    {getPlanDetails(selectedPlan).price}
                  </p>
                </div>
              )}

              {/* QR Code Display */}
              {qrCodeData ? (
                <div className="text-center">
                  {isPaid ? (
                    <>
                      {/* Pagamento Confirmado */}
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
                      
                      <div className="bg-zinc-100 rounded-xl p-4 mb-4">
                        <p className="text-sm text-foreground font-medium mb-1">
                          Acesse a plataforma:
                        </p>
                        <a 
                          href="https://russa.live/login" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary font-bold hover:underline"
                        >
                          russa.live/login
                        </a>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="w-full font-bold text-base h-11 bg-primary text-white hover:bg-[#e07520] active:scale-95"
                        onClick={() => window.open('https://russa.live/login', '_blank')}
                      >
                        Acessar Plataforma
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* QR Code aguardando pagamento */}
                      <div className="bg-white p-1 rounded-xl border-2 border-zinc-200 mb-3 inline-block">
                        <img 
                          src={qrCodeData.qrCodeImage} 
                          alt="QR Code PIX" 
                          className="w-52 h-52 mx-auto"
                        />
                      </div>
                      
                      <p className="text-sm text-foreground font-medium mb-2">
                        Escaneie o QR Code
                      </p>
                      
                      <p className="text-xs text-muted-foreground mb-3">
                        Ou copie o código PIX abaixo:
                      </p>
                      
                      <div className="bg-zinc-100 rounded-xl p-2 mb-3">
                        <p className="text-xs text-foreground break-all font-mono">
                          {qrCodeData.qrCode.substring(0, 40)}...
                        </p>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className={`w-full font-bold text-base h-11 transition-all duration-150 ${copied ? 'bg-green-500 text-white cursor-default' : 'bg-primary text-white hover:bg-[#e07520] active:scale-95'}`}
                        onClick={() => {
                          if (!copied) {
                            navigator.clipboard.writeText(qrCodeData.qrCode)
                            setCopied(true)
                          }
                        }}
                        disabled={copied}
                      >
                        {copied ? (
                          <span className="flex items-center justify-center gap-2">
                            Copiado <Check className="w-4 h-4" />
                          </span>
                        ) : (
                          'Copiar Código PIX'
                        )}
                      </Button>
                      
                      <div className="bg-[#fef0e4] border border-[#f78f3e] rounded-xl p-2 mt-3">
                        <p className="text-xs text-center text-primary">
                          Aguardando pagamento...<br />
                          A tela atualizará automaticamente
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {/* Account Creation Form */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1 text-center">Crie sua conta</h4>
                    <p className="text-xs text-muted-foreground text-center">Preencha os dados para criar sua conta:</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Digite seu E-mail"
                        className="w-full h-12 px-4 rounded-xl border-2 border-zinc-200 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={customerPassword}
                          onChange={(e) => setCustomerPassword(e.target.value)}
                          placeholder="Crie uma senha"
                          className="w-full h-12 px-4 pr-12 rounded-xl border-2 border-zinc-200 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={customerConfirmPassword}
                          onChange={(e) => setCustomerConfirmPassword(e.target.value)}
                          placeholder="Confirme sua senha"
                          className="w-full h-12 px-4 pr-12 rounded-xl border-2 border-zinc-200 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                      <p className="text-xs text-center text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Info box */}
                  <div className="bg-[#fef0e4] border border-[#f78f3e] rounded-xl p-3 mb-4">
                    <p className="text-xs text-center text-primary">
                      Guarde bem seus dados de acesso!<br />
                      Você usar�� para entrar na plataforma
                    </p>
                  </div>

                  {/* Submit button */}
                  <Button 
                    size="lg" 
                    className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-14 active:scale-95 transition-all duration-150 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreateAccount}
                    disabled={!customerEmail.includes('@') || !customerPassword.trim() || !customerConfirmPassword.trim() || isLoading}
                  >
                    {isLoading ? 'Criando conta...' : 'Criar conta e assinar!'}
                  </Button>
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
