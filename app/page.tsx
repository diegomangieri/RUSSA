'use client'

import { useState, useCallback } from 'react'
import { Presell, LoadingScreen } from '@/components/presell'
import { SiteContent } from '@/components/site-content'

type Lang = 'pt' | 'en'
type View = 'presell' | 'loading' | 'pt' | 'en'

// Imagens/vídeos usados no site - pré-carregados durante o loading
const ASSETS = [
  '/images/banner.png',
  '/images/profile.png',
  '/images/gallery2.png',
  '/images/gallery4.png',
]

const LOADING_TEXT: Record<Lang, string> = {
  pt: 'Carregando conteúdos...',
  en: 'Loading content...',
}

export default function Page() {
  const [view, setView] = useState<View>('presell')
  const [lang, setLang] = useState<Lang>('pt')

  const enter = useCallback((chosen: Lang) => {
    setLang(chosen)
    setView('loading')

    // Pré-carrega os assets para que o site abra sem delay
    const preloads = ASSETS.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        })
    )

    // Pré-carrega o vídeo do preview
    const videoPreload = new Promise<void>((resolve) => {
      const video = document.createElement('video')
      video.oncanplaythrough = () => resolve()
      video.onerror = () => resolve()
      video.src = '/videos/preview-locked.mp4'
      video.load()
    })

    // Garante tempo mínimo de exibição do loading + espera os assets (com teto de segurança)
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 900))
    const safetyCap = new Promise<void>((resolve) => setTimeout(resolve, 3500))

    Promise.race([
      Promise.all([...preloads, videoPreload, minDelay]).then(() => undefined),
      safetyCap,
    ]).then(() => {
      setView(chosen)
      window.scrollTo(0, 0)
    })
  }, [])

  if (view === 'presell') {
    return <Presell onEnter={enter} />
  }

  if (view === 'loading') {
    return <LoadingScreen text={LOADING_TEXT[lang]} />
  }

  return <SiteContent lang={view} />
}
