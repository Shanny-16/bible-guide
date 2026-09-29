// Search/filter over BOOKS: case-insensitive substring match across name,
// snapshot and authorship, with a couple of friendly aliases for common
// alternate spellings.
import type { Book } from '../data/books'

const ALIASES: Record<string, string> = {
  'song of solomon': 'song of songs',
  'canticles': 'song of songs',
}

function normalize(text: string): string {
  return text.toLowerCase().trim()
}

export function filterBooks(books: Book[], rawQuery: string): Book[] {
  const query = normalize(rawQuery)
  if (!query) return books

  const aliasedQuery = ALIASES[query] ?? query

  return books.filter((book) => {
    const haystack = normalize(`${book.name} ${book.snapshot} ${book.authorship}`)
    return haystack.includes(query) || haystack.includes(aliasedQuery)
  })
}

// Helpers shared with the site-wide search (src/lib/globalSearch.ts).

/** Lowercase, strip accents (é -> e), trim and collapse runs of spaces. */
export function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** The alternate spelling for a query ("song of solomon" -> "song of songs"), if there is one. */
export function aliasFor(normalizedQuery: string): string | undefined {
  return ALIASES[normalizedQuery]
}
