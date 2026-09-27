import { Link } from 'react-router-dom'
import { bookBySlug } from '../data/books'
import { sectionColors } from '../lib/sectionColors'

interface BookChipProps {
  slug: string
}

/** A small tinted chip linking to a book's detail page, used on the storyline page. */
export function BookChip({ slug }: BookChipProps) {
  const book = bookBySlug(slug)
  if (!book) return null
  const colors = sectionColors(book.section)

  return (
    <Link
      to={`/book/${book.slug}`}
      className={`inline-flex min-h-[36px] items-center rounded-full px-3 py-1 text-sm font-semibold ${colors.bg} ${colors.text} transition-transform hover:-translate-y-0.5`}
    >
      {book.name}
    </Link>
  )
}
