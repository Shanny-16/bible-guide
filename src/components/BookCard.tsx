import { Link } from 'react-router-dom'
import type { Book } from '../data/books'
import { sectionColors } from '../lib/sectionColors'
import { CheckIcon } from './icons'

interface BookCardProps {
  book: Book
  isRead: boolean
}

export function BookCard({ book, isRead }: BookCardProps) {
  const colors = sectionColors(book.section)

  return (
    <Link
      to={`/book/${book.slug}`}
      className={`group relative flex flex-col gap-2 rounded-card border ${colors.border} bg-white p-4 shadow-[0_1px_2px_rgba(42,40,51,0.06)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(42,40,51,0.08)]`}
    >
      {isRead && (
        <span
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-minor-soft text-minor-deep"
          title="Marked as read"
        >
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
      )}

      <div className={`flex items-center gap-2 ${isRead ? "pr-6" : ""}`}>
        <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${colors.bg} ${colors.text}`}>
          {book.num}
        </span>
        <h3 className="font-heading text-[17px] font-semibold leading-tight text-ink">{book.name}</h3>
      </div>

      <p className="line-clamp-3 text-sm leading-snug text-muted">{book.snapshot}</p>

      <p className="mt-auto line-clamp-1 pt-1 text-[11px] text-muted">{book.date}</p>
    </Link>
  )
}
