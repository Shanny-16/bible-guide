// Shared "Add to Home Screen" plumbing: captures the browser's
// `beforeinstallprompt` event once at module scope (it only fires a single
// time per page load) so both the Books-page banner and the About-page
// "Install app" entry can trigger the same captured prompt. Also detects
// iOS Safari, which never fires that event, and whether the app is already
// running standalone (installed).
import { useCallback, useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferredPrompt: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()

function notify(): void {
  listeners.forEach((listener) => listener())
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event as BeforeInstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    notify()
  })
}

export function isStandaloneDisplay(): boolean {
  try {
    const nav = navigator as Navigator & { standalone?: boolean }
    return window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true
  } catch {
    return false
  }
}

export function isIOSDevice(): boolean {
  try {
    return /iphone|ipad|ipod/i.test(navigator.userAgent)
  } catch {
    return false
  }
}

/** Shared install-prompt state: a captured Android/desktop prompt (if any), plus iOS/standalone detection. */
export function useInstallPrompt() {
  const [canPrompt, setCanPrompt] = useState<boolean>(() => deferredPrompt !== null)

  useEffect(() => {
    const sync = () => setCanPrompt(deferredPrompt !== null)
    listeners.add(sync)
    return () => {
      listeners.delete(sync)
    }
  }, [])

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    deferredPrompt = null
    notify()
    return choice.outcome === 'accepted'
  }, [])

  return {
    canPrompt,
    promptInstall,
    isIOS: isIOSDevice(),
    isStandalone: isStandaloneDisplay(),
  }
}
