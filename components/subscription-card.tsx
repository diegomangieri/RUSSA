'use client'

import { Phone, ArrowRight, Gift, Lock, Check } from 'lucide-react'

type PromoPlan = {
  key: string
  label: string
  price: string
  badge: string
  badgeColor: 'green' | 'orange'
  icon?: boolean
}

const promoPlans: PromoPlan[] = [
  { key: '3meses', label: '3 Meses', price: 'R$ 14,90', badge: 'Mais popular', badgeColor: 'green', icon: true },
  { key: '1ano', label: '1 Ano', price: 'R$ 19,90', badge: 'Melhor oferta', badgeColor: 'green' },
  { key: 'vitalicio', label: 'Vitalício', price: 'R$ 24,90', badge: 'Exclusivo', badgeColor: 'orange' },
]

export default function SubscriptionCard({ onSubscribe }: { onSubscribe: (plan: string) => void }) {
  return (
    <div className="px-4 py-4">
      <div className="bg-white rounded-2xl shadow-md border border-zinc-100 p-5 max-w-md mx-auto">
        <h3 className="text-center text-lg font-bold text-foreground mb-4">Assinaturas</h3>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-md bg-[#fde4cc] text-[#f78f3e]">
            Veja tudo agora
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-md bg-green-100 text-green-600">
            Promocional
          </span>
        </div>

        {/* 30 Dias button */}
        <button
          onClick={() => onSubscribe('30dias')}
          className="w-full flex items-center justify-between bg-gradient-to-r from-[#f78f3e] to-[#f9a55c] text-white rounded-full pl-5 pr-4 py-3 font-bold shadow-md active:scale-95 transition-transform mb-3"
        >
          <span>30 Dias</span>
          <span className="flex items-center gap-1">
            R$ 9,97 <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        {/* Video call button */}
        <button
          onClick={() => onSubscribe('30dias')}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#f78f3e] text-[#f78f3e] rounded-full px-5 py-2.5 font-bold text-sm active:scale-95 transition-transform mb-3"
        >
          <Phone className="w-4 h-4" />
          Chamada de vídeo comigo hoje!
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" /> Pagamento 100% seguro
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" /> Acesso ilimitado
          </span>
        </div>

        {/* Promoções */}
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Promoções</p>
        <div className="flex flex-col gap-3">
          {promoPlans.map((plan) => (
            <button
              key={plan.key}
              onClick={() => onSubscribe(plan.key)}
              className="w-full flex items-center justify-between border border-zinc-200 rounded-xl px-4 py-3 hover:border-[#f78f3e] transition-colors active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                {plan.icon && <Gift className="w-4 h-4 text-[#f78f3e]" />}
                <span className="font-semibold text-foreground">{plan.label}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    plan.badgeColor === 'green' ? 'bg-green-100 text-green-600' : 'bg-[#fde4cc] text-[#f78f3e]'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>
              <span className="font-bold text-foreground">{plan.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
