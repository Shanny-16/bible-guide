import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BOOKS, bookBySlug, sectionById } from '../data/books'
import { bibleProjectVideos, enduringWordUrl, readBookUrl } from '../data/links'
import { useNote, useReadBooks, useVersion } from '../lib/storage'
import { sectionColors } from '../lib/sectionColors'
import { ExternalLink } from '../components/ExternalLink'
import { PassageChip } from '../components/PassageChip'
import { VersionPicker } from '../components/VersionPicker'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '../components/icons'
import { NotFoundPage } from './NotFoundPage'

function InfoCard({ label, value, accentClass }: { label: string; value: string; accentClass: string }) {
  return (
    <div className={`rounded-card border-l-4 ${accentClass} bg-white p-4`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-[15px] leading-snug text-ink">{value}</p>
    </div>
  )
}

export function BookPage() {
  const { slug = '' } = useParams()
  const book = bookBySlug(slug)

  const { isRead, toggleRead } = useReadBooks()
  const { version, setVersion } = useVersion()
  const { note, setNote } = useNote(slug)
  const [draft, setDraft] = useState(note)

  useEffect(() => {
    setDraft(note)
  }, [note])

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (draft !== note) setNote(draft)
    }, 500)
    return () => window.clearTimeout(t)
  }, [draft, note, setNote])

  useEffect(() => {
    document.title = book ? `${book.name} · Bible Study Guide` : 'Not found · Bible Study Guide'
  }, [book])

  if (!book) {
    return <NotFoundPage />
  }

  const section = sectionById(book.section)
  const colors = sectionColors(book.section)
  const read = isRead(book.slug)
  const prevBook = BOOKS.find((b) => b.num === book.num - 1)
  const nextBook = BOOKS.find((b) => b.num === book.num + 1)
  const videos = bibleProjectVideos(book)

  return (
    <div className="flex flex-col gap-6">
      <Link to="/" className="inline-flex min-h-[44px] w-fit items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
        <ArrowLeftIcon className="h-4 w-4" />
        All books
      </Link>

      <div className="flex flex-col gap-2">
        <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold ${colors.bg} ${colors.text}`}>
          {section.short}
        </span>
        <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">{book.name}</h1>
        <p className="text-sm text-muted">
          Book {book.num} of 66 · {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'} · {book.testament === 'OT' ? 'Old Testament' : 'New Testament'}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => toggleRead(book.slug)}
          aria-pressed={read}
          className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
            read ? 'bg-minor-deep text-white' : 'border border-ink/15 bg-white text-ink hover:bg-ink/5'
          }`}
        >
          <CheckIcon className="h-4 w-4" />
          {read ? 'Marked as read' : 'Mark as read'}
        </button>

        <ExternalLink
          href={readBookUrl(book, version)}
          underline={false}
          className="inline-flex min-h-[44px] items-center rounded-full bg-gospels-soft px-4 text-sm font-semibold text-gospels-deep"
        >
          Read on Bible Gateway
        </ExternalLink>

        <VersionPicker value={version} onChange={setVersion} compact />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InfoCard label="When was it written?" value={book.date} accentClass={colors.borderSolid} />
        <InfoCard label="Who wrote it?" value={book.authorship} accentClass={colors.borderSolid} />
        <InfoCard label="What is it about?" value={book.snapshot} accentClass={colors.borderSolid} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-ink">Key passages</h2>
        <div className="flex flex-wrap gap-2">
          {book.keyPassages.map((p) => (
            <PassageChip key={p.ref} label={p.label} reference={p.ref} version={version} />
          ))}
        </div>
        <p className="text-xs text-muted">Tap a passage to read it (opens Bible Gateway).</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-ink">Go deeper</h2>
        <ul className="flex flex-col gap-2">
          {videos.map((v) => (
            <li key={v.url} className="rounded-card border border-ink/10 bg-white px-4 py-3">
              <ExternalLink href={v.url}>Watch: {v.label} overview (BibleProject)</ExternalLink>
            </li>
          ))}
          <li className="rounded-card border border-ink/10 bg-white px-4 py-3">
            <ExternalLink href={enduringWordUrl(book, 1)}>Chapter-by-chapter commentary (Enduring Word)</ExternalLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="my-notes" className="font-heading text-lg font-semibold text-ink">
          My notes
        </label>
        <textarea
          id="my-notes"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={5}
          placeholder="Jot down questions, insights, or things to bring to group…"
          className="w-full rounded-card border border-ink/15 bg-white p-3.5 text-[15px] text-ink placeholder:text-muted focus-visible:border-major-deep"
        />
        <p className="text-xs text-muted">Saved only on this device.</p>
      </div>

      <div className="mt-2 flex items-stretch justify-between gap-3 border-t border-ink/10 pt-4">
        {prevBook ? (
          <Link
            to={`/book/${prevBook.slug}`}
            className="flex min-h-[44px] flex-1 flex-col items-start justify-center gap-0.5 rounded-card border border-ink/10 bg-white px-4 py-2 hover:bg-ink/5"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              <ArrowLeftIcon className="h-3.5 w-3.5" /> Previous
            </span>
            <span className="font-heading text-[15px] font-semibold text-ink">{prevBook.name}</span>
          </Link>
        ) : (
          <span className="flex-1 rounded-card border border-ink/5 bg-cream px-4 py-2 text-sm text-muted/60" aria-hidden="true" />
        )}

        {nextBook ? (
          <Link
            to={`/book/${nextBook.slug}`}
            className="flex min-h-[44px] flex-1 flex-col items-end justify-center gap-0.5 rounded-card border border-ink/10 bg-white px-4 py-2 text-right hover:bg-ink/5"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              Next <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
            <span className="font-heading text-[15px] font-semibold text-ink">{nextBook.name}</span>
          </Link>
        ) : (
          <span className="flex-1 rounded-card border border-ink/5 bg-cream px-4 py-2 text-sm text-muted/60" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
