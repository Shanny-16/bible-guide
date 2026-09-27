// Storyline, timeline, covenants and study connections from the footer of the printed guide.

export interface StorylineStep {
  label: string
  /** Book slugs most connected to this step */
  books: string[]
  hint: string
}

export const STORYLINE: StorylineStep[] = [
  { label: 'Creation', books: ['genesis'], hint: 'God makes a good world (Gen 1-2).' },
  { label: 'Fall', books: ['genesis'], hint: 'Humanity rebels; sin and death enter (Gen 3-11).' },
  { label: 'Abraham', books: ['genesis'], hint: 'God promises land, offspring and blessing to the nations (Gen 12-50).' },
  { label: 'Israel', books: ['genesis', 'exodus'], hint: "Abraham's family becomes a people, enslaved in Egypt." },
  { label: 'Exodus / Covenant', books: ['exodus', 'leviticus', 'numbers', 'deuteronomy'], hint: 'Rescue from Egypt; covenant at Sinai; Law and worship.' },
  { label: 'Land', books: ['joshua', 'judges', 'ruth'], hint: 'Entry into Canaan; the cycle of the judges.' },
  { label: 'Kingdom', books: ['1-samuel', '2-samuel', '1-kings', '2-kings', '1-chronicles', '2-chronicles', 'psalms', 'proverbs'], hint: 'Saul, David, Solomon; the kingdom divides.' },
  { label: 'Exile', books: ['2-kings', 'jeremiah', 'lamentations', 'ezekiel', 'daniel'], hint: 'Samaria falls (722 BC); Jerusalem falls (586 BC).' },
  { label: 'Return', books: ['ezra', 'nehemiah', 'esther', 'haggai', 'zechariah', 'malachi'], hint: 'Return from Babylon; temple and walls rebuilt.' },
  { label: 'Messiah', books: ['matthew', 'mark', 'luke', 'john'], hint: 'Jesus: life, death, resurrection.' },
  { label: 'Church / Mission', books: ['acts', 'romans', '1-corinthians', 'ephesians', '1-peter'], hint: 'The Spirit sends the church from Jerusalem to the nations.' },
  { label: 'New Creation', books: ['revelation'], hint: "Christ's victory; all things made new." },
]

export interface DateAnchor {
  when: string
  what: string
}

export const TIMELINE_ANCHORS: DateAnchor[] = [
  { when: 'c. 2000s-1000s BC', what: 'Patriarchs often placed in the 2nd millennium BC' },
  { when: '15th or 13th c. BC', what: 'Exodus (date debated; commonly one of these two)' },
  { when: 'c. 1010-970 BC', what: 'David reigns; Solomon c. 970-930' },
  { when: 'c. 930 BC', what: 'Kingdom divides into Israel (north) and Judah (south)' },
  { when: '722 BC', what: 'Samaria falls to Assyria; northern kingdom ends' },
  { when: '586 BC', what: 'Jerusalem falls to Babylon; exile' },
  { when: '538 BC', what: 'Return from Babylon begins' },
  { when: '516 BC', what: 'Second Temple completed' },
  { when: 'c. AD 27-30/33', what: "Jesus' ministry" },
  { when: 'c. AD 49-51', what: "Earliest surviving letters of Paul" },
  { when: 'c. AD 50-100', what: 'Most New Testament books written' },
  { when: 'AD 70', what: 'Jerusalem and the Temple destroyed by Rome' },
]

export interface Covenant {
  name: string
  summary: string
  refs: string[]
}

export const COVENANTS: Covenant[] = [
  { name: 'Noah', summary: 'Preservation of creation.', refs: ['Genesis 8-9'] },
  { name: 'Abraham', summary: 'Land, offspring, blessing to the nations.', refs: ['Genesis 12', 'Genesis 15', 'Genesis 17'] },
  { name: 'Mosaic / Sinai', summary: 'Israel as a covenant people; Law and worship.', refs: ['Exodus 19-24'] },
  { name: 'Davidic', summary: 'An enduring royal line.', refs: ['2 Samuel 7'] },
  { name: 'New Covenant', summary: 'Forgiveness, transformed hearts, the Spirit.', refs: ['Jeremiah 31:31-34', 'Ezekiel 36:26-27', 'Luke 22:20', 'Hebrews 8'] },
]

export interface ProphetGroup {
  setting: string
  books: string[]
}

export const PROPHETS_IN_SETTING: ProphetGroup[] = [
  { setting: 'Northern kingdom (Israel)', books: ['amos', 'hosea'] },
  { setting: 'Judah before the exile', books: ['isaiah', 'micah', 'zephaniah', 'habakkuk', 'jeremiah'] },
  { setting: "Around Jerusalem's fall", books: ['jeremiah', 'lamentations'] },
  { setting: 'In exile', books: ['ezekiel', 'daniel'] },
  { setting: 'After the return', books: ['haggai', 'zechariah', 'malachi'] },
]

export const PROPHETS_TIP =
  'Reading the prophets beside Kings and Chronicles makes their warnings and promises much easier to place.'

export const NT_CONNECTIONS: string[] = [
  'Luke and Acts are a two-volume work by the same author.',
  "Paul's letters are arranged largely by length, not chronology.",
  'The four Gospels are overlapping portraits of Jesus with distinct emphases.',
  'Hebrews: the author is genuinely unknown.',
  'Revelation is prophecy + letter + apocalyptic literature, rich in Old Testament imagery.',
]

export const KEY_STORYLINE_SENTENCE =
  'Creation → fall → covenant → kingdom → exile → Messiah → church → new creation.'
