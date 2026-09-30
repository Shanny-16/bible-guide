import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpenIcon, SearchIcon } from './icons'
import { SearchPanel } from './SearchPanel'

const NAV_ITEMS = [
  { to: '/', label: 'Books' },
  { to: '/people', label: 'People' },
  { to: '/places', label: 'Places' },
  { to: '/storyline', label: 'Storyline' },
  { to: '/about', label: 'About' },
] as const

/** Books is active on the home list and on every /book/... page; the others also cover their detail routes. */
function isNavActive(to: string, pathname: string): boolean {
  if (to === '/') return pathname === '/' || pathname.startsWith('/book/')
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const navRowRef = useRef<HTMLDivElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)

  // Passive, rAF-throttled scroll listener: state only changes when the threshold is crossed.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      // sm+: the whole header is sticky, so the shadow starts almost immediately.
      // Below sm the title scrolls away and only the nav row sticks, so wait until the nav is actually pinned.
      const isWide = window.matchMedia('(min-width: 640px)').matches
      const threshold = isWide ? 10 : Math.max(10, (titleRef.current?.offsetHeight ?? 0) - 1)
      setScrolled(window.scrollY > threshold)
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

  // Close the search panel whenever the page changes.
  useEffect(() => {
    setSearchOpen(false)
  }, [pathname])

  // The panel hangs from the bottom of whichever element is pinned: the whole header on sm+, just the nav row below.
  const getSearchTop = useCallback(() => {
    const isWide = window.matchMedia('(min-width: 640px)').matches
    const el = isWide ? headerRef.current : navRowRef.current
    return el ? Math.round(el.getBoundingClientRect().bottom) : 0
  }, [])

  // Every page except home renders its own h1, so the title is only an h1 on home.
  const TitleTag = pathname === '/' ? 'h1' : 'div'

  return (
    // Below sm the header and its wrapper are display:contents: the title block scrolls away with the page
    // and only the nav row (its own sticky element) stays pinned, so nothing ever changes height while
    // scrolling. From sm up the whole header is one sticky row (title left, nav right).
    <header
      ref={headerRef}
      className={`max-sm:contents sm:sticky sm:top-0 sm:z-30 sm:border-b sm:border-ink/10 sm:bg-cream sm:transition-shadow ${
        scrolled ? 'sm:shadow-[0_2px_12px_rgba(42,40,51,0.08)]' : ''
      }`}
    >
      <div className="max-sm:contents sm:mx-auto sm:flex sm:max-w-4xl sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-1.5">
        <div ref={titleRef} className="px-4 pb-1.5 pt-3 sm:p-0">
          <Link to="/" className="flex items-center gap-2.5 rounded-lg">
            <BookOpenIcon className="h-7 w-7 shrink-0 text-gospels-deep" />
            <div>
              <TitleTag className="font-heading text-xl font-semibold leading-tight text-ink sm:text-2xl">Bible Notes</TitleTag>
              <p className="text-sm text-muted sm:hidden">A simple guide to help you read God&apos;s Word</p>
            </div>
          </Link>
        </div>

        <div
          ref={navRowRef}
          className={`sticky top-0 z-30 flex items-center border-b border-ink/10 bg-cream px-4 py-0.5 transition-shadow sm:static sm:border-0 sm:bg-transparent sm:p-0 ${
            scrolled ? 'shadow-[0_2px_12px_rgba(42,40,51,0.08)] sm:shadow-none' : ''
          }`}
        >
          <nav aria-label="Main" className="-ml-2 flex min-w-0 flex-1 flex-nowrap gap-0 overflow-x-auto scrollbar-none sm:-ml-1 sm:flex-none sm:gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavActive(item.to, pathname)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] shrink-0 items-center rounded-full px-2 text-sm font-semibold sm:px-3.5 transition-colors ${
                    isActive ? 'bg-gospels-soft text-gospels-deep' : 'text-muted hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <button
            type="button"
            ref={searchButtonRef}
            onClick={() => setSearchOpen((o) => !o)}
            aria-label="Search"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            className={`-mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors sm:-mr-1 ${
              searchOpen ? 'bg-gospels-soft text-gospels-deep' : 'text-muted hover:bg-ink/5 hover:text-ink'
            }`}
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} getTop={getSearchTop} returnFocusRef={searchButtonRef} />
    </header>
  )
}
