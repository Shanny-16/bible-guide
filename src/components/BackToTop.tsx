import { useEffect, useState } from 'react'
import { ArrowUpIcon } from './icons'

const SHOW_AFTER = 600

/** Floating "back to top" button; appears once the reader has scrolled well down a page. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > SHOW_AFTER)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const handleClick = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: (reduced ? 'instant' : 'smooth') as ScrollBehavior })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-20 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream text-ink shadow-[0_2px_12px_rgba(42,40,51,0.15)] transition duration-200 hover:bg-white sm:bottom-6 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  )
}
