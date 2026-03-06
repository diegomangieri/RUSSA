'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, ChevronDown, Lock, Check, Crown } from 'lucide-react'
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

function ProfileBio() {
  const [expanded, setExpanded] = useState(false)
  const bioText = 'Talvez você tenha chegado aqui depois do meu vídeo que viralizou… então vou te mostrar um lado meu que ninguém conhece. Minha bunda grande e redondinha faz meu corpo ser único — e aqui eu mostro tudo sem censura. Ficou curioso…? vem me ver toda! 😈'
  
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

const CRITICAL_IMAGES = [
  '/images/locked-1.jpg',
  '/images/locked-2.jpg',
  '/nina-profile.jpg',
]

function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        })
    )
  )
}

export default function VIPSubscriptionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [promoDate] = useState(getPromoDate)
  const [pageReady, setPageReady] = useState(false)
  const [ageVerified, setAgeVerified] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    preloadImages(CRITICAL_IMAGES).then(() => {
      requestAnimationFrame(() => setPageReady(true))
    })
  }, [])

  const handleAgeConfirm = () => {
    setAgeVerified(true)
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
      question: "Possuí reembolso ou garantia?",
      answer: "Temos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro."
    },
    {
      question: "Como vou acessar os conteúdos?",
      answer: "Após assinar, você receberá o convite exclusivo via E-mail para o Grupo VIP com conteúdos extras, interação direta e atualizações diárias."
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
      {!showContent && (
        <div 
          className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 py-8 transition-opacity duration-500 ease-out ${pageReady ? 'opacity-100' : 'opacity-0'} ${ageVerified ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onTransitionEnd={() => {
            if (ageVerified) setShowContent(true)
          }}
        >
          <div className="text-center w-full max-w-sm">
            {/* Logo */}
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-6">{'Conteúdos VIP'}</h1>
            
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

      {/* Main content */}
      <div className={`min-h-screen bg-background transition-opacity duration-700 ease-out ${pageReady && showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Promotional Banner */}
      <div className="bg-primary text-white text-center py-3 px-4 font-semibold text-sm">
        ESSA PROMOÇÃO É VÁLIDA ATÉ {promoDate}
      </div>

      {/* Logo Section */}
      <div className="bg-background py-2 px-4 flex justify-center border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
            <Crown className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{'Conteúdos VIP'}</h1>
        </div>
      </div>

      {/* Banner Section with Profile Overlay */}
      <div className="w-full bg-zinc-900 relative">
        <div className="relative w-full h-[130px] overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0447.PNG-73vlhPvb0rUhTgmubSul8fZ6KSJuhd.jpeg"
            alt="Banner"
            fill
            className="object-cover object-[center_35%]"
            priority
          />
        </div>
        
        {/* Stats row - positioned at bottom right of banner */}
        <div className="absolute bottom-2 right-4 flex items-center gap-3 text-xs text-white/90">
          <div className="flex items-center gap-1">
            <span className="font-semibold">159</span>
            <span className="opacity-80">Fotos</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">68</span>
            <span className="opacity-80">{'Vídeos'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">69.2K</span>
            <span className="opacity-80">Likes</span>
          </div>
        </div>
      </div>

      {/* Profile Header Section */}
      <div className="px-4 pb-3 bg-white relative">
        {/* Profile picture - half overlapping banner */}
        <div className="-mt-[38px] mb-2">
          <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#f78f3e] to-[#f9a55c] overflow-hidden border-[3px] border-white shadow-lg">
            <Image
              src="/nina-profile.jpg"
              alt="Nina Lebedeva"
              width={76}
              height={76}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Name and username */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-0">
            <h2 className="text-lg font-bold text-foreground">Nina Lebedeva</h2>
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">@nina.lebedeva</p>
        </div>
        
        <ProfileBio />
      </div>

      {/* Divider line */}
      <div className="h-px bg-zinc-200" />

      {/* Hero Image Section - Preview */}
      <div className="relative">
        <div className="w-full h-[400px] bg-zinc-800 relative overflow-hidden flex items-center justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cc2c2d6d-02cb-4e29-9c04-71c9535c9f45-hfjdnhziQP5quafnQX62NgKiwQAPpi.jpg"
            alt="Conteúdo Exclusivo"
            className="absolute inset-0 w-full h-full object-cover object-center"
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
                <p className="text-xs text-muted-foreground line-through">R$ 39,90</p>
                <p className="text-2xl font-bold text-foreground">R$ 13,95</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-md hover:shadow-lg"
              onClick={() => window.location.href = checkoutLinks.semanal}
            >
              Assinar Semanal!
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
                <p className="text-xs text-white/70 line-through">R$ 89,90</p>
                <p className="text-2xl font-bold">R$ 19,90</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-[#e07520] text-white hover:bg-[#c96a1c] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-lg hover:shadow-xl"
              onClick={() => window.location.href = checkoutLinks.mensal}
            >
              Assinar Mensal!
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
                <p className="text-xs text-muted-foreground line-through">R$ 199,90</p>
                <p className="text-2xl font-bold text-foreground">R$ 29,95</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-primary text-white hover:bg-[#e07520] font-bold text-base h-12 active:scale-95 transition-transform duration-150 shadow-md hover:shadow-lg"
              onClick={() => window.location.href = checkoutLinks.semestral}
            >
              Assinar Semestral!
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
        <div className="relative aspect-[3/4] bg-zinc-800 rounded-2xl overflow-hidden mb-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/42285de4-f01f-4093-ade1-f2aa38a87ca3-DrWXZca3wNkMRdjCPjPEEUJ9gAVtZF.jpg"
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
        <div className="relative aspect-[3/4] bg-zinc-800 rounded-2xl overflow-hidden mb-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0460%20%281%29.JPEG-gF8pqb2tzKnXHo93pgU7iskMUgpaeE.jpeg"
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

        {/* Locked Content Preview 3 */}
        <div className="relative aspect-[3/4] bg-zinc-800 rounded-2xl overflow-hidden -mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b4364e80-ae3c-498a-bfe4-40b2b1b4a67e-dIRYvA1h6xKpRlPKfp00t1rnRIJziA.jpg"
            alt="Conteúdo Exclusivo"
            fill
            className="object-cover object-left"
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
    </>
  )
}
