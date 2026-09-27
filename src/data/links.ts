// Outbound "go deeper" links. All URL patterns were verified live on 2026-09-27.
import type { Book } from './books'

/** Bible versions offered in the picker. Codes are Bible Gateway version codes. */
export const BIBLE_VERSIONS = [
  { code: 'NIV', label: 'NIV (New International Version)' },
  { code: 'ESV', label: 'ESV (English Standard Version)' },
  { code: 'NLT', label: 'NLT (New Living Translation)' },
  { code: 'NKJV', label: 'NKJV (New King James Version)' },
  { code: 'NVI', label: 'NVI (Nueva Versión Internacional, Español)' },
  { code: 'RVR1960', label: 'RVR1960 (Reina-Valera 1960, Español)' },
] as const

export type VersionCode = (typeof BIBLE_VERSIONS)[number]['code']
export const DEFAULT_VERSION: VersionCode = 'NIV'

/** Link to a passage on Bible Gateway, e.g. passageUrl('1 Samuel 3', 'NIV'). */
export function passageUrl(ref: string, version: VersionCode = DEFAULT_VERSION): string {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=${version}`
}

/**
 * BibleProject book-overview videos (bibleproject.com/videos/<slug>/).
 * Longer books have two videos; a few books share one video.
 */
const BIBLE_PROJECT: Record<string, Array<{ label: string; slug: string }>> = {
  genesis: [{ label: 'Genesis 1-11', slug: 'genesis-1-11' }, { label: 'Genesis 12-50', slug: 'genesis-12-50' }],
  exodus: [{ label: 'Exodus 1-18', slug: 'exodus-1-18' }, { label: 'Exodus 19-40', slug: 'exodus-19-40' }],
  leviticus: [{ label: 'Leviticus', slug: 'leviticus' }],
  numbers: [{ label: 'Numbers', slug: 'numbers' }],
  deuteronomy: [{ label: 'Deuteronomy', slug: 'deuteronomy' }],
  joshua: [{ label: 'Joshua', slug: 'joshua' }],
  judges: [{ label: 'Judges', slug: 'judges' }],
  ruth: [{ label: 'Ruth', slug: 'ruth' }],
  '1-samuel': [{ label: '1 Samuel', slug: '1-samuel' }],
  '2-samuel': [{ label: '2 Samuel', slug: '2-samuel' }],
  '1-kings': [{ label: '1 & 2 Kings', slug: 'kings' }],
  '2-kings': [{ label: '1 & 2 Kings', slug: 'kings' }],
  '1-chronicles': [{ label: '1 & 2 Chronicles', slug: 'chronicles' }],
  '2-chronicles': [{ label: '1 & 2 Chronicles', slug: 'chronicles' }],
  ezra: [{ label: 'Ezra-Nehemiah', slug: 'ezra-nehemiah' }],
  nehemiah: [{ label: 'Ezra-Nehemiah', slug: 'ezra-nehemiah' }],
  esther: [{ label: 'Esther', slug: 'esther' }],
  job: [{ label: 'Job', slug: 'job' }],
  psalms: [{ label: 'Psalms', slug: 'psalms' }],
  proverbs: [{ label: 'Proverbs', slug: 'proverbs' }],
  ecclesiastes: [{ label: 'Ecclesiastes', slug: 'ecclesiastes' }],
  'song-of-songs': [{ label: 'Song of Songs', slug: 'song-songs' }],
  isaiah: [{ label: 'Isaiah 1-39', slug: 'isaiah-1-39' }, { label: 'Isaiah 40-66', slug: 'isaiah-40-66' }],
  jeremiah: [{ label: 'Jeremiah', slug: 'jeremiah' }],
  lamentations: [{ label: 'Lamentations', slug: 'lamentations' }],
  ezekiel: [{ label: 'Ezekiel 1-33', slug: 'ezekiel-1-33' }, { label: 'Ezekiel 34-48', slug: 'ezekiel-34-48' }],
  daniel: [{ label: 'Daniel', slug: 'daniel' }],
  hosea: [{ label: 'Hosea', slug: 'hosea' }],
  joel: [{ label: 'Joel', slug: 'joel' }],
  amos: [{ label: 'Amos', slug: 'amos' }],
  obadiah: [{ label: 'Obadiah', slug: 'obadiah' }],
  jonah: [{ label: 'Jonah', slug: 'jonah' }],
  micah: [{ label: 'Micah', slug: 'micah' }],
  nahum: [{ label: 'Nahum', slug: 'nahum' }],
  habakkuk: [{ label: 'Habakkuk', slug: 'habakkuk' }],
  zephaniah: [{ label: 'Zephaniah', slug: 'zephaniah' }],
  haggai: [{ label: 'Haggai', slug: 'haggai' }],
  zechariah: [{ label: 'Zechariah', slug: 'zechariah' }],
  malachi: [{ label: 'Malachi', slug: 'malachi' }],
  matthew: [{ label: 'Matthew 1-13', slug: 'matthew-1-13' }, { label: 'Matthew 14-28', slug: 'matthew-14-28' }],
  mark: [{ label: 'Mark', slug: 'mark' }],
  luke: [{ label: 'Luke 1-9', slug: 'luke-1-9' }, { label: 'Luke 10-24', slug: 'luke-10-24' }],
  john: [{ label: 'John 1-12', slug: 'john-1-12' }, { label: 'John 13-21', slug: 'john-13-21' }],
  acts: [{ label: 'Acts 1-12', slug: 'acts-1-12' }, { label: 'Acts 13-28', slug: 'acts-13-28' }],
  romans: [{ label: 'Romans 1-4', slug: 'romans-1-4' }, { label: 'Romans 5-16', slug: 'romans-5-16' }],
  '1-corinthians': [{ label: '1 Corinthians', slug: '1-corinthians' }],
  '2-corinthians': [{ label: '2 Corinthians', slug: '2-corinthians' }],
  galatians: [{ label: 'Galatians', slug: 'galatians' }],
  ephesians: [{ label: 'Ephesians', slug: 'ephesians' }],
  philippians: [{ label: 'Philippians', slug: 'philippians' }],
  colossians: [{ label: 'Colossians', slug: 'colossians' }],
  '1-thessalonians': [{ label: '1 Thessalonians', slug: '1-thessalonians' }],
  '2-thessalonians': [{ label: '2 Thessalonians', slug: '2-thessalonians' }],
  '1-timothy': [{ label: '1 Timothy', slug: '1-timothy' }],
  '2-timothy': [{ label: '2 Timothy', slug: '2-timothy' }],
  titus: [{ label: 'Titus', slug: 'titus' }],
  philemon: [{ label: 'Philemon', slug: 'philemon' }],
  hebrews: [{ label: 'Hebrews', slug: 'hebrews' }],
  james: [{ label: 'James', slug: 'james' }],
  '1-peter': [{ label: '1 Peter', slug: '1-peter' }],
  '2-peter': [{ label: '2 Peter', slug: '2-peter' }],
  '1-john': [{ label: '1-3 John', slug: '1-3-john' }],
  '2-john': [{ label: '1-3 John', slug: '1-3-john' }],
  '3-john': [{ label: '1-3 John', slug: '1-3-john' }],
  jude: [{ label: 'Jude', slug: 'jude' }],
  revelation: [{ label: 'Revelation 1-11', slug: 'revelation-1-11' }, { label: 'Revelation 12-22', slug: 'revelation-12-22' }],
}

export function bibleProjectVideos(book: Book): Array<{ label: string; url: string }> {
  return (BIBLE_PROJECT[book.slug] ?? []).map((v) => ({
    label: v.label,
    url: `https://bibleproject.com/videos/${v.slug}/`,
  }))
}

/** Enduring Word (David Guzik) chapter commentary. Song of Songs is filed as "song-of-solomon" there. */
export function enduringWordUrl(book: Book, chapter = 1): string {
  const slug = book.slug === 'song-of-songs' ? 'song-of-solomon' : book.slug
  return `https://enduringword.com/bible-commentary/${slug}-${chapter}/`
}

/** Read the whole book from chapter 1 on Bible Gateway. */
export function readBookUrl(book: Book, version: VersionCode = DEFAULT_VERSION): string {
  return passageUrl(`${book.name} 1`, version)
}
