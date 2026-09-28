import { NavLink, useLocation } from 'react-router-dom'
import type { ComponentType } from 'react'
import { BookOpenIcon, GlobeIcon, InfoCircleIcon, PeopleIcon, StorylineIcon } from './icons'

interface TabItem {
  to: string
  label: string
  Icon: ComponentType<{ className?: string }>
  isActive: (pathname: string) => boolean
}

const TAB_ITEMS: TabItem[] = [
  { to: '/', label: 'Books', Icon: BookOpenIcon, isActive: (p) => p === '/' || p.startsWith('/book/') },
  { to: '/people', label: 'People', Icon: PeopleIcon, isActive: (p) => p.startsWith('/people') },
  { to: '/places', label: 'Places', Icon: GlobeIcon, isActive: (p) => p.startsWith('/places') },
  { to: '/storyline', label: 'Storyline', Icon: StorylineIcon, isActive: (p) => p.startsWith('/storyline') },
  { to: '/about', label: 'About', Icon: InfoCircleIcon, isActive: (p) => p.startsWith('/about') },
]

/**
 * Fixed bottom tab bar shown only on phones (below `sm`), so the main sections stay
 * one tap away without scrolling back up to the header. Mirrors the header nav.
 */
export function TabBar() {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/10 bg-cream shadow-[0_-2px_12px_rgba(42,40,51,0.1)] sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TAB_ITEMS.map((item) => {
        const active = item.isActive(pathname)
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            aria-current={active ? 'page' : undefined}
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-1.5 transition-colors"
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                active ? 'bg-gospels-soft' : ''
              }`}
            >
              <item.Icon className={`h-[22px] w-[22px] ${active ? 'text-gospels-deep' : 'text-muted'}`} />
            </span>
            <span className={`text-[11px] font-semibold leading-none ${active ? 'text-gospels-deep' : 'text-muted'}`}>
              {item.label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}
