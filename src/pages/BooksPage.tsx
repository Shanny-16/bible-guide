import { useEffect, useMemo, useState } from 'react'
import { BOOKS, SECTIONS } from '../data/books'
import { filterBooks } from '../lib/search'
import { useReadBooks } from '../lib/storage'
import { ProgressBar } from '../components/ProgressBar'
import { SearchBar } from '../components/SearchBar'
import { TestamentToggle } from '../components/TestamentToggle'
import type { TestamentFilter } from '../components/TestamentToggle'
import { SectionGroup } from '../components/SectionGroup'

export function BooksPage() {
  const [query, setQuery] = useState('')
  const [testament, setTestament] = useState<TestamentFilter>('ALL')
  const { readBooks, isRead } = useReadBooks()

  useEffect(() => {
    document.title = 'Bible Study Guide'
  }, [])

  const visibleBooks = useMemo(() => {
    const searched = filterBooks(BOOKS, query)
    return testament === 'ALL' ? searched : searched.filter((b) => b.testament === testament)
  }, [query, testament])

  const sectionsWithBooks = useMemo(
    () => SECTIONS.map((section) => ({ section, books: visibleBooks.filter((b) => b.section === section.id) })).filter((g) => g.books.length > 0),
    [visibleBooks],
  )

  return (
    <div className="flex flex-col gap-5">
      <ProgressBar readCount={readBooks.length} total={BOOKS.length} />

      <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-3 bg-cream/95 px-4 pb-3 pt-2 sm:-mx-6 sm:px-6">
        <SearchBar value={query} onChange={setQuery} />
        <TestamentToggle value={testament} onChange={setTestament} />
      </div>

      {sectionsWithBooks.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-card border border-ink/10 bg-white px-6 py-12 text-center">
          <p className="font-heading text-lg font-semibold text-ink">No books match "{query}"</p>
          <p className="text-sm text-muted">Try a book name, a person like Elijah, or a theme like covenant.</p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-1 inline-flex min-h-[44px] items-center rounded-full bg-gospels-soft px-5 text-sm font-semibold text-gospels-deep"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {sectionsWithBooks.map(({ section, books }) => (
            <SectionGroup key={section.id} section={section} books={books} isRead={isRead} />
          ))}
        </div>
      )}
    </div>
  )
}
