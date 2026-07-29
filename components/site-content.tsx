'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Lock, Check, Crown, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Lang = 'pt' | 'en'

type Testimonial = { text: string; user: string; time: string }
type FaqItem = { question: string; answer: string }
type Plan = {
  id: string
  name: string
  days: string
  oldPrice: string
  price: string
  featured: boolean
}

function getPromoDate(lang: Lang) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// ---------------------------------------------------------------------------
// Conteúdo por idioma
// ---------------------------------------------------------------------------

const CONTENT: Record<Lang, {
  currency: string
  promoBanner: (date: string) => string
  stats: { photos: string; videos: string; likes: string }
  username: string
  bioText: string
  showMore: string
  showLess: string
  exclusiveContent: string
  subscribeToUnlock: string
  testimonialsTitle: string
  testimonials: Testimonial[]
  subscriptionsTitle: string
  badgeAll: string
  badgePromo: string
  plans: Plan[]
  subscribeBtn: (name: string) => string
  instantAccess: string
  securePayment: string
  instantAccessShort: string
  faqTitle: string
  faqItems: FaqItem[]
  terms: string
  privacy: string
  loading: string
  // modal (PT PIX)
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  vipTitle: string
  vipDesc: JSX.Element
  submitIdle: string
  submitLoading: string
  paymentConfirmed: string
  accessReleased: string
  accessPlatform: string
  accessBtn: string
  scanQr: string
  orCopyPix: string
  copyPixBtn: string
  copiedBtn: string
  waitingPayment: JSX.Element
  securePix: string
}> = {
  pt: {
    currency: 'BRL',
    promoBanner: (date) => `ESSA PROMOÇÃO É VÁLIDA ATÉ ${date}`,
    stats: { photos: 'Fotos', videos: 'Vídeos', likes: 'Likes' },
    username: '@lana.alencar',
    bioText:
      'Oi, meus amores 🔥 Sou a Lana Alencar e depois de muitos pedidos, vou revelar tudinho do meu corpinho. Irei mostrar um lado meu que vai te deixar sem fôlego! Aqui você vai encontrar vídeos meus me masturbando, pagando boquete, fazendo sexo no pelo e muito mais... 😈',
    showMore: 'Ver mais',
    showLess: 'Ver menos',
    exclusiveContent: 'Conteúdo Exclusivo',
    subscribeToUnlock: 'Assine para desbloquear',
    testimonialsTitle: 'O que estão falando 🤭',
    testimonials: [
      {
        text: 'Foi a melhor punheta que já bati! A buceta dela é muito gostosa, tava curioso pra ver como era 😂',
        user: 'Lucas M.',
        time: '3 horas atrás',
      },
      {
        text: 'Foi a melhor punheta que já bati! A buceta dela é muito gostosa, tava curioso pra ver como era 😂',
        user: 'Pedro R.',
        time: '1 dia atrás',
      },
      {
        text: 'Não aguentei, assinei por curiosidade e fiquei viciado. A Lana é diferente de todas, gostosa demais! 😮‍💨',
        user: 'Matheus S.',
        time: '2 dias atrás',
      },
      {
        text: 'Corpo diferente e muito gostoso. Não consigo parar de ver os vídeos slkk',
        user: 'Gabriel F.',
        time: '5 dias atrás',
      },
    ],
    subscriptionsTitle: 'Assinaturas',
    badgeAll: 'VEJA TUDO AGORA',
    badgePromo: 'Promoção',
    plans: [
      { id: 'semanal', name: 'Semanal', days: '7 dias de acesso', oldPrice: 'R$ 29,95', price: 'R$ 12,95', featured: false },
      { id: 'mensal', name: 'Mensal', days: '30 dias de acesso', oldPrice: 'R$ 49,95', price: 'R$ 17,95', featured: true },
      { id: 'semestral', name: 'Semestral', days: '180 dias de acesso', oldPrice: 'R$ 89,95', price: 'R$ 27,95', featured: false },
    ],
    subscribeBtn: (name) => `Assinar o plano ${name}!`,
    instantAccess: 'Acesso imediato via E-mail!',
    securePayment: 'Pagamento 100% seguro',
    instantAccessShort: 'Acesso imediato',
    faqTitle: 'Perguntas Frequentes',
    faqItems: [
      {
        question: 'É sigiloso? Vai aparecer na minha fatura?',
        answer: 'Sim, é 100% sigiloso. Na sua fatura aparecerá apenas um nome genérico, sem referência ao conteúdo.',
      },
      {
        question: 'Tenho acesso imediato aos conteúdos?',
        answer: 'O acesso é imediato! Assim que o pagamento for confirmado, você já pode acessar todos os meus conteúdos exclusivos.',
      },
      {
        question: 'Posso cancelar quando eu quiser?',
        answer: 'Sim, você pode cancelar a qualquer momento. A assinatura não renova automaticamente, você tem total controle.',
      },
      {
        question: 'Possui reembolso ou garantia?',
        answer: 'Temos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro.',
      },
      {
        question: 'Como vou acessar os conteúdos?',
        answer: 'Após assinar, você receberá o acesso exclusivo via E-mail + o Grupo VIP com conteúdos extras, interação direta e atualizações diárias.',
      },
    ],
    terms: 'Termos de Uso',
    privacy: 'Política de Privacidade',
    loading: 'Carregando conteúdos...',
    nameLabel: 'Nome',
    namePlaceholder: 'Digite seu nome',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Digite seu E-mail',
    vipTitle: 'Adicionar Grupo VIP',
    vipDesc: (
      <>
        Acesso ao grupo exclusivo com conteúdos<br />
        extras e interação direta.
      </>
    ),
    submitIdle: 'Gerar código PIX!',
    submitLoading: 'Gerando código PIX...',
    paymentConfirmed: 'Pagamento Confirmado!',
    accessReleased: 'Seu acesso foi liberado com sucesso.',
    accessPlatform: 'Acesse a plataforma:',
    accessBtn: 'Acessar Plataforma',
    scanQr: 'Escaneie o QR Code',
    orCopyPix: 'Ou copie o código PIX abaixo:',
    copyPixBtn: 'Copiar Código PIX',
    copiedBtn: 'Copiado',
    waitingPayment: (
      <>
        Aguardando pagamento...<br />
        Seu acesso será liberado automaticamente!
      </>
    ),
    securePix: 'Pagamento 100% seguro via PIX',
  },
  en: {
    currency: 'USD',
    promoBanner: (date) => `THIS PROMO IS VALID UNTIL ${date}`,
    stats: { photos: 'Photos', videos: 'Videos', likes: 'Likes' },
    username: '@lana.alencar',
    bioText:
      "Hi, my loves 🔥 I'm Lana Alencar and after so many requests, I'm going to reveal every little bit of my body. I'll show you a side of me that will leave you breathless! Here you'll find videos of me masturbating, giving blowjobs, having raw sex and so much more... 😈",
    showMore: 'Show more',
    showLess: 'Show less',
    exclusiveContent: 'Exclusive Content',
    subscribeToUnlock: 'Subscribe to unlock',
    testimonialsTitle: 'What people are saying 🤭',
    testimonials: [
      {
        text: "Best jerk-off I've ever had! Her pussy is so damn good, I was curious to see what it was like 😂",
        user: 'Lucas M.',
        time: '3 hours ago',
      },
      {
        text: "Best jerk-off I've ever had! Her pussy is so damn good, I was curious to see what it was like 😂",
        user: 'Pedro R.',
        time: '1 day ago',
      },
      {
        text: "I couldn't resist, subscribed out of curiosity and got hooked. Lana is different from all of them, way too hot! 😮‍💨",
        user: 'Matt S.',
        time: '2 days ago',
      },
      {
        text: "Different body and super hot. I can't stop watching the videos lol",
        user: 'Gabriel F.',
        time: '5 days ago',
      },
    ],
    subscriptionsTitle: 'Subscriptions',
    badgeAll: 'SEE EVERYTHING NOW',
    badgePromo: 'Promo',
    plans: [
      { id: 'weekly', name: 'Weekly', days: '7 days of access', oldPrice: '$14.95', price: '$6.95', featured: false },
      { id: 'monthly', name: 'Monthly', days: '30 days of access', oldPrice: '$24.95', price: '$9.95', featured: true },
      { id: 'sixmonths', name: '6 Months', days: '180 days of access', oldPrice: '$44.95', price: '$17.95', featured: false },
    ],
    subscribeBtn: (name) => `Subscribe to ${name} plan!`,
    instantAccess: 'Instant access via Email!',
    securePayment: '100% secure payment',
    instantAccessShort: 'Instant access',
    faqTitle: 'Frequently Asked Questions',
    faqItems: [
      {
        question: 'Is it confidential? Will it show up on my statement?',
        answer: 'Yes, it\u2019s 100% confidential. Your statement will only show a generic name, with no reference to the content.',
      },
      {
        question: 'Do I get instant access to the content?',
        answer: 'Access is instant! As soon as your payment is confirmed, you can access all my exclusive content.',
      },
      {
        question: 'Can I cancel whenever I want?',
        answer: 'Yes, you can cancel at any time. The subscription does not renew automatically, you are in full control.',
      },
      {
        question: 'Is there a refund or guarantee?',
        answer: 'We offer a 7-day guarantee. If you are not satisfied, we will refund 100% of your money.',
      },
      {
        question: 'How will I access the content?',
        answer: 'After subscribing, you will receive exclusive access via Email with extra content, direct interaction and daily updates.',
      },
    ],
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    loading: 'Loading content...',
    nameLabel: 'Name',
    namePlaceholder: 'Enter your name',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email',
    vipTitle: '',
    vipDesc: <></>,
    submitIdle: '',
    submitLoading: '',
    paymentConfirmed: '',
    accessReleased: '',
    accessPlatform: '',
    accessBtn: '',
    scanQr: '',
    orCopyPix: '',
    copyPixBtn: '',
    copiedBtn: '',
    waitingPayment: <></>,
    securePix: '',
  },
}

// Links de checkout (USD) - preencher depois
const EN_CHECKOUT_LINKS: Record<string, string> = {
  weekly: '',
  monthly: '',
  sixmonths: '',
}

function TestimonialsCarousel({ title, testimonials }: { title: string; testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="px-4 py-6 bg-white">
      <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>

      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
          aria-label="Next"
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

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-zinc-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

function ProfileBio({ bioText, showMore, showLess }: { bioText: string; showMore: string; showLess: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="text-sm text-foreground leading-relaxed">
      {expanded ? (
        <>
          <p>{bioText}</p>
          <button onClick={() => setExpanded(false)} className="text-primary font-medium mt-1 hover:underline">
            {showLess}
          </button>
        </>
      ) : (
        <>
          <p className="line-clamp-2">{bioText}</p>
          <button onClick={() => setExpanded(true)} className="text-primary font-medium mt-1 hover:underline">
            {showMore}
          </button>
        </>
      )}
    </div>
  )
}

export function SiteContent({ lang }: { lang: Lang }) {
  const t = CONTENT[lang]
  const isPt = lang === 'pt'

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [promoDate] = useState(() => getPromoDate(lang))
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [wantsVipGroup, setWantsVipGroup] = useState(false)
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

  const getPlanDetails = (planId: string) => t.plans.find((p) => p.id === planId) ?? t.plans[0]

  const openCheckout = (planId: string) => {
    // Versão em inglês (USD): redireciona para o checkout externo
    if (!isPt) {
      const link = EN_CHECKOUT_LINKS[planId]
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'InitiateCheckout', {
          content_name: `Plan ${planId}`,
          content_category: 'subscription',
          currency: 'USD',
        })
      }
      if (link) {
        if (typeof window !== 'undefined' && window.self !== window.top) {
          window.open(link, '_blank')
        } else {
          window.location.href = link
        }
      }
      return
    }

    // Versão em português (BRL): abre o modal com fluxo PIX
    const currentScroll = window.scrollY
    setScrollPosition(currentScroll)
    setSelectedPlan(planId)
    setShowCheckoutModal(true)

    if (typeof window !== 'undefined' && (window as any).fbq) {
      const plan = getPlanDetails(planId)
      ;(window as any).fbq('track', 'InitiateCheckout', {
        content_name: `Plano ${plan.name}`,
        content_category: 'subscription',
        value: parseFloat(plan.price.replace('R$ ', '').replace(',', '.')),
        currency: 'BRL',
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
    setCustomerName('')
    setWantsVipGroup(false)
    setQrCodeData(null)
    setError(null)
    setCopied(false)
    setIsPaid(false)
  }

  // Polling para verificar status do pagamento (apenas PT / PIX)
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

          const plan = getPlanDetails(selectedPlan || t.plans[0].id)
          const amount = parseFloat(plan.price.replace('R$ ', '').replace(',', '.'))

          if (typeof window !== 'undefined' && (window as any).fbq) {
            ;(window as any).fbq('track', 'Purchase', {
              content_name: `Plano ${plan.name}`,
              content_category: 'subscription',
              value: amount,
              currency: 'BRL',
            })
          }
          if (typeof window !== 'undefined' && (window as any).ttq) {
            ;(window as any).ttq.track('CompletePayment', {
              content_name: `Plano ${plan.name}`,
              content_category: 'subscription',
              value: amount,
              currency: 'BRL',
            })
          }
        }
      } catch {
        // Silently ignore
      }
    }

    const interval = setInterval(checkPaymentStatus, 3000)
    checkPaymentStatus()
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeData?.orderId, isPaid, selectedPlan])

  const handleCreateAccount = async () => {
    if (!customerEmail.trim() || !customerName.trim() || !selectedPlan) return

    setIsLoading(true)
    setError(null)

    const plan = getPlanDetails(selectedPlan)
    const basePrice = parseFloat(plan.price.replace('R$ ', '').replace(',', '.'))
    const amount = wantsVipGroup ? basePrice + 9.9 : basePrice

    try {
      const response = await fetch('/api/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          customerEmail: customerEmail.trim(),
          customerName: customerName.trim(),
          plan: selectedPlan,
          vipGroup: wantsVipGroup,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Erro ao gerar QR Code')
        return
      }

      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Lead', {
          content_name: `Plano ${plan.name}`,
          content_category: 'subscription',
          value: amount,
          currency: 'BRL',
        })
      }
      if (typeof window !== 'undefined' && (window as any).ttq) {
        ;(window as any).ttq.track('AddToCart', {
          content_name: `Plano ${plan.name}`,
          content_category: 'subscription',
          value: amount,
          currency: 'BRL',
        })
      }

      setQrCodeData(data.data)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Promotional Banner */}
        <div className="bg-primary text-white text-center py-3 px-4 font-semibold text-sm">
          {t.promoBanner(promoDate)}
        </div>

        {/* Banner Section */}
        <div className="w-full bg-zinc-900">
          <div className="relative w-full h-[150px] overflow-hidden">
            <Image
              src="/images/banner.webp"
              alt="Banner"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
              priority
            />
          </div>
        </div>

        {/* Profile Header Section */}
        <div className="px-4 pb-3 bg-white relative">
          <div className="flex items-end justify-between">
            <div className="-mt-[38px]">
              <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#f78f3e] to-[#f9a55c] overflow-hidden border-[3px] border-white shadow-lg">
                <Image
                  src="/images/profile.webp"
                  alt="Lana Alencar"
                  width={76}
                  height={76}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground pb-2">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">159</span>
                <span>{t.stats.photos}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">68</span>
                <span>{t.stats.videos}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">69.2K</span>
                <span>{t.stats.likes}</span>
              </div>
            </div>
          </div>

          <div className="mt-2 mb-2">
            <div className="flex items-center gap-2 mb-0">
              <h2 className="text-lg font-bold text-foreground">Lana Alencar</h2>
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{t.username}</p>
          </div>

          <ProfileBio bioText={t.bioText} showMore={t.showMore} showLess={t.showLess} />
        </div>

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

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-zinc-100 rounded-2xl px-8 py-6 shadow-lg">
                <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7 text-zinc-600" />
                </div>
                <p className="text-foreground font-semibold mb-1">{t.exclusiveContent}</p>
                <p className="text-muted-foreground text-sm">{t.subscribeToUnlock}</p>
              </div>
            </div>

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

        <TestimonialsCarousel title={t.testimonialsTitle} testimonials={t.testimonials} />

        {/* Subscription Section */}
        <div className="px-4 py-6 bg-zinc-50">
          <h3 className="text-2xl font-bold text-foreground mb-4">{t.subscriptionsTitle}</h3>

          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="bg-[#fde4cc] text-[#f78f3e] border-0 font-semibold">
              {t.badgeAll}
            </Badge>
            <Badge variant="secondary" className="bg-[#f78f3e] text-white border-0 font-semibold">
              {t.badgePromo}
            </Badge>
          </div>

          <div className="flex flex-col gap-4 mb-4">
            {t.plans.map((plan) =>
              plan.featured ? (
                <Card
                  key={plan.id}
                  className="bg-gradient-to-br from-[#f78f3e] to-[#f9a55c] text-white p-5 border-0 shadow-lg relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold mb-0.5">{plan.name}</p>
                      <p className="text-xs text-white/70">{plan.days}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/70 line-through">{plan.oldPrice}</p>
                      <p className="text-2xl font-bold">{plan.price}</p>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-[#e07520] text-white hover:bg-[#c96a1c] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-lg hover:shadow-xl"
                    onClick={() => openCheckout(plan.id)}
                  >
                    {t.subscribeBtn(plan.name)}
                  </Button>
                </Card>
              ) : (
                <Card key={plan.id} className="bg-white border-2 border-zinc-200 p-5 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-0.5">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">{plan.days}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground line-through">{plan.oldPrice}</p>
                      <p className="text-2xl font-bold text-foreground">{plan.price}</p>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-md hover:shadow-lg"
                    onClick={() => openCheckout(plan.id)}
                  >
                    {t.subscribeBtn(plan.name)}
                  </Button>
                </Card>
              )
            )}
          </div>

          <div className="bg-[#fef0e4] border-2 border-[#f78f3e] rounded-lg p-3 mb-4">
            <p className="text-sm font-bold text-primary text-center">{t.instantAccess}</p>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm mb-6">
            <div className="flex items-center gap-1 text-[#f78f3e]">
              <Lock className="w-4 h-4" />
              <span className="font-medium">{t.securePayment}</span>
            </div>
            <div className="text-muted-foreground">|</div>
            <div className="flex items-center gap-1 text-primary">
              <Check className="w-4 h-4" />
              <span className="font-medium">{t.instantAccessShort}</span>
            </div>
          </div>

          <div className="relative aspect-square bg-zinc-800 rounded-2xl overflow-hidden mb-4">
            <Image src="/images/gallery1.webp" alt={t.exclusiveContent} fill className="object-cover object-center" sizes="100vw" />
          </div>

          <div className="relative aspect-square bg-zinc-800 rounded-2xl overflow-hidden -mb-6">
            <Image src="/images/gallery4.webp" alt={t.exclusiveContent} fill className="object-cover object-center" sizes="100vw" />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-4 py-6 bg-zinc-50">
          <h3 className="text-2xl font-bold text-primary mb-4">{t.faqTitle}</h3>

          <div className="flex flex-col gap-3">
            {t.faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border-2 border-zinc-200 overflow-hidden">
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
            <button className="hover:text-primary">{t.terms}</button>
            <span>|</span>
            <button className="hover:text-primary">{t.privacy}</button>
          </div>
        </div>
      </div>

      {/* Checkout Modal - somente PT (PIX) */}
      {isPt && showCheckoutModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
            onClick={qrCodeData ? undefined : closeCheckout}
          />

          <div className="fixed inset-x-0 bottom-0 z-50" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <div className="bg-white rounded-t-3xl p-6 max-w-lg mx-auto shadow-2xl relative">
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mb-4" />

              {!qrCodeData && (
                <button
                  onClick={closeCheckout}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-zinc-600" />
                </button>
              )}

              {selectedPlan && (
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-foreground">Plano {getPlanDetails(selectedPlan).name}</h3>
                  <p className="text-xl font-bold text-primary">
                    {(() => {
                      const basePrice = parseFloat(getPlanDetails(selectedPlan).price.replace('R$ ', '').replace(',', '.'))
                      const total = wantsVipGroup ? basePrice + 9.9 : basePrice
                      return `R$ ${total.toFixed(2).replace('.', ',')}`
                    })()}
                  </p>
                </div>
              )}

              {qrCodeData ? (
                <div className="text-center">
                  {/* Mesmo após o pagamento ser identificado, a página NÃO muda:
                      o acesso é enviado manualmente. Mantemos sempre a tela do QR Code. */}
                  {false ? (
                    <>
                      <div className="bg-green-100 border-2 border-green-500 rounded-xl p-6 mb-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-700 mb-2">{t.paymentConfirmed}</h3>
                        <p className="text-sm text-green-600">{t.accessReleased}</p>
                      </div>

                      <div className="bg-zinc-100 rounded-xl p-4 mb-4">
                        <p className="text-sm text-foreground font-medium mb-1">{t.accessPlatform}</p>
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
                        {t.accessBtn}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="bg-white p-1 rounded-xl border-2 border-zinc-200 mb-3 inline-block">
                        <img src={qrCodeData.qrCodeImage} alt="QR Code PIX" className="w-52 h-52 mx-auto" />
                      </div>

                      <p className="text-sm text-foreground font-medium mb-2">{t.scanQr}</p>
                      <p className="text-xs text-muted-foreground mb-3">{t.orCopyPix}</p>

                      <div className="bg-zinc-100 rounded-xl p-2 mb-3">
                        <p className="text-xs text-foreground break-all font-mono">{qrCodeData.qrCode.substring(0, 40)}...</p>
                      </div>

                      <Button
                        size="lg"
                        className={`w-full font-bold text-base h-11 transition-all duration-150 ${copied ? 'bg-green-500 text-white cursor-default' : 'bg-primary text-white hover:bg-[#e07520] active:scale-95'}`}
                        onClick={() => {
                          if (!copied) {
                            navigator.clipboard.writeText(qrCodeData.qrCode)
                            setCopied(true)
                            if (typeof window !== 'undefined' && (window as any).ttq) {
                              const plan = getPlanDetails(selectedPlan || t.plans[0].id)
                              const amount = parseFloat(plan.price.replace('R$ ', '').replace(',', '.'))
                              ;(window as any).ttq.track('InitiateCheckout', {
                                content_name: `Plano ${plan.name}`,
                                content_category: 'subscription',
                                value: amount,
                                currency: 'BRL',
                              })
                            }
                          }
                        }}
                        disabled={copied}
                      >
                        {copied ? (
                          <span className="flex items-center justify-center gap-2">
                            {t.copiedBtn} <Check className="w-4 h-4" />
                          </span>
                        ) : (
                          t.copyPixBtn
                        )}
                      </Button>

                      <div className="bg-[#fef0e4] border border-[#f78f3e] rounded-xl p-2 mt-3">
                        <p className="text-xs text-center text-primary">{t.waitingPayment}</p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t.nameLabel}</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full h-12 px-4 rounded-xl border-2 border-zinc-200 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t.emailLabel}</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full h-12 px-4 rounded-xl border-2 border-zinc-200 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Order Bump - Grupo VIP (somente PT) */}
                  <button
                    type="button"
                    onClick={() => setWantsVipGroup(!wantsVipGroup)}
                    className={`w-full text-left rounded-xl border-2 p-3 mb-4 transition-colors ${wantsVipGroup ? 'border-primary bg-[#fef0e4]' : 'border-dashed border-zinc-300 bg-zinc-50'}`}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center border-2 transition-colors ${wantsVipGroup ? 'bg-primary border-primary' : 'border-zinc-300 bg-white'}`}
                      >
                        {wantsVipGroup && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <Crown className="w-4 h-4 text-primary" />
                          <p className="text-sm font-bold text-foreground">{t.vipTitle}</p>
                          <span className="text-sm font-bold text-primary">+ R$ 9,90</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{t.vipDesc}</p>
                      </div>
                    </div>
                  </button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                      <p className="text-xs text-center text-red-600">{error}</p>
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-14 active:scale-95 transition-all duration-150 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreateAccount}
                    disabled={!customerEmail.includes('@') || !customerName.trim() || isLoading}
                  >
                    {isLoading ? t.submitLoading : t.submitIdle}
                  </Button>
                </>
              )}

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>{t.securePix}</span>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes slideUp {
              from {
                transform: translateY(100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
        </>
      )}
    </>
  )
}
