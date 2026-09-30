// Shared behaviour for dialogs: page scroll lock, Escape closes only the top-most dialog, and
// Tab / Shift+Tab stay inside it. One document-level key listener serves every open dialog.
import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { lockScroll, unlockScroll } from './scrollLock'

interface Layer {
  getDialog: () => HTMLElement | null
  close: () => void
}

const layers: Layer[] = []

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function onKeyDown(e: KeyboardEvent) {
  const top = layers[layers.length - 1]
  if (!top) return
  if (e.key === 'Escape') {
    e.preventDefault()
    top.close()
    return
  }
  if (e.key !== 'Tab') return
  const dialog = top.getDialog()
  if (!dialog) return
  const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0)
  if (items.length === 0) {
    e.preventDefault()
    dialog.focus()
    return
  }
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (!active || !dialog.contains(active)) {
    e.preventDefault()
    ;(e.shiftKey ? last : first).focus()
  } else if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

/** Register a dialog while `open`: locks page scroll, handles Escape (top-most only) and traps Tab focus. */
export function useModalLayer(open: boolean, dialogRef: RefObject<HTMLElement | null>, onClose: () => void): void {
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const layer: Layer = { getDialog: () => dialogRef.current, close: () => closeRef.current() }
    if (layers.length === 0) document.addEventListener('keydown', onKeyDown)
    layers.push(layer)
    lockScroll()
    return () => {
      const i = layers.indexOf(layer)
      if (i !== -1) layers.splice(i, 1)
      if (layers.length === 0) document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
}
