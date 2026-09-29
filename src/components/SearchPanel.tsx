import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode, RefObject } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { findMatchRange, globalSearch } from '../lib/globalSearch'
import type { SearchHit } from '../lib/globalSearch'
import { getImage } from '../lib/images'
import { sectionColors } from '../lib/sectionColors'
import { imageSrc } from './Figure'
import { BookOpenIcon, CloseIcon, SearchIcon } from './icons'

interface SearchPanelProps {
  open: boolean
  onClose: () => void
  /** Returns the y position (px from the top of the viewport) the panel should hang from. */
  getTop: () => number
  /** Where focus goes when the panel closes (the magnifier button). */
  returnFocusRef: RefObject<HTMLElement | null>
}

/** Title with the matched part of the query lightly highlighted. */
function Highlighted({ text, query }: { text: string; query: string }): ReactNode {
  const range = findMatchRange(text, query)
  if (!range) return text
  return (
    <>
      {text.slice(0, range[0])}
      <mark className="rounded-sm bg-law-soft px-0.5 text-inherit">{text.slice(range[0], range[1])}</mark>
      {text.slice(range[1])}
    </>
  )
}

function Thumb({ hit }: { hit: SearchHit }) {
  if (hit.kind === 'person' || hit.kind === 'place') {
    const image = getImage(hit.slug)
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink/10 bg-cream">
        {image ? (
          <img src={imageSrc(image.file)} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <BookOpenIcon className="h-4 w-4 text-ink/25" />
        )}
      </span>
    )
  }
  const colors = hit.section ? sectionColors(hit.section) : null
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        colors ? `${colors.bg} ${colors.text}` : 'bg-cream text-muted'
      }`}
    >
      {hit.num}
    </span>
  )
}

function ResultGroup({ label, hits, query, onPick }: { label: string; hits: SearchHit[]; query: string; onPick: () => void }) {
  if (hits.length === 0) return null
  return (
    <section aria-label={label}>
      <h3 className="px-4 pb-1 pt-3 font-body text-xs font-bold uppercase tracking-wider text-muted">{label}</h3>
      <ul>
        {hits.map((hit) => (
          <li key={`${hit.kind}-${hit.slug}`}>
            <Link
              to={hit.href}
              data-result
              onClick={onPick}
              className="flex min-h-[48px] items-center gap-3 px-4 py-1.5 hover:bg-ink/5 focus-visible:bg-ink/5"
            >
              <Thumb hit={hit} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-ink">
                  <Highlighted text={hit.title} query={query} />
                </span>
                <span className="block truncate text-sm text-muted">{hit.hint}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * The site-wide search: a dimmed backdrop plus a panel hanging directly under the pinned nav row.
 * Mounted only while open, so it starts fresh (empty query) every time.
 */
export function SearchPanel({ open, onClose, getTop, returnFocusRef }: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const [top, setTop] = useState(0)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => globalSearch(query), [query])
  const flat = [results.books, results.people, results.places]
    .map((hits, order) => ({ hits, order, best: hits[0]?.score ?? 99 }))
    .sort((a, b) => a.best - b.best || a.order - b.order)
    .flatMap((g) => g.hits)
  const hasQuery = query.trim().length >= 2

  // Position under the nav row, and keep it there if the window is resized or rotated.
  useLayoutEffect(() => {
    if (!open) return
    const place = () => setTop(getTop())
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Reset the query each time the panel closes.
  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  // Body scroll lock, open animation, Escape, and returning focus to the magnifier on close.
  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => setVisible(true))
    const body = document.body
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const returnTo = returnFocusRef.current

    return () => {
      cancelAnimationFrame(raf)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      document.removeEventListener('keydown', onKey)
      setVisible(false)
      returnTo?.focus({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const links = () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a[data-result]') ?? [])

  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && flat[0]) {
      e.preventDefault()
      navigate(flat[0].href)
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      links()[0]?.focus()
    }
  }

  function onListKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const all = links()
    const at = all.indexOf(document.activeElement as HTMLAnchorElement)
    if (at === -1) return
    e.preventDefault()
    if (e.key === 'ArrowDown') all[Math.min(at + 1, all.length - 1)]?.focus()
    else if (at === 0) inputRef.current?.focus()
    else all[at - 1]?.focus()
  }

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-[35] bg-ink/35 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ top }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        style={{ top }}
        className={`fixed inset-x-0 z-40 mx-auto flex w-full flex-col overflow-hidden rounded-b-[20px] border-x border-b border-ink/10 bg-cream shadow-[0_12px_32px_rgba(42,40,51,0.18)] transition-[transform,opacity] duration-200 ease-out sm:max-w-xl ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        }`}
      >
        <div className="flex items-center gap-1 px-4 py-2.5">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="global-search" className="sr-only">
              Search books, people and places
            </label>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              id="global-search"
              ref={inputRef}
              autoFocus
              type="text"
              inputMode="search"
              enterKeyHint="go"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search books, people, places…"
              className={`h-12 w-full rounded-full border border-ink/15 bg-white pl-10 ${query ? 'pr-11' : 'pr-3'} text-base text-ink placeholder:text-muted focus-visible:border-major-deep`}
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  inputRef.current?.focus()
                }}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 shrink-0 items-center rounded-full px-2.5 text-sm font-semibold text-muted hover:bg-ink/5 hover:text-ink"
          >
            Close
          </button>
        </div>

        <div ref={listRef} onKeyDown={onListKeyDown} className="max-h-[60dvh] overflow-y-auto overscroll-contain border-t border-ink/10 pb-2">
          {!hasQuery && (
            <p className="px-4 py-5 text-sm text-muted">Try a name like Ruth, a place like Corinth, or a theme like covenant.</p>
          )}
          {hasQuery && flat.length === 0 && <p className="px-4 py-5 text-[15px] text-ink">No matches for “{query.trim()}”</p>}
          {hasQuery && flat.length > 0 && (
            <>
              {(
                [
                  { label: 'Books', hits: results.books },
                  { label: 'People', hits: results.people },
                  { label: 'Places', hits: results.places },
                ] as const
              )
                // Show the group with the strongest match first (a person named "Elijah"
                // beats books that only mention him), keeping Books · People · Places on ties.
                .map((g, order) => ({ ...g, order, best: g.hits[0]?.score ?? 99 }))
                .sort((a, b) => a.best - b.best || a.order - b.order)
                .map((g) => (
                  <ResultGroup key={g.label} label={g.label} hits={g.hits} query={query} onPick={onClose} />
                ))}
            </>
          )}
          <p className="sr-only" role="status" aria-live="polite">
            {hasQuery ? `${flat.length} result${flat.length === 1 ? '' : 's'}` : ''}
          </p>
        </div>
      </div>
    </>
  )
}
