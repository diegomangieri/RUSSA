'use client'

import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { Check, Lock, Heart, MessageCircle, Bookmark, MoreVertical, LayoutGrid, PlaySquare } from 'lucide-react'

type ContentTabsProps = {
  children: ReactNode
  onUnlock: () => void
}

export function ContentTabs({ children, onUnlock }: ContentTabsProps) {
  const [tab, setTab] = useState<'posts' | 'media'>('posts')

  return (
    <>
      <div className="flex border-y border-zinc-200 bg-white sticky top-0 z-10">
        <button
          onClick={() => setTab('posts')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-wide transition-colors ${
            tab === 'posts'
              ? 'font-bold text-foreground border-b-2 border-[#f78f3e]'
              : 'font-semibold text-muted-foreground'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          754 POSTAGENS
        </button>
        <button
          onClick={() => setTab('media')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-wide transition-colors ${
            tab === 'media'
              ? 'font-bold text-[#f78f3e] border-b-2 border-[#f78f3e]'
              : 'font-semibold text-muted-foreground'
          }`}
        >
          <PlaySquare className="w-4 h-4" />
          371 MÍDIAS
        </button>
      </div>

      {tab === 'posts' ? children : <MediaGrid onUnlock={onUnlock} />}
    </>
  )
}

function MediaGrid({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="bg-white pb-4">
      <div className="grid grid-cols-3 gap-1 p-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <button
            key={i}
            onClick={onUnlock}
            aria-label="Desbloquear mídia"
            className="relative aspect-square bg-zinc-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <Lock className="w-6 h-6 text-zinc-500" />
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground pt-3">
        Mostrando 12 de 371 mídias
      </p>
    </div>
  )
}

type LockedPostProps = {
  caption: string
  likes: string
  comments: string
  videoSrc?: string
  imageSrc?: string
  onUnlock: () => void
}

export default function LockedPost({ caption, likes, comments, videoSrc, imageSrc, onUnlock }: LockedPostProps) {
  return (
    <article className="bg-white border-b border-zinc-200">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-200 shrink-0">
          <Image
            src="/images/profile.jpg"
            alt="Lana Oficial"
            width={36}
            height={36}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm text-foreground truncate">LANA OFICIAL</span>
            <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-white" />
            </span>
          </div>
          <p className="text-xs text-muted-foreground">@lanaoficial1_</p>
        </div>
        <MoreVertical className="w-5 h-5 text-muted-foreground shrink-0" />
      </div>

      {/* Caption */}
      <p className="px-4 pb-3 text-sm text-foreground leading-relaxed">{caption}</p>

      {/* Locked media */}
      <button
        onClick={onUnlock}
        className="relative block w-full aspect-square bg-zinc-900 overflow-hidden"
        aria-label="Desbloquear conteúdo"
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover blur-[4px] scale-105 pointer-events-none"
          />
        ) : imageSrc ? (
          <Image src={imageSrc} alt="" fill className="object-cover blur-[4px] scale-105" sizes="100vw" />
        ) : null}

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6 text-zinc-800" />
          </div>
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-white" /> {likes}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" /> {comments}
            </span>
          </div>
        </div>
      </button>

      {/* Actions */}
      <div className="flex items-center gap-5 px-4 py-3">
        <button aria-label="Curtir">
          <Heart className="w-6 h-6 text-foreground" />
        </button>
        <button aria-label="Comentar">
          <MessageCircle className="w-6 h-6 text-foreground" />
        </button>
        <button aria-label="Salvar" className="ml-auto">
          <Bookmark className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </article>
  )
}
