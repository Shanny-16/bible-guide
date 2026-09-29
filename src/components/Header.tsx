import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookOpenIcon } from './icons'

const NAV_ITEMS = [
  { to: '/', label: 'Books', end: true },
  { to: '/people', label: 'People', end: false },
  { to: '/places', label: 'Places', end: false },
  { to: '/storyline', label: 'Storyline', end: false },
  { to: '/about', label: 'About', end: false },
] as const

export function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Passive, rAF-throttled scroll listener: state only changes when the threshold is crossed.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 10)
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

  // Every page except home renders its own h1, so the title is only an h1 on home.
  const TitleTag = pathname === '/' ? 'h1' : 'div'

  return (
    <header
      className={`border-b border-ink/10 bg-cream transition-shadow sm:sticky sm:top-0 sm:z-30 ${
        scrolled ? 'sm:shadow-[0_2px_12px_rgba(42,40,51,0.08)]' : ''
      }`}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 pb-3 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-1.5">
        <Link to="/" className="flex items-center gap-2.5 rounded-lg">
          <BookOpenIcon className="h-7 w-7 shrink-0 text-gospels-deep" />
          <div>
            <TitleTag className="font-heading text-xl font-semibold leading-tight text-ink sm:text-2xl">Bible Notes</TitleTag>
            <p className="text-sm text-muted sm:hidden">A simple guide to help you read God&apos;s Word</p>
          </div>
        </Link>

        <nav aria-label="Main" className="-mx-2 hidden flex-nowrap gap-0.5 overflow-x-auto scrollbar-none sm:-mx-1 sm:flex sm:gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex min-h-[44px] shrink-0 items-center rounded-full px-2.5 text-sm font-semibold sm:px-3.5 transition-colors ${
                  isActive ? 'bg-gospels-soft text-gospels-deep' : 'text-muted hover:bg-ink/5 hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
