import { NavLink } from 'react-router-dom'
import { BookOpenIcon } from './icons'

const NAV_ITEMS = [
  { to: '/', label: 'Books', end: true },
  { to: '/people', label: 'People', end: false },
  { to: '/places', label: 'Places', end: false },
  { to: '/storyline', label: 'Storyline', end: false },
  { to: '/about', label: 'About', end: false },
] as const

export function Header() {
  return (
    <header className="border-b border-ink/10 bg-cream">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 pb-3 pt-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <BookOpenIcon className="h-7 w-7 shrink-0 text-gospels-deep" />
          <div>
            <h1 className="font-heading text-xl font-semibold leading-tight text-ink sm:text-2xl">Bible Notes</h1>
            <p className="text-sm text-muted">A simple guide to help you read God&apos;s Word</p>
          </div>
        </div>

        <nav aria-label="Main" className="-mx-2 flex flex-nowrap gap-0.5 overflow-x-auto pt-1 scrollbar-none sm:-mx-1 sm:gap-1">
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
