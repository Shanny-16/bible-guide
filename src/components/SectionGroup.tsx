import type { Book, Section } from '../data/books'
import { sectionColors } from '../lib/sectionColors'
import { BookCard } from './BookCard'

interface SectionGroupProps {
  section: Section
  books: Book[]
  isRead: (slug: string) => boolean
}

export function SectionGroup({ section, books, isRead }: SectionGroupProps) {
  if (books.length === 0) return null
  const colors = sectionColors(section.id)

  return (
    <section aria-labelledby={`section-${section.id}`} className="flex flex-col gap-3">
      <div className={`rounded-card ${colors.bg} px-4 py-3`}>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h2 id={`section-${section.id}`} className={`font-heading text-lg font-semibold ${colors.text}`}>
            {section.name}
          </h2>
          <span className={`text-sm font-medium ${colors.text} opacity-80`}>
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </span>
        </div>
        <p className={`mt-0.5 text-sm ${colors.text} opacity-80`}>{section.blurb}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} isRead={isRead(book.slug)} />
        ))}
      </div>
    </section>
  )
}
