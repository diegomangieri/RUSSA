'use client'

import { useState } from 'react'

// Total de etapas do quiz. Vai crescer conforme novas etapas forem adicionadas.
const TOTAL_STEPS = 8

interface QuizProps {
  onComplete: () => void
}

export default function Quiz({ onComplete }: QuizProps) {
  // step é 0-indexed. step 0 = tela inicial "Você está pronto?"
  const [step, setStep] = useState(0)

  const progress = ((step + 1) / TOTAL_STEPS) * 100

  const goNext = () => {
    if (step >= TOTAL_STEPS - 1) {
      onComplete()
      return
    }
    setStep((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Barra de progresso */}
      <div className="w-full h-1.5 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Conteúdo da etapa */}
      <div className="flex-1 flex items-center justify-center px-6">
        {step === 0 && <StartStep onNext={goNext} />}
      </div>
    </div>
  )
}

function StartStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-center">
      <div className="text-6xl mb-6" role="img" aria-label="fogo">
        🔥
      </div>

      <h1 className="text-3xl font-bold text-foreground text-balance">
        {'Você está pronto?'}
      </h1>

      <p className="mt-3 text-base text-muted-foreground">
        {'Descubra o conteúdo exclusivo da '}
        <span className="text-primary font-semibold">dudinha</span>
      </p>

      <button
        onClick={onNext}
        className="mt-8 w-full max-w-sm rounded-2xl bg-primary py-4 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_10px_30px_-8px] shadow-primary/60 transition-transform active:scale-[0.98]"
      >
        Vamos começar
      </button>
    </div>
  )
}
