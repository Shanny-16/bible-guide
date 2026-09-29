// Site-wide search across books, people and places (plus the main characters listed under each book).
// Pure functions only; the panel UI lives in src/components/SearchPanel.tsx.
import { BOOKS, SECTIONS } from '../data/books'
import type { SectionId } from '../data/books'
import { CHARACTERS } from '../data/characters'
import { PEOPLE } from '../data/people'
import { PLACES } from '../data/places'
import { aliasFor, normalizeForSearch } from './search'

export type SearchHit = {
  kind: 'book' | 'person' | 'place' | 'character'
  slug: string
  title: string
  hint: string
  href: string
  section?: SectionId
  /** Book number, for the numbered badge on book rows. */
  num?: number
  /** Match strength: 0 = name starts with query … 3 = only in long text. */
  score?: number
}

export interface GlobalSearchResults {
  books: SearchHit[]
  people: SearchHit[]
  places: SearchHit[]
}

const MIN_QUERY_LENGTH = 2
const MAX_PER_GROUP = 6

const EMPTY: GlobalSearchResults = { books: [], people: [], places: [] }

/** All the strings a query should be matched against (the query itself plus any alias). */
function needlesFor(query: string): string[] {
  const alias = aliasFor(query)
  return alias ? [query, alias] : [query]
}

/** Where (start, end) the query matches inside the visible title, for highlighting. Null if it doesn't. */
export function findMatchRange(title: string, rawQuery: string): [number, number] | null {
  const query = normalizeForSearch(rawQuery)
  if (query.length < MIN_QUERY_LENGTH) return null
  const haystack = normalizeForSearch(title)
  // Only trust indexes when normalizing didn't change the length (it can when spaces collapse).
  if (haystack.length !== title.length) return null
  for (const needle of needlesFor(query)) {
    const at = haystack.indexOf(needle)
    if (at !== -1) return [at, at + needle.length]
  }
  return null
}

/**
 * 0 = name starts with the query, 1 = name includes it, 2 = a short descriptive field (tagline etc.) includes it,
 * 3 = only the long summary text includes it; null = no match.
 */
function rank(name: string, short: string[], long: string[], needles: string[]): number | null {
  const n = normalizeForSearch(name)
  if (needles.some((q) => n.startsWith(q))) return 0
  if (needles.some((q) => n.includes(q))) return 1
  const shortText = normalizeForSearch(short.join(' '))
  if (needles.some((q) => shortText.includes(q))) return 2
  const longText = normalizeForSearch(long.join(' '))
  if (needles.some((q) => longText.includes(q))) return 3
  return null
}

function sortAndTrim(scored: Array<{ hit: SearchHit; score: number; order: number }>): SearchHit[] {
  return scored
    .sort((a, b) => a.score - b.score || a.order - b.order)
    .slice(0, MAX_PER_GROUP)
    .map((s) => ({ ...s.hit, score: s.score }))
}

function searchBooks(needles: string[]): SearchHit[] {
  const sectionName = (id: SectionId) => SECTIONS.find((s) => s.id === id)?.short ?? ''
  const scored: Array<{ hit: SearchHit; score: number; order: number }> = []

  BOOKS.forEach((book, order) => {
    const base = { slug: book.slug, title: book.name, href: `/book/${book.slug}`, section: book.section, num: book.num }
    const bookScore = rank(book.name, [book.authorship], [book.snapshot], needles)
    const bookHit: SearchHit = { ...base, kind: 'book', hint: `Book · ${sectionName(book.section)}` }
    if (bookScore !== null && bookScore < 2) {
      scored.push({ hit: bookHit, score: bookScore, order })
      return
    }
    // Not matched by name: a character match ("Delilah" -> Judges) is more useful to show than a
    // match buried in the snapshot text, so it wins the single slot this book gets.
    const characters = CHARACTERS[book.slug] ?? []
    const match = characters.find((c) => needles.some((q) => normalizeForSearch(c.name).includes(q)))
    if (match) {
      scored.push({ hit: { ...base, kind: 'character', hint: `Character in ${book.name}` }, score: 1.5, order })
    } else if (bookScore !== null) {
      scored.push({ hit: bookHit, score: bookScore, order })
    }
  })
  return sortAndTrim(scored)
}

function searchPeople(needles: string[]): SearchHit[] {
  const scored: Array<{ hit: SearchHit; score: number; order: number }> = []
  PEOPLE.forEach((p, order) => {
    const score = rank(p.name, [p.tagline], [p.summary], needles)
    if (score === null) return
    scored.push({ hit: { kind: 'person', slug: p.slug, title: p.name, hint: p.tagline, href: `/people/${p.slug}` }, score, order })
  })
  return sortAndTrim(scored)
}

function searchPlaces(needles: string[]): SearchHit[] {
  const scored: Array<{ hit: SearchHit; score: number; order: number }> = []
  PLACES.forEach((p, order) => {
    const score = rank(p.name, [p.tagline, p.today], [p.summary], needles)
    if (score === null) return
    scored.push({ hit: { kind: 'place', slug: p.slug, title: p.name, hint: p.tagline, href: `/places/${p.slug}` }, score, order })
  })
  return sortAndTrim(scored)
}

export function globalSearch(rawQuery: string): GlobalSearchResults {
  const query = normalizeForSearch(rawQuery)
  if (query.length < MIN_QUERY_LENGTH) return EMPTY
  const needles = needlesFor(query)
  return { books: searchBooks(needles), people: searchPeople(needles), places: searchPlaces(needles) }
}
