import { useEffect, useRef, useState } from 'react'
import type { VersionCode } from '../data/links'
import { passageUrl } from '../data/links'
import type { PassageText, TextTranslation, Verse } from '../lib/bibleText'
import { PassageError, TEXT_TRANSLATIONS, loadPassage, spansChapters } from '../lib/bibleText'
import { useTextTranslation } from '../lib/storage'
import { useModalLayer } from '../lib/useModalLayer'
import { CloseIcon } from './icons'
import { ExternalLink } from './ExternalLink'

interface PassageSheetProps {
  /** The full reference to show, e.g. "Genesis 1-3". null means the sheet is closed. */
  reference: string | null
  onClose: () => void
  /** The user's preferred Bible Gateway version, for the footer link. */
  version: VersionCode
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; busy: boolean }
  | { status: 'success'; data: PassageText }

function TranslationToggle({ value, onChange }: { value: TextTranslation; onChange: (v: TextTranslation) => void }) {
  return (
    <div className="inline-flex rounded-full border border-ink/15 bg-white p-0.5" role="group" aria-label="Verse text translation">
      {TEXT_TRANSLATIONS.map((t) => (
        <button
          key={t.code}
          type="button"
          onClick={() => onChange(t.code)}
          aria-pressed={value === t.code}
          className={`min-h-[40px] rounded-full px-3 text-xs font-bold transition-colors ${
            value === t.code ? 'bg-ink text-cream' : 'text-muted hover:text-ink'
          }`}
        >
          {t.short}
        </button>
      ))}
    </div>
  )
}

function VerseBody({ data, reference }: { data: PassageText; reference: string }) {
  const multiChapter = spansChapters(reference)
  const groups: Array<{ chapter: number; verses: Verse[] }> = []
  for (const v of data.verses) {
    const last = groups[groups.length - 1]
    if (last && last.chapter === v.chapter) last.verses.push(v)
    else groups.push({ chapter: v.chapter, verses: [v] })
  }

  return (
    <div className="flex flex-col gap-3">
      {groups.map((g) => (
        <div key={g.chapter}>
          {multiChapter && <h3 className="mb-1.5 font-heading text-base font-semibold text-ink">Chapter {g.chapter}</h3>}
          <p className="text-[16px] leading-relaxed text-ink">
            {g.verses.map((v) => (
              <span key={v.verse}>
                <sup className="mr-1 text-xs font-semibold text-muted">{v.verse}</sup>
                {v.text}{' '}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  )
}

/**
 * A bottom sheet (phones) / centered dialog (sm+) that loads and shows a passage's text in place,
 * so people don't have to leave the page to read a key passage.
 */
export function PassageSheet({ reference, onClose, version }: PassageSheetProps) {
  const isOpen = reference !== null
  const { translation, setTranslation } = useTextTranslation()
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [visible, setVisible] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [attempt, setAttempt] = useState(0)
  const lastActiveRef = useRef<HTMLElement | null>(null)
  const titleId = 'passage-sheet-title'

  // Scroll lock, Escape (top-most dialog only) and Tab focus trap.
  useModalLayer(isOpen, dialogRef, onClose)

  // Focus management while the sheet is open.
  useEffect(() => {
    if (!isOpen) return

    lastActiveRef.current = document.activeElement as HTMLElement | null
    const raf = requestAnimationFrame(() => setVisible(true))
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 20)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(focusTimer)
      setVisible(false)
      lastActiveRef.current?.focus()
      lastActiveRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Load the passage text; re-fetch on translation change, abort on reference/translation change or close.
  useEffect(() => {
    if (reference === null) return
    const controller = new AbortController()
    setState({ status: 'loading' })
    loadPassage(reference, translation, controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', busy: err instanceof PassageError && err.code === 'rate_limited' })
        }
      })
    return () => controller.abort()
  }, [reference, translation, attempt])

  if (reference === null) return null

  const translationLabel = TEXT_TRANSLATIONS.find((t) => t.code === translation)?.label ?? TEXT_TRANSLATIONS[0].label

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-[20px] bg-cream shadow-xl transition-[transform,opacity] duration-300 ease-out sm:max-h-[80vh] sm:max-w-lg sm:rounded-[20px] ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-ink/15 sm:hidden" aria-hidden="true" />

        <div className="flex items-start justify-between gap-3 border-b border-ink/10 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-1.5">
            <h2 id={titleId} className="font-heading text-lg font-semibold text-ink sm:text-xl">
              {reference}
            </h2>
            <TranslationToggle value={translation} onChange={setTranslation} />
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto px-4 py-4 sm:px-5"
          style={state.status === 'success' ? undefined : { paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          {state.status === 'loading' && (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-center" aria-live="polite">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-gospels-soft" style={{ animationDelay: '0ms' }} />
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-major-soft" style={{ animationDelay: '150ms' }} />
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-minor-soft" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-sm text-muted">Loading passage…</p>
            </div>
          )}

          {state.status === 'error' && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <p role="alert" className="text-[15px] text-ink">
                {state.busy
                  ? 'The verse service is busy. Please try again in a few seconds.'
                  : "Couldn't load this passage right now."}
              </p>
              <button
                type="button"
                onClick={() => setAttempt((n) => n + 1)}
                className="inline-flex min-h-[44px] items-center rounded-full bg-ink px-5 text-sm font-semibold text-cream"
              >
                Try again
              </button>
              <ExternalLink
                href={passageUrl(reference, version)}
                underline={false}
                className="inline-flex min-h-[44px] items-center rounded-full bg-gospels-soft px-4 text-sm font-semibold text-gospels-deep"
              >
                Open on Bible Gateway
              </ExternalLink>
            </div>
          )}

          {state.status === 'success' && (
            <>
              <VerseBody data={state.data} reference={reference} />
              {state.data.truncated && (
                <p className="mt-3 text-xs text-muted">
                  Showing the first 6 chapters. Use the Bible Gateway link for the rest.
                </p>
              )}
            </>
          )}
        </div>

        {state.status === 'success' && (
          <div
            className="flex flex-col gap-2 border-t border-ink/10 bg-white px-4 pt-3 sm:px-5"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            <p className="text-xs text-muted">Text: {state.data.translationName || translationLabel} (public domain).</p>
            <ExternalLink
              href={passageUrl(reference, version)}
              underline={false}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gospels-soft px-4 text-sm font-semibold text-gospels-deep"
            >
              Read in {version} on Bible Gateway
            </ExternalLink>
          </div>
        )}
      </div>
    </div>
  )
}
