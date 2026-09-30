import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Scrolls to the top whenever the route changes through a link (PUSH/REPLACE), so opening a related
 * person, place or book always starts at the top of that page. Back/forward (POP) is left alone so
 * the browser restores the position the reader was at.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()
  useEffect(() => {
    if (navigationType === 'POP') return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return null
}
