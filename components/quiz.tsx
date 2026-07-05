'use client'

import { useState } from 'react'

// Etapas do quiz. Basta adicionar novos objetos aqui conforme as próximas telas.
type QuizStep =
  | {
      type: 'start'
      emoji: string
      title: string
      subtitlePrefix: string
      highlight: string
      button: string
    }
  | {
      type: 'question'
      emoji: string
      title: string
      subtitle: string
      options: string[]
    }

const STEPS: QuizStep[] = [
  {
    type: 'start',
    emoji: '🔥',
    title: 'Você está pronto?',
    subtitlePrefix: 'Descubra o conteúdo exclusivo da ',
    highlight: 'Laninha!',
    button: 'Vamos começar',
  },
  {
    type: 'question',
    emoji: '😍',
    title: 'Você gosta de conteúdo exclusivo?',
    subtitle: 'Conteúdo que ela não posta em nenhum outro lugar',
    options: ['Sim, muito!', 'Depende...'],
  },
]

interface QuizProps {
  onComplete: () => void
}

export default function Quiz({ onComplete }: QuizProps) {
  // step é 0-indexed. step 0 = tela inicial "Você está pronto?"
  const [step, setStep] = useState(0)

  const progress = ((step + 1) / STEPS.length) * 100

  const goNext = () => {
    if (step >= STEPS.length - 1) {
      onComplete()
      return
    }
    setStep((prev) => prev + 1)
  }

  const current = STEPS[step]

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
        {current.type === 'start' && <StartStep step={current} onNext={goNext} />}
        {current.type === 'question' && <QuestionStep step={current} onSelect={goNext} />}
      </div>
    </div>
  )
}

function StartStep({
  step,
  onNext,
}: {
  step: Extract<QuizStep, { type: 'start' }>
  onNext: () => void
}) {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-center">
      <div className="text-6xl mb-6 animate-fire origin-bottom" role="img" aria-label="fogo">
        {step.emoji}
      </div>

      <h1 className="text-3xl font-bold text-foreground text-balance">{step.title}</h1>

      <p className="mt-3 text-base text-muted-foreground">
        {step.subtitlePrefix}
        <span className="text-primary font-semibold">{step.highlight}</span>
      </p>

      <button
        onClick={onNext}
        className="mt-8 w-full max-w-sm rounded-2xl bg-primary py-4 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_10px_30px_-8px] shadow-primary/60 transition-transform active:scale-[0.98]"
      >
        {step.button}
      </button>
    </div>
  )
}

function QuestionStep({
  step,
  onSelect,
}: {
  step: Extract<QuizStep, { type: 'question' }>
  onSelect: (answer: string) => void
}) {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-center">
      <div className="text-6xl mb-6" role="img" aria-label="emoji">
        {step.emoji}
      </div>

      <h1 className="text-3xl font-bold text-foreground text-balance">{step.title}</h1>

      <p className="mt-3 text-base text-muted-foreground text-pretty">{step.subtitle}</p>

      <div className="mt-8 w-full max-w-sm flex flex-col gap-4">
        {step.options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full rounded-2xl border border-border bg-secondary py-4 text-base font-semibold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
