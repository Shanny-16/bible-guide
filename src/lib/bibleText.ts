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
  const book = trimmed.slice(0, lastSpace)
  const spec = trimmed.slice(lastSpace + 1)
  if (spec.includes(':')) return { book, verseSpec: spec }
  const m = spec.match(/^(\d+)(?:-(\d+))?$/)
  if (!m) return { book, verseSpec: spec }
  const start = Number(m[1])
  const end = m[2] ? Number(m[2]) : start
  return { book, chapters: [start, end] }
}

const MAX_CHAPTERS = 6

const memoryCache = new Map<string, PassageText>()

function storageKey(ref: string, translation: TextTranslation) {
  return `bg.text.${translation}.${ref}`
}

function readCache(ref: string, translation: TextTranslation): PassageText | undefined {
  const key = storageKey(ref, translation)
  const hit = memoryCache.get(key)
  if (hit) return hit
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw) as PassageText
      memoryCache.set(key, parsed)
      return parsed
    }
  } catch {
    /* storage unavailable */
  }
  return undefined
}

function writeCache(ref: string, translation: TextTranslation, value: PassageText) {
  const key = storageKey(ref, translation)
  memoryCache.set(key, value)
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable or full; memory cache still works */
  }
}

interface ApiResponse {
  reference: string
  translation_name: string
  verses: Array<{ chapter: number; verse: number; text: string }>
  error?: string
}

async function fetchOne(query: string, translation: TextTranslation, signal?: AbortSignal): Promise<ApiResponse> {
  const url = `https://bible-api.com/${encodeURIComponent(query).replace(/%20/g, '+')}?translation=${translation}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Could not load passage (${res.status})`)
  const data = (await res.json()) as ApiResponse
  if (data.error) throw new Error(data.error)
  return data
}

/** Load a passage such as "Genesis 1-3" or "John 3:16". Throws on network/API errors. */
export async function loadPassage(
  ref: string,
  translation: TextTranslation = DEFAULT_TEXT_TRANSLATION,
  signal?: AbortSignal,
): Promise<PassageText> {
  const cached = readCache(ref, translation)
  if (cached) return cached

  const parsed = parseRef(ref)
  let verses: Verse[] = []
  let translationName = ''

  if (parsed.verseSpec) {
    const data = await fetchOne(`${parsed.book} ${parsed.verseSpec}`, translation, signal)
    translationName = data.translation_name
    verses = data.verses
  } else if (parsed.chapters) {
    const [start, endRaw] = parsed.chapters
    const end = Math.min(endRaw, start + MAX_CHAPTERS - 1)
    for (let ch = start; ch <= end; ch++) {
      const data = await fetchOne(`${parsed.book} ${ch}`, translation, signal)
      translationName = data.translation_name
      verses = verses.concat(data.verses)
    }
  }

  const result: PassageText = {
    reference: ref,
    translation,
    translationName,
    verses: verses.map((v) => ({ chapter: v.chapter, verse: v.verse, text: v.text.replace(/\s+/g, ' ').trim() })),
  }
  writeCache(ref, translation, result)
  return result
}

/** True when a reference spans more than one chapter (used to show chapter headings in the bubble). */
export function spansChapters(ref: string): boolean {
  const p = parseRef(ref)
  return !!p.chapters && p.chapters[1] > p.chapters[0]
}
