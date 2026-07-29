'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'

export function Presell({ onEnter }: { onEnter: (lang: 'pt' | 'en') => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f78f3e] to-[#e07520] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-5">
          <Image
            src="/images/profile.png"
            alt="Lana Alencar"
            width={112}
            height={112}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Name */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-white">Lana Alencar</h1>
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
        </div>
        <p className="text-white/80 text-sm mb-8">@lana.alencar</p>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => onEnter('pt')}
            className="w-full bg-white text-primary font-bold text-lg h-14 rounded-2xl shadow-lg active:scale-95 transition-transform duration-150 hover:bg-white/90"
          >
            Meus conteúdos aqui! (BRL 🇧🇷)
          </button>

          <button
            onClick={() => onEnter('en')}
            className="w-full bg-[#c96a1c] text-white font-bold text-lg h-14 rounded-2xl shadow-lg active:scale-95 transition-transform duration-150 hover:bg-[#b85f16] border-2 border-white/30"
          >
            My contents here! (USD 🇺🇸)
          </button>
        </div>
      </div>
    </div>
  )
}

export function LoadingScreen({ text }: { text: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f78f3e] to-[#e07520] flex flex-col items-center justify-center px-6">
      <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin mb-6" />
      <p className="text-white font-semibold text-lg">{text}</p>
    </div>
  )
}
