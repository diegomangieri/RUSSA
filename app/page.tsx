'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Lock, Check, Crown, X, Mail, AlertCircle } from 'lucide-react'
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
  const bioText = 'Oi, meus amores 🔥 Sou a Lana Mangieri e depois de muitos pedidos, vou revelar tudinho do meu corpo com manchinhas, rs. Irei mostrar um lado meu que vai te deixar sem fôlego! Aqui você vai encontrar vídeos meus me masturbando, pagando boquete, fazendo sexo no pelo e muito mais... 😈'
  
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
  const [ageVerified, setAgeVerified] = useState(false)
  const [showEmailCheck, setShowEmailCheck] = useState(false)
  const [emailCheckDone, setEmailCheckDone] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [showEmailError, setShowEmailError] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [qrCodeData, setQrCodeData] = useState<{
    qrCode: string
    qrCodeImage: string
    transactionId: string
    amount: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

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
    setQrCodeData(null)
    setError(null)
    setCopied(false)
  }

  const handleGeneratePix = async () => {
    if (!customerName.trim() || !customerEmail.trim() || !selectedPlan) return
    
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
          customerName: customerName.trim(),
          plan: selectedPlan,
        }),
      })
      
      const data = await response.json()
      
      if (!data.success) {
        setError(data.error || 'Erro ao gerar QR Code')
        return
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
      case 'semanal': return { name: 'Semanal', price: 'R$ 9,95', days: '7 dias' }
      case 'mensal': return { name: 'Mensal', price: 'R$ 17,95', days: '30 dias' }
      case 'semestral': return { name: 'Semestral', price: 'R$ 27,95', days: '180 dias' }
      default: return { name: '', price: '', days: '' }
    }
  }

  useEffect(() => {
    setPageReady(true)
  }, [])

  const handleAgeConfirm = () => {
    setAgeVerified(true)
    setShowEmailCheck(true)
  }

  const handleEmailCheck = () => {
    if (!loginEmail.trim() || !loginEmail.includes('@')) return
    
    setIsCheckingEmail(true)
    
    // Simula verificação e sempre mostra erro
    setTimeout(() => {
      setIsCheckingEmail(false)
      setShowEmailError(true)
    }, 1500)
  }

  const handleContinueWithoutLogin = () => {
    setShowEmailCheck(false)
    setEmailCheckDone(true)
    setShowContent(true)
  }

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
      {/* Age verification screen */}
      {!ageVerified && (
        <div 
          className={`fixed inset-0 z-50 bg-white flex items-center justify-center px-6 transition-opacity duration-300 ease-out ${pageReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center w-full max-w-sm mx-auto">
            {/* Age warning box */}
            <div className="bg-zinc-50 rounded-2xl p-6 mb-6 border border-zinc-200">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {'Conteúdo para + de 18 anos'}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Este site contém conteúdo adulto destinado apenas para pessoas maiores de 18 anos.
              </p>
            </div>

            {/* Confirm button */}
            <Button
              size="lg"
              onClick={handleAgeConfirm}
              className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-14 active:scale-95 transition-all duration-150 shadow-lg hover:shadow-xl"
            >
              Tenho 18 anos ou mais
            </Button>
          </div>
        </div>
      )}

      {/* Email verification screen */}
      {showEmailCheck && !emailCheckDone && (
        <div 
          className={`fixed inset-0 z-50 bg-white flex items-center justify-center px-6 transition-opacity duration-300 ease-out`}
        >
          <div className="text-center w-full max-w-sm mx-auto">
            {/* Login box */}
            <div className="bg-zinc-50 rounded-2xl p-6 mb-6 border border-zinc-200">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Acessar Minha Conta
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Digite o e-mail usado na compra para acessar seus conteúdos exclusivos.
              </p>

              {/* Email input */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value)
                    setShowEmailError(false)
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Error message */}
              {showEmailError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-red-700 mb-1">
                        Compra não encontrada
                      </p>
                      <p className="text-xs text-red-600 leading-relaxed">
                        Não encontramos nenhuma compra associada a este e-mail. Verifique se digitou corretamente ou assine para ter acesso.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Login button */}
              <Button
                size="lg"
                onClick={handleEmailCheck}
                disabled={!loginEmail.trim() || !loginEmail.includes('@') || isCheckingEmail}
                className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-12 active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingEmail ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verificando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </Button>
            </div>

            {/* Continue without login */}
            <button
              onClick={handleContinueWithoutLogin}
              className="text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-2"
            >
              Ainda não tenho assinatura
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`min-h-screen bg-background transition-opacity duration-700 ease-out ${pageReady && showContent ? 'opacity-100' : 'opacity-0'}`}>
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
                alt="Lana Mangieri"
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
            <h2 className="text-lg font-bold text-foreground">Lana Mangieri</h2>
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">@lana.mangieri</p>
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
                <p className="text-xs text-muted-foreground line-through">R$ 29,90</p>
                <p className="text-2xl font-bold text-foreground">R$ 9,95</p>
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
                <p className="text-xs text-white/70 line-through">R$ 59,90</p>
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
                <p className="text-xs text-muted-foreground line-through">R$ 99,90</p>
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
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Plano {getPlanDetails(selectedPlan).name}
                  </h3>
                  <p className="text-2xl font-bold text-primary">
                    {getPlanDetails(selectedPlan).price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getPlanDetails(selectedPlan).days} de acesso
                  </p>
                </div>
              )}

              {/* QR Code Display */}
              {qrCodeData ? (
                <div className="text-center">
                  <div className="bg-white p-3 rounded-xl border-2 border-zinc-200 mb-3 inline-block">
                    <img 
                      src={qrCodeData.qrCodeImage} 
                      alt="QR Code PIX" 
                      className="w-40 h-40 mx-auto"
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
                      Após o pagamento, o acesso será enviado<br />
                      para o seu E-mail em até 2 minutos
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Form */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Digite seu nome completo"
                        className="w-full h-12 px-4 rounded-xl border-2 border-zinc-200 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
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
                      O acesso será enviado para este E-mail<br />
                      após a confirmação do pagamento
                    </p>
                  </div>

                  {/* Submit button */}
                  <Button 
                    size="lg" 
                    className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-14 active:scale-95 transition-all duration-150 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGeneratePix}
                    disabled={!customerName.trim() || !customerEmail.includes('@') || isLoading}
                  >
                    {isLoading ? 'Gerando...' : 'Gerar QR Code'}
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
