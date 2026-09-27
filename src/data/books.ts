// All 66 books of the Bible, transcribed from Sharon's printed "Pastel Bible Guide".
// Dates and authorship are summaries of traditional and scholarly views; "Trad." = traditional attribution.

export type Testament = 'OT' | 'NT'

export type SectionId =
  | 'law'
  | 'history'
  | 'wisdom'
  | 'major'
  | 'minor'
  | 'gospels'
  | 'acts'
  | 'paul'
  | 'general'
  | 'apocalypse'

export interface Section {
  id: SectionId
  testament: Testament
  name: string
  short: string
  blurb: string
}

export interface KeyPassage {
  /** Text shown on the chip, e.g. "1-3" or "50:20" */
  label: string
  /** Full reference used for the Bible link, e.g. "Genesis 1-3" */
  ref: string
}

export interface Book {
  num: number
  slug: string
  name: string
  testament: Testament
  section: SectionId
  chapters: number
  date: string
  authorship: string
  snapshot: string
  keyPassages: KeyPassage[]
}

export const SECTIONS: Section[] = [
  { id: 'law', testament: 'OT', name: 'The Law / Pentateuch', short: 'Law', blurb: 'The five books of Moses: beginnings, rescue, and covenant.' },
  { id: 'history', testament: 'OT', name: 'History', short: 'History', blurb: 'Israel in the land: conquest, judges, kings, exile, and return.' },
  { id: 'wisdom', testament: 'OT', name: 'Wisdom & Poetry', short: 'Wisdom', blurb: 'Prayer, praise, wisdom, suffering, and love.' },
  { id: 'major', testament: 'OT', name: 'Major Prophets', short: 'Major Prophets', blurb: 'The longer prophetic books.' },
  { id: 'minor', testament: 'OT', name: 'Minor Prophets', short: 'Minor Prophets', blurb: 'Twelve shorter prophetic books ("minor" means shorter, not less important).' },
  { id: 'gospels', testament: 'NT', name: 'Gospels', short: 'Gospels', blurb: 'Four portraits of Jesus.' },
  { id: 'acts', testament: 'NT', name: 'Acts / History', short: 'Acts', blurb: 'The birth and spread of the church.' },
  { id: 'paul', testament: 'NT', name: "Paul's Letters", short: "Paul's Letters", blurb: 'Letters to churches and coworkers, arranged largely by length.' },
  { id: 'general', testament: 'NT', name: 'General Letters', short: 'General Letters', blurb: 'Letters to the wider church from other leaders.' },
  { id: 'apocalypse', testament: 'NT', name: 'Apocalypse', short: 'Apocalypse', blurb: "Prophecy, letter, and vision of Christ's victory." },
]

const k = (book: string, ...items: Array<string | [string, string]>): KeyPassage[] =>
  items.map((it) =>
    typeof it === 'string' ? { label: it, ref: `${book} ${it}` } : { label: it[0], ref: `${book} ${it[1]}` },
  )

export const BOOKS: Book[] = [
  // ---------------- THE LAW / PENTATEUCH ----------------
  {
    num: 1, slug: 'genesis', name: 'Genesis', testament: 'OT', section: 'law', chapters: 50,
    date: 'Trad. 15th-13th c. BC; final form debated',
    authorship: 'Trad. Moses; composition/redaction debated',
    snapshot: 'Beginnings: creation, fall, flood, Babel, patriarchs, Joseph.',
    keyPassages: k('Genesis', '1-3', '12', '15', '22', '50:20'),
  },
  {
    num: 2, slug: 'exodus', name: 'Exodus', testament: 'OT', section: 'law', chapters: 40,
    date: 'Trad. 15th-13th c. BC; final form debated',
    authorship: 'Trad. Moses; composition/redaction debated',
    snapshot: 'Exodus from Egypt, Passover, Sinai covenant, tabernacle. Moses, Aaron, Pharaoh.',
    keyPassages: k('Exodus', '3', '12', '14', '20', '32-34'),
  },
  {
    num: 3, slug: 'leviticus', name: 'Leviticus', testament: 'OT', section: 'law', chapters: 27,
    date: 'Trad. 15th-13th c. BC; final form debated',
    authorship: 'Trad. Moses; priestly material central',
    snapshot: 'Sacrifice, priesthood, purity, holiness, Day of Atonement.',
    keyPassages: k('Leviticus', '16', '17:11', '19:2,18'),
  },
  {
    num: 4, slug: 'numbers', name: 'Numbers', testament: 'OT', section: 'law', chapters: 36,
    date: 'Trad. 15th-13th c. BC; final form debated',
    authorship: 'Trad. Moses; composition/redaction debated',
    snapshot: 'Wilderness rebellion and faithfulness; old generation gives way to new.',
    keyPassages: k('Numbers', '6:24-26', '13-14', '21', '22-24'),
  },
  {
    num: 5, slug: 'deuteronomy', name: 'Deuteronomy', testament: 'OT', section: 'law', chapters: 34,
    date: 'Trad. late 2nd millennium BC; final form debated',
    authorship: 'Primarily Mosaic tradition; ch. 34 later',
    snapshot: "Moses' final covenant sermons before Canaan.",
    keyPassages: k('Deuteronomy', '6:4-9', '8:3', '18:15', '30:19-20'),
  },

  // ---------------- HISTORY ----------------
  {
    num: 6, slug: 'joshua', name: 'Joshua', testament: 'OT', section: 'history', chapters: 24,
    date: 'Events c. 13th-12th c.; composition likely later',
    authorship: 'Anonymous; Joshua traditions included',
    snapshot: 'Entry into Canaan, Jericho, land allotment, covenant renewal. Joshua, Rahab, Caleb.',
    keyPassages: k('Joshua', '1', '2', '6', '24'),
  },
  {
    num: 7, slug: 'judges', name: 'Judges', testament: 'OT', section: 'history', chapters: 21,
    date: 'Events c. 12th-11th c.; book shaped later',
    authorship: 'Anonymous',
    snapshot: 'Sin-oppression-deliverance cycle; Deborah, Gideon, Jephthah, Samson.',
    keyPassages: k('Judges', '2', '4-5', '6-8', '13-16', '21:25'),
  },
  {
    num: 8, slug: 'ruth', name: 'Ruth', testament: 'OT', section: 'history', chapters: 4,
    date: 'Story in Judges era; written after David arose',
    authorship: 'Anonymous',
    snapshot: 'Ruth, Naomi, Boaz; loyalty, providence, kinsman-redeemer; Davidic ancestry.',
    keyPassages: k('Ruth', '1:16-17', '4'),
  },
  {
    num: 9, slug: '1-samuel', name: '1 Samuel', testament: 'OT', section: 'history', chapters: 31,
    date: 'Events c. 11th-10th c.; compiled later',
    authorship: 'Anonymous; Samuel/Nathan/Gad traditions possible',
    snapshot: 'Samuel, Saul, David; transition from judges to monarchy.',
    keyPassages: k('1 Samuel', '3', '8', '15', '16', '17'),
  },
  {
    num: 10, slug: '2-samuel', name: '2 Samuel', testament: 'OT', section: 'history', chapters: 24,
    date: 'Events c. 10th c.; compiled later',
    authorship: 'Anonymous; uses royal/prophetic sources',
    snapshot: "David's reign, covenant, victories, Bathsheba, family crisis.",
    keyPassages: k('2 Samuel', '7', '11-12', '22'),
  },
  {
    num: 11, slug: '1-kings', name: '1 Kings', testament: 'OT', section: 'history', chapters: 22,
    date: 'Events c. 970-850 BC; final form 6th c. BC',
    authorship: 'Anonymous compiler(s), often linked to Deuteronomistic history',
    snapshot: 'Solomon, temple, kingdom division, Elijah.',
    keyPassages: k('1 Kings', '3', '8', '12', '18'),
  },
  {
    num: 12, slug: '2-kings', name: '2 Kings', testament: 'OT', section: 'history', chapters: 25,
    date: 'Events c. 850-560 BC; final form after 586 BC',
    authorship: 'Anonymous compiler(s)',
    snapshot: 'Elisha; fall of Israel (722) and Judah/Jerusalem (586); exile.',
    keyPassages: k('2 Kings', '2', '5', '17', '18-19', '22-25'),
  },
  {
    num: 13, slug: '1-chronicles', name: '1 Chronicles', testament: 'OT', section: 'history', chapters: 29,
    date: 'Likely 5th-4th c. BC',
    authorship: 'Anonymous "Chronicler"',
    snapshot: 'Genealogies, David, worship, temple preparation.',
    keyPassages: k('1 Chronicles', '16', '17', '29'),
  },
  {
    num: 14, slug: '2-chronicles', name: '2 Chronicles', testament: 'OT', section: 'history', chapters: 36,
    date: 'Likely 5th-4th c. BC',
    authorship: 'Anonymous "Chronicler"',
    snapshot: "Solomon through Judah's exile; temple and reform emphasized.",
    keyPassages: k('2 Chronicles', '7:14', '20', '34-36'),
  },
  {
    num: 15, slug: 'ezra', name: 'Ezra', testament: 'OT', section: 'history', chapters: 10,
    date: '5th c. BC material; final form possibly later',
    authorship: 'Contains Ezra memoirs; final editor uncertain',
    snapshot: 'Return from exile; temple rebuilt; Torah reform. Zerubbabel, Jeshua, Ezra.',
    keyPassages: k('Ezra', '1', '3', '7', '9-10'),
  },
  {
    num: 16, slug: 'nehemiah', name: 'Nehemiah', testament: 'OT', section: 'history', chapters: 13,
    date: '5th c. BC material; final form possibly later',
    authorship: 'Contains Nehemiah memoirs; final editor uncertain',
    snapshot: 'Jerusalem walls rebuilt; opposition; covenant renewal.',
    keyPassages: k('Nehemiah', '1-2', '4', '8-9'),
  },
  {
    num: 17, slug: 'esther', name: 'Esther', testament: 'OT', section: 'history', chapters: 10,
    date: 'Likely 4th-3rd c. BC; story set under Persian rule',
    authorship: 'Anonymous',
    snapshot: 'Esther and Mordecai thwart Haman; providence and Jewish preservation.',
    keyPassages: k('Esther', '4:14', '7-9'),
  },

  // ---------------- WISDOM & POETRY ----------------
  {
    num: 18, slug: 'job', name: 'Job', testament: 'OT', section: 'wisdom', chapters: 42,
    date: 'Date highly uncertain; proposals span many centuries',
    authorship: 'Anonymous',
    snapshot: "Righteous suffering, wisdom, God's sovereignty. Job and friends.",
    keyPassages: k('Job', '1-2', '19:25', '38-42'),
  },
  {
    num: 19, slug: 'psalms', name: 'Psalms', testament: 'OT', section: 'wisdom', chapters: 150,
    date: 'Collected over centuries, c. 10th-5th c. BC',
    authorship: 'Many: David, Asaph, sons of Korah, Moses, Solomon, others',
    snapshot: 'Prayer/worship: praise, lament, repentance, wisdom, kingship.',
    keyPassages: k('Psalms', ['1', '1'], ['2', '2'], ['23', '23'], ['51', '51'], ['91', '91'], ['103', '103'], ['110', '110'], ['119', '119'], ['139', '139']),
  },
  {
    num: 20, slug: 'proverbs', name: 'Proverbs', testament: 'OT', section: 'wisdom', chapters: 31,
    date: 'Core Solomonic material 10th c.; collections through 8th-6th c. BC',
    authorship: 'Solomon; "the wise"; Agur; Lemuel; editors',
    snapshot: 'Wisdom for speech, work, money, sex, family, character.',
    keyPassages: k('Proverbs', '1:7', '3:5-6', '4:23', '9:10', '31'),
  },
  {
    num: 21, slug: 'ecclesiastes', name: 'Ecclesiastes', testament: 'OT', section: 'wisdom', chapters: 12,
    date: 'Often dated 5th-3rd c. BC; traditional view earlier',
    authorship: 'Qoheleth ("Teacher"); traditionally Solomon',
    snapshot: 'Meaning, mortality, work, pleasure, wisdom; fear God.',
    keyPassages: k('Ecclesiastes', '1', '3:1-8', '12:13-14'),
  },
  {
    num: 22, slug: 'song-of-songs', name: 'Song of Songs', testament: 'OT', section: 'wisdom', chapters: 8,
    date: 'Date debated; often 10th-4th c. BC',
    authorship: 'Trad. Solomon; exact authorship uncertain',
    snapshot: 'Poetic celebration of love and desire.',
    keyPassages: k('Song of Songs', '2:16', '8:6-7'),
  },

  // ---------------- MAJOR PROPHETS ----------------
  {
    num: 23, slug: 'isaiah', name: 'Isaiah', testament: 'OT', section: 'major', chapters: 66,
    date: "Prophet active c. 740-700 BC; book's formation debated",
    authorship: 'Isaiah son of Amoz; later composition/editing debated, esp. 40-66',
    snapshot: 'Holiness, judgment, comfort, servant, Messiah, new creation.',
    keyPassages: k('Isaiah', '6', '7:14', '9:6-7', '40', '53', '61', '65-66'),
  },
  {
    num: 24, slug: 'jeremiah', name: 'Jeremiah', testament: 'OT', section: 'major', chapters: 52,
    date: 'c. 627-580 BC; compiled during/after ministry',
    authorship: 'Jeremiah; Baruch as scribe; editorial shaping',
    snapshot: "Judah's last days, exile, repentance, new covenant.",
    keyPassages: k('Jeremiah', '1', '17:9', '29', '31:31-34'),
  },
  {
    num: 25, slug: 'lamentations', name: 'Lamentations', testament: 'OT', section: 'major', chapters: 5,
    date: 'Soon after 586 BC',
    authorship: 'Anonymous; traditionally Jeremiah',
    snapshot: "Five laments over Jerusalem's destruction; grief and hope.",
    keyPassages: k('Lamentations', '3:22-23,31-33'),
  },
  {
    num: 26, slug: 'ezekiel', name: 'Ezekiel', testament: 'OT', section: 'major', chapters: 48,
    date: 'Prophecies c. 593-571 BC',
    authorship: 'Ezekiel, priest-prophet',
    snapshot: 'Exile visions, glory of God, new heart, dry bones, restored temple.',
    keyPassages: k('Ezekiel', '1', '18', '36:26-27', '37', '47'),
  },
  {
    num: 27, slug: 'daniel', name: 'Daniel', testament: 'OT', section: 'major', chapters: 12,
    date: 'Trad. 6th c. BC; many scholars date final form c. 167-164 BC',
    authorship: 'Trad. Daniel; final authorship/date strongly debated',
    snapshot: "Faithfulness in exile; kingdoms, visions, God's rule.",
    keyPassages: k('Daniel', '1', '3', '6', '7', '9', '12'),
  },

  // ---------------- MINOR PROPHETS ----------------
  {
    num: 28, slug: 'hosea', name: 'Hosea', testament: 'OT', section: 'minor', chapters: 14,
    date: 'c. 755-715 BC',
    authorship: 'Hosea',
    snapshot: "Marriage imagery: Israel's unfaithfulness and God's covenant love.",
    keyPassages: k('Hosea', '1-3', '6:6', '11', '14'),
  },
  {
    num: 29, slug: 'joel', name: 'Joel', testament: 'OT', section: 'minor', chapters: 3,
    date: 'Date very uncertain: c. 9th-4th c. BC proposals',
    authorship: 'Joel son of Pethuel',
    snapshot: 'Locust plague, repentance, Day of the LORD, Spirit.',
    keyPassages: k('Joel', '2:12-13,28-32'),
  },
  {
    num: 30, slug: 'amos', name: 'Amos', testament: 'OT', section: 'minor', chapters: 9,
    date: 'c. 760 BC',
    authorship: 'Amos',
    snapshot: 'Justice, true worship, judgment on northern Israel, future hope.',
    keyPassages: k('Amos', '3:7', '5:21-24', '7', '9'),
  },
  {
    num: 31, slug: 'obadiah', name: 'Obadiah', testament: 'OT', section: 'minor', chapters: 1,
    date: 'Probably 6th c. BC; date debated',
    authorship: 'Obadiah',
    snapshot: 'Judgment on Edom for pride/violence toward Judah. 21 verses.',
    keyPassages: k('Obadiah', ['3-4', '1:3-4'], ['15', '1:15'], ['21', '1:21']),
  },
  {
    num: 32, slug: 'jonah', name: 'Jonah', testament: 'OT', section: 'minor', chapters: 4,
    date: "Prophet lived 8th c.; book's composition likely later",
    authorship: 'Anonymous narrative about Jonah son of Amittai',
    snapshot: "Nineveh, reluctant prophet, God's compassion for nations/enemies.",
    keyPassages: k('Jonah', ['1-4 (esp. 4)', '1-4']),
  },
  {
    num: 33, slug: 'micah', name: 'Micah', testament: 'OT', section: 'minor', chapters: 7,
    date: 'c. 735-700 BC',
    authorship: 'Micah',
    snapshot: 'Judgment and restoration; ruler from Bethlehem; justice/mercy.',
    keyPassages: k('Micah', '5:2', '6:8', '7:18-19'),
  },
  {
    num: 34, slug: 'nahum', name: 'Nahum', testament: 'OT', section: 'minor', chapters: 3,
    date: 'c. 663-612 BC',
    authorship: 'Nahum',
    snapshot: 'Fall of Nineveh/Assyria; divine justice.',
    keyPassages: k('Nahum', '1:7', '1-3'),
  },
  {
    num: 35, slug: 'habakkuk', name: 'Habakkuk', testament: 'OT', section: 'minor', chapters: 3,
    date: 'c. 609-597 BC',
    authorship: 'Habakkuk',
    snapshot: 'Why evil? Why Babylon? Faith amid judgment.',
    keyPassages: k('Habakkuk', '2:4', '3:17-19'),
  },
  {
    num: 36, slug: 'zephaniah', name: 'Zephaniah', testament: 'OT', section: 'minor', chapters: 3,
    date: 'c. 640-609 BC',
    authorship: 'Zephaniah',
    snapshot: 'Day of the LORD: judgment and restoration.',
    keyPassages: k('Zephaniah', '1', '3:17'),
  },
  {
    num: 37, slug: 'haggai', name: 'Haggai', testament: 'OT', section: 'minor', chapters: 2,
    date: '520 BC',
    authorship: 'Haggai',
    snapshot: 'Returned exiles urged to rebuild the temple.',
    keyPassages: k('Haggai', '1:5-8', '2:6-9'),
  },
  {
    num: 38, slug: 'zechariah', name: 'Zechariah', testament: 'OT', section: 'minor', chapters: 14,
    date: '520-518 BC for chs. 1-8; later chapters debated',
    authorship: 'Zechariah; unity/composition of 9-14 debated',
    snapshot: 'Visions, temple, coming king, restoration.',
    keyPassages: k('Zechariah', '4:6', '9:9', '12:10', '14'),
  },
  {
    num: 39, slug: 'malachi', name: 'Malachi', testament: 'OT', section: 'minor', chapters: 4,
    date: 'Likely c. 460-430 BC',
    authorship: 'Malachi ("my messenger" may be name/title)',
    snapshot: 'Corrupt worship, covenant faithfulness, coming messenger.',
    keyPassages: k('Malachi', '3:1,10', '4:5-6'),
  },

  // ---------------- GOSPELS ----------------
  {
    num: 40, slug: 'matthew', name: 'Matthew', testament: 'NT', section: 'gospels', chapters: 28,
    date: 'Commonly c. AD 70-90; earlier dates proposed',
    authorship: 'Anonymous text; early church tradition: Matthew',
    snapshot: 'Jesus as Messiah/King; fulfillment, kingdom teaching.',
    keyPassages: k('Matthew', '1', '5-7', '16', '24-25', '28:18-20'),
  },
  {
    num: 41, slug: 'mark', name: 'Mark', testament: 'NT', section: 'gospels', chapters: 16,
    date: 'Commonly c. AD 65-75',
    authorship: 'Anonymous text; early tradition: John Mark, linked to Peter',
    snapshot: 'Fast-paced Gospel; suffering Messiah/Son of God.',
    keyPassages: k('Mark', '1:1', '8:27-38', '10:45', '15-16'),
  },
  {
    num: 42, slug: 'luke', name: 'Luke', testament: 'NT', section: 'gospels', chapters: 24,
    date: 'Commonly c. AD 70-90; earlier dates proposed',
    authorship: "Anonymous text; early tradition: Luke, Paul's companion",
    snapshot: 'Orderly account; salvation for Jews/Gentiles, outsiders, poor, sinners.',
    keyPassages: k('Luke', '1-2', '10', '15', '22-24'),
  },
  {
    num: 43, slug: 'john', name: 'John', testament: 'NT', section: 'gospels', chapters: 21,
    date: 'Commonly c. AD 90-100; stages of composition debated',
    authorship: 'Anonymous text; tradition: John son of Zebedee',
    snapshot: 'Jesus as Word/Son; signs and "I AM" sayings; belief and life.',
    keyPassages: k('John', '1', '3:16', '8:58', '10', '11', '14-17', '20:30-31'),
  },

  // ---------------- ACTS ----------------
  {
    num: 44, slug: 'acts', name: 'Acts', testament: 'NT', section: 'acts', chapters: 28,
    date: 'Commonly c. AD 70-90; earlier dates proposed',
    authorship: 'Same author as Luke; tradition: Luke',
    snapshot: 'Spirit-empowered mission: Jerusalem to Rome; Peter then Paul.',
    keyPassages: k('Acts', '1:8', '2', '9', '10', '15', '16', '17', '20', '28'),
  },

  // ---------------- PAUL'S LETTERS ----------------
  {
    num: 45, slug: 'romans', name: 'Romans', testament: 'NT', section: 'paul', chapters: 16,
    date: 'c. AD 56-58',
    authorship: 'Paul',
    snapshot: 'Gospel: sin, justification, grace, Spirit, Israel, transformed living.',
    keyPassages: k('Romans', '1:16-17', '3:23-26', '5', '8', '10:9-10', '12'),
  },
  {
    num: 46, slug: '1-corinthians', name: '1 Corinthians', testament: 'NT', section: 'paul', chapters: 16,
    date: 'c. AD 53-55',
    authorship: 'Paul',
    snapshot: 'Church conflict, holiness, marriage, gifts, worship, resurrection.',
    keyPassages: k('1 Corinthians', '6', '10', '11-13', '15'),
  },
  {
    num: 47, slug: '2-corinthians', name: '2 Corinthians', testament: 'NT', section: 'paul', chapters: 13,
    date: 'c. AD 55-56',
    authorship: 'Paul',
    snapshot: 'Weakness and ministry, reconciliation, generosity, apostleship.',
    keyPassages: k('2 Corinthians', '4', '5:17-21', '9', '12:7-10'),
  },
  {
    num: 48, slug: 'galatians', name: 'Galatians', testament: 'NT', section: 'paul', chapters: 6,
    date: 'c. AD 48-55 (date depends on destination theory)',
    authorship: 'Paul',
    snapshot: 'Justification by faith, freedom, Spirit versus flesh.',
    keyPassages: k('Galatians', '2:16,20', '3', '5:16-26', '6'),
  },
  {
    num: 49, slug: 'ephesians', name: 'Ephesians', testament: 'NT', section: 'paul', chapters: 6,
    date: 'Trad. c. AD 60-62; authorship/date debated',
    authorship: 'Trad. Paul; Pauline authorship disputed by some scholars',
    snapshot: 'Grace, unity in Christ, church, new life, marriage, armor of God.',
    keyPassages: k('Ephesians', '2:1-10', '4', '5:22-33', '6:10-18'),
  },
  {
    num: 50, slug: 'philippians', name: 'Philippians', testament: 'NT', section: 'paul', chapters: 4,
    date: 'c. AD 54-62; often linked to imprisonment',
    authorship: 'Paul',
    snapshot: 'Joy, humility, perseverance, Christlike service.',
    keyPassages: k('Philippians', '1:6', '2:5-11', '3:7-14', '4:4-13'),
  },
  {
    num: 51, slug: 'colossians', name: 'Colossians', testament: 'NT', section: 'paul', chapters: 4,
    date: 'Trad. c. AD 60-62; authorship/date debated',
    authorship: 'Trad. Paul; disputed by some scholars',
    snapshot: 'Supremacy/sufficiency of Christ; new life.',
    keyPassages: k('Colossians', '1:15-20', '2:8-15', '3'),
  },
  {
    num: 52, slug: '1-thessalonians', name: '1 Thessalonians', testament: 'NT', section: 'paul', chapters: 5,
    date: 'c. AD 49-51',
    authorship: 'Paul',
    snapshot: "Encouragement, holiness, resurrection and Christ's return.",
    keyPassages: k('1 Thessalonians', '4:13-18', '5:16-24'),
  },
  {
    num: 53, slug: '2-thessalonians', name: '2 Thessalonians', testament: 'NT', section: 'paul', chapters: 3,
    date: 'c. AD 50-52 if Pauline; authorship debated',
    authorship: 'Trad. Paul',
    snapshot: 'Day of the Lord, perseverance, work.',
    keyPassages: k('2 Thessalonians', '2', '3:10-13'),
  },
  {
    num: 54, slug: '1-timothy', name: '1 Timothy', testament: 'NT', section: 'paul', chapters: 6,
    date: 'Trad. c. AD 62-67; some date c. 80-100+',
    authorship: 'Trad. Paul; authorship widely debated',
    snapshot: 'Church leadership, doctrine, worship, godliness.',
    keyPassages: k('1 Timothy', '1:15', '3', '4:12', '6'),
  },
  {
    num: 55, slug: '2-timothy', name: '2 Timothy', testament: 'NT', section: 'paul', chapters: 4,
    date: 'Trad. c. AD 64-67; some date later',
    authorship: 'Trad. Paul; authorship widely debated',
    snapshot: 'Endurance, guarding the gospel, Scripture, final charge.',
    keyPassages: k('2 Timothy', '1:7', '2:15', '3:16-17', '4:6-8'),
  },
  {
    num: 56, slug: 'titus', name: 'Titus', testament: 'NT', section: 'paul', chapters: 3,
    date: 'Trad. c. AD 62-67; some date c. 80-100+',
    authorship: 'Trad. Paul; authorship widely debated',
    snapshot: 'Leadership, sound doctrine, good works.',
    keyPassages: k('Titus', '2:11-14', '3:4-8'),
  },
  {
    num: 57, slug: 'philemon', name: 'Philemon', testament: 'NT', section: 'paul', chapters: 1,
    date: 'c. AD 54-62',
    authorship: 'Paul',
    snapshot: 'Reconciliation and Christian brotherhood: Paul, Philemon, Onesimus.',
    keyPassages: k('Philemon', ['8-21', '1:8-21']),
  },

  // ---------------- GENERAL LETTERS ----------------
  {
    num: 58, slug: 'hebrews', name: 'Hebrews', testament: 'NT', section: 'general', chapters: 13,
    date: 'Likely c. AD 60-90; often argued before AD 70',
    authorship: 'Anonymous; author unknown',
    snapshot: 'Christ superior; high priest, new covenant, once-for-all sacrifice, persevering faith.',
    keyPassages: k('Hebrews', '1', '4:14-16', '7-10', '11', '12'),
  },
  {
    num: 59, slug: 'james', name: 'James', testament: 'NT', section: 'general', chapters: 5,
    date: 'Often c. AD 40-60 if James; later dates proposed',
    authorship: 'Trad. James, brother of Jesus; authorship debated',
    snapshot: 'Practical faith: trials, wisdom, speech, works, prayer.',
    keyPassages: k('James', '1:2-5,22', '2:14-26', '3', '5'),
  },
  {
    num: 60, slug: '1-peter', name: '1 Peter', testament: 'NT', section: 'general', chapters: 5,
    date: 'Trad. c. AD 60-64; some propose c. 70-90',
    authorship: 'Trad. Peter; authorship debated',
    snapshot: 'Hope and holiness amid suffering; believers as exiles.',
    keyPassages: k('1 Peter', '1:3-9', '2:9-12', '3:15', '5:7-10'),
  },
  {
    num: 61, slug: '2-peter', name: '2 Peter', testament: 'NT', section: 'general', chapters: 3,
    date: 'Trad. c. AD 64-68; many scholars date c. AD 80-125',
    authorship: 'Trad. Peter; authorship strongly debated',
    snapshot: "Growth, false teachers, Scripture, Christ's return.",
    keyPassages: k('2 Peter', '1:3-11,20-21', '3:8-13'),
  },
  {
    num: 62, slug: '1-john', name: '1 John', testament: 'NT', section: 'general', chapters: 5,
    date: 'Commonly c. AD 90-100',
    authorship: 'Anonymous; closely linked to Johannine tradition',
    snapshot: 'Assurance, truth about Christ, obedience, love.',
    keyPassages: k('1 John', '1:5-10', '3:1', '4:7-21', '5:11-13'),
  },
  {
    num: 63, slug: '2-john', name: '2 John', testament: 'NT', section: 'general', chapters: 1,
    date: 'Commonly c. AD 90-100',
    authorship: '"The elder"; linked to Johannine tradition',
    snapshot: 'Truth, love, discernment toward false teachers.',
    keyPassages: k('2 John', ['4-11', '1:4-11']),
  },
  {
    num: 64, slug: '3-john', name: '3 John', testament: 'NT', section: 'general', chapters: 1,
    date: 'Commonly c. AD 90-100',
    authorship: '"The elder"; linked to Johannine tradition',
    snapshot: 'Hospitality and church conflict: Gaius, Diotrephes, Demetrius.',
    keyPassages: k('3 John', ['5-12', '1:5-12']),
  },
  {
    num: 65, slug: 'jude', name: 'Jude', testament: 'NT', section: 'general', chapters: 1,
    date: 'Often c. AD 60-90',
    authorship: "Jude/Judas, brother of James; traditional identification with Jesus' brother",
    snapshot: 'Contend for the faith; warning against corrupt teachers.',
    keyPassages: k('Jude', ['3', '1:3'], ['20-25', '1:20-25']),
  },

  // ---------------- APOCALYPSE ----------------
  {
    num: 66, slug: 'revelation', name: 'Revelation', testament: 'NT', section: 'apocalypse', chapters: 22,
    date: 'Commonly c. AD 95-96; earlier date c. 68-70 proposed',
    authorship: 'John of Patmos; identity with apostle debated',
    snapshot: "Seven churches, cosmic conflict, judgment, Christ's victory, new creation.",
    keyPassages: k('Revelation', '1-3', '4-5', '12-13', '19-22'),
  },
]

export const bookBySlug = (slug: string) => BOOKS.find((b) => b.slug === slug)
export const sectionById = (id: SectionId) => SECTIONS.find((s) => s.id === id)!
