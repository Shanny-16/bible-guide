// Fetches passage text for the in-page verse bubble from bible-api.com (free, no key, CORS enabled,
// public-domain translations only). Verified 2026-09-27: single chapters and verse lists work
// ("Leviticus 19:2,18", "Lamentations 3:22-23,31-33"); multi-chapter ranges do NOT, so a range like
// "Genesis 1-3" is fetched one chapter at a time. Rate limit: 15 requests / 30 s per IP.

export const TEXT_TRANSLATIONS = [
  { code: 'web', label: 'World English Bible', short: 'WEB' },
  { code: 'kjv', label: 'King James Version', short: 'KJV' },
] as const

export type TextTranslation = (typeof TEXT_TRANSLATIONS)[number]['code']
export const DEFAULT_TEXT_TRANSLATION: TextTranslation = 'web'

export interface Verse {
  chapter: number
  verse: number
  text: string
}

export interface PassageText {
  reference: string
  translation: TextTranslation
  translationName: string
  verses: Verse[]
  /** True when a long chapter range was cut short (see MAX_CHAPTERS). */
  truncated?: boolean
}

export type PassageErrorCode = 'rate_limited' | 'empty' | 'http' | 'api'

/** Error with a code the UI can recognise (e.g. to show a "service is busy" message for HTTP 429). */
export class PassageError extends Error {
  code: PassageErrorCode
  constructor(code: PassageErrorCode, message: string) {
    super(message)
    this.name = 'PassageError'
    this.code = code
  }
}

interface ParsedRef {
  book: string
  /** e.g. "3:22-23,31-33" or "50:20" when the spec names verses */
  verseSpec?: string
  /** chapter range when the spec is whole chapters */
  chapters?: [number, number]
}

/** Split "Lamentations 3:22-23,31-33" into book + spec. Handles "1 Samuel 3", "Song of Songs 2:16". */
export function parseRef(ref: string): ParsedRef {
  const trimmed = ref.trim()
  const lastSpace = trimmed.lastIndexOf(' ')
  if (lastSpace === -1) return { book: trimmed }
  const book = trimmed.slice(0, lastSpace)
  const spec = trimmed.slice(lastSpace + 1)
  if (spec.includes(':')) {
    // A simple reversed verse range such as "3:9-4" is swapped to "3:4-9".
    const r = spec.match(/^(\d+):(\d+)-(\d+)$/)
    if (r && Number(r[3]) < Number(r[2])) return { book, verseSpec: `${r[1]}:${r[3]}-${r[2]}` }
    return { book, verseSpec: spec }
  }
  const m = spec.match(/^(\d+)(?:-(\d+))?$/)
  if (!m) return { book, verseSpec: spec }
  const a = Number(m[1])
  const b = m[2] ? Number(m[2]) : a
  return { book, chapters: a <= b ? [a, b] : [b, a] }
}

const MAX_CHAPTERS = 6

/**
 * bible-api.com reads "Jude 1" as verse 1 for single-chapter books, so a whole-chapter request is
 * sent as an explicit verse range instead.
 */
const SINGLE_CHAPTER_VERSES: Record<string, number> = {
  obadiah: 21,
  philemon: 25,
  '2 john': 13,
  '3 john': 14,
  jude: 25,
}

// --- cache: memory + localStorage, one entry per chapter / verse list -------------------------

const KEY_PREFIX = 'bg.text.v2.'
const INDEX_KEY = `${KEY_PREFIX}index`
const MAX_ENTRIES = 150
const EVICT_COUNT = 30

interface Piece {
  translationName: string
  verses: Verse[]
}

const memoryCache = new Map<string, Piece>()

function readIndex(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(INDEX_KEY) ?? '[]') as unknown
    return Array.isArray(parsed) ? parsed.filter((k): k is string => typeof k === 'string') : []
  } catch {
    return []
  }
}

function writeIndex(index: string[]) {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(index))
  } catch {
    /* storage unavailable or full */
  }
}

// One-time cleanup at startup: drop entries from older cache formats.
try {
  const stale: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith('bg.text.') && !k.startsWith(KEY_PREFIX)) stale.push(k)
  }
  stale.forEach((k) => localStorage.removeItem(k))
} catch {
  /* storage unavailable */
}

function isValidPiece(p: unknown): p is Piece {
  const v = (p as Piece | null)?.verses
  return Array.isArray(v) && v.length > 0 && typeof v[0]?.text === 'string'
}

function pieceKey(query: string, translation: TextTranslation) {
  return `${KEY_PREFIX}${translation}.${query}`
}

function readCache(key: string): Piece | undefined {
  const hit = memoryCache.get(key)
  if (hit) return hit
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (isValidPiece(parsed)) {
        memoryCache.set(key, parsed)
        return parsed
      }
    }
  } catch {
    /* storage unavailable or corrupt value: ignore it */
  }
  return undefined
}

function evictOldest(index: string[], count: number) {
  for (const k of index.splice(0, count)) {
    try {
      localStorage.removeItem(k)
    } catch {
      /* no-op */
    }
  }
}

function writeCache(key: string, value: Piece) {
  if (!isValidPiece(value)) return
  memoryCache.set(key, value)
  try {
    const index = readIndex().filter((k) => k !== key)
    if (index.length >= MAX_ENTRIES) evictOldest(index, index.length - MAX_ENTRIES + 1)
    const json = JSON.stringify(value)
    try {
      localStorage.setItem(key, json)
    } catch {
      // Probably out of space: drop the 30 oldest passages and try once more.
      evictOldest(index, EVICT_COUNT)
      localStorage.setItem(key, json)
    }
    index.push(key)
    writeIndex(index)
  } catch {
    /* storage unavailable or full; memory cache still works */
  }
}

// --- network ----------------------------------------------------------------------------------

interface ApiResponse {
  reference: string
  translation_name: string
  verses: Array<{ chapter: number; verse: number; text: string }>
  error?: string
}

async function fetchOne(query: string, translation: TextTranslation, signal?: AbortSignal): Promise<ApiResponse> {
  const url = `https://bible-api.com/${encodeURIComponent(query).replace(/%20/g, '+')}?translation=${translation}`
  const res = await fetch(url, { signal })
  if (res.status === 429) throw new PassageError('rate_limited', 'The verse service is busy (429)')
  if (!res.ok) throw new PassageError('http', `Could not load passage (${res.status})`)
  const data = (await res.json()) as ApiResponse
  if (data.error) throw new PassageError('api', data.error)
  return data
}

/** Fetch one piece (a chapter or a verse list), using the cache first and caching only non-empty results. */
async function getPiece(query: string, translation: TextTranslation, signal?: AbortSignal): Promise<Piece> {
  const key = pieceKey(query, translation)
  const cached = readCache(key)
  if (cached) return cached
  const data = await fetchOne(query, translation, signal)
  const piece: Piece = {
    translationName: data.translation_name ?? '',
    verses: (data.verses ?? []).map((v) => ({
      chapter: v.chapter,
      verse: v.verse,
      text: v.text.replace(/\s+/g, ' ').trim(),
    })),
  }
  if (piece.verses.length === 0) throw new PassageError('empty', "Couldn't find any verses for this passage.")
  writeCache(key, piece)
  return piece
}

/** Load a passage such as "Genesis 1-3" or "John 3:16". Throws on network/API errors. */
export async function loadPassage(
  ref: string,
  translation: TextTranslation = DEFAULT_TEXT_TRANSLATION,
  signal?: AbortSignal,
): Promise<PassageText> {
  const parsed = parseRef(ref)
  let verses: Verse[] = []
  let translationName = ''
  let truncated = false

  if (parsed.verseSpec) {
    const piece = await getPiece(`${parsed.book} ${parsed.verseSpec}`, translation, signal)
    translationName = piece.translationName
    verses = piece.verses
  } else if (parsed.chapters) {
    const [start, endRaw] = parsed.chapters
    const end = Math.min(endRaw, start + MAX_CHAPTERS - 1)
    truncated = end < endRaw
    const singleChapterVerses = SINGLE_CHAPTER_VERSES[parsed.book.toLowerCase()]
    for (let ch = start; ch <= end; ch++) {
      const query =
        singleChapterVerses && ch === 1 ? `${parsed.book} 1:1-${singleChapterVerses}` : `${parsed.book} ${ch}`
      const piece = await getPiece(query, translation, signal)
      translationName = piece.translationName
      verses = verses.concat(piece.verses)
    }
  }

  if (verses.length === 0) throw new PassageError('empty', "Couldn't find any verses for this passage.")

  const result: PassageText = { reference: ref, translation, translationName, verses }
  if (truncated) result.truncated = true
  return result
}

/** True when a reference spans more than one chapter (used to show chapter headings in the bubble). */
export function spansChapters(ref: string): boolean {
  const p = parseRef(ref)
  return !!p.chapters && p.chapters[1] > p.chapters[0]
}
