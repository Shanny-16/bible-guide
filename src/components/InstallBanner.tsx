import { useState } from 'react'
import { useInstallDismissed } from '../lib/storage'
import { useInstallPrompt } from '../lib/installPrompt'
import { AddToHomeIcon, InstallIcon, ShareIcon } from './icons'

/** The iPhone/iPad Safari two-step manual hint, reused by the banner and the About-page entry. */
function IosHint() {
  return (
    <ol className="flex flex-col gap-1.5 text-sm text-muted">
      <li className="flex items-center gap-1.5">
        <ShareIcon className="h-4 w-4 shrink-0 text-ink" />
        Tap the Share button
      </li>
      <li className="flex items-center gap-1.5">
        <AddToHomeIcon className="h-4 w-4 shrink-0 text-ink" />
        Then "Add to Home Screen"
      </li>
    </ol>
  )
}

/**
 * Soft "Add to Home Screen" card shown at the bottom of the Books page,
 * above the footer — once per device, until dismissed. Android/Chrome/Edge
 * get a real Install button (from the captured beforeinstallprompt event);
 * iPhone/iPad Safari never fires that event, so they get a two-step manual
 * hint instead. Any other browser, or an already-installed app, renders
 * nothing.
 */
export function InstallBanner() {
  const { dismissed, dismiss } = useInstallDismissed()
  const { canPrompt, promptInstall, isIOS, isStandalone } = useInstallPrompt()
  const [installed, setInstalled] = useState(false)

  if (isStandalone || dismissed || installed || (!canPrompt && !isIOS)) return null

  async function handleInstall() {
    const accepted = await promptInstall()
    if (accepted) setInstalled(true)
  }

  return (
    <div className="flex flex-col gap-3 rounded-card border border-ink/10 bg-white p-4 sm:flex-row sm:items-center sm:gap-4">
      <img src="/pwa-192x192.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-xl" />

      <div className="flex-1">
        <p className="font-heading text-base font-semibold text-ink">Add Bible Notes to your phone</p>
        {canPrompt ? (
          <p className="text-sm text-muted">Opens like an app, works offline for passages you've read.</p>
        ) : (
          <div className="mt-1.5">
            <IosHint />
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {canPrompt && (
          <button
            type="button"
            onClick={handleInstall}
            className="inline-flex min-h-[44px] items-center rounded-full bg-gospels-soft px-4 text-sm font-semibold text-gospels-deep"
          >
            Install
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-semibold text-muted hover:bg-ink/5 hover:text-ink"
        >
          {canPrompt ? 'Not now' : 'Got it'}
        </button>
      </div>
    </div>
  )
}

/**
 * A small "Install app" entry for the About page. Re-opens the same install
 * flow even if the banner above was already dismissed: it calls prompt()
 * directly when the browser supports it, otherwise reveals the iOS hint
 * inline. Renders nothing once the app is already installed, or on a
 * browser that offers neither path.
 */
export function InstallAppEntry() {
  const { canPrompt, promptInstall, isIOS, isStandalone } = useInstallPrompt()
  const [showHint, setShowHint] = useState(false)
  const [installed, setInstalled] = useState(false)

  if (isStandalone || installed || (!canPrompt && !isIOS)) return null

  async function handleClick() {
    if (canPrompt) {
      const accepted = await promptInstall()
      if (accepted) setInstalled(true)
    } else {
      setShowHint((value) => !value)
    }
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-heading text-xl font-semibold text-ink">Install the app</h2>
      <p className="text-sm text-muted">Add Bible Notes to your phone's home screen for quick, offline-friendly access.</p>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-ink/15 bg-white px-4 text-sm font-semibold text-ink hover:bg-ink/5"
      >
        <InstallIcon className="h-4 w-4 shrink-0" />
        Install app
      </button>
      {showHint && (
        <div className="rounded-card border border-ink/10 bg-white p-3">
          <IosHint />
        </div>
      )}
    </section>
  )
}
