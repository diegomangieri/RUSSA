'use client'

import { useEffect } from 'react'

/**
 * Desativa interações que facilitam a cópia do conteúdo do site:
 * - Clique com o botão direito (menu de contexto)
 * - Seleção de texto e arrastar
 * - Atalhos de teclado de inspeção/cópia (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, Ctrl+C, etc.)
 */
export function ContentProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault()

    const blockSelection = (e: Event) => e.preventDefault()

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      // F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault()
        return
      }

      // Ctrl+Shift+I / J / C (DevTools) e Ctrl+Shift+K (console Firefox)
      if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) {
        e.preventDefault()
        return
      }

      // Ctrl+U (ver código-fonte), Ctrl+S (salvar), Ctrl+C (copiar),
      // Ctrl+A (selecionar tudo), Ctrl+P (imprimir)
      if (e.ctrlKey && ['u', 's', 'c', 'a', 'p'].includes(key)) {
        e.preventDefault()
        return
      }

      // Cmd (macOS) equivalentes
      if (e.metaKey && ['u', 's', 'c', 'a', 'p'].includes(key)) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', blockContextMenu)
    document.addEventListener('selectstart', blockSelection)
    document.addEventListener('copy', blockSelection)
    document.addEventListener('cut', blockSelection)
    document.addEventListener('dragstart', blockSelection)
    document.addEventListener('keydown', blockKeys)

    // Impede seleção de texto via CSS
    const prevUserSelect = document.body.style.userSelect
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu)
      document.removeEventListener('selectstart', blockSelection)
      document.removeEventListener('copy', blockSelection)
      document.removeEventListener('cut', blockSelection)
      document.removeEventListener('dragstart', blockSelection)
      document.removeEventListener('keydown', blockKeys)
      document.body.style.userSelect = prevUserSelect
      document.body.style.webkitUserSelect = prevUserSelect
    }
  }, [])

  return null
}
