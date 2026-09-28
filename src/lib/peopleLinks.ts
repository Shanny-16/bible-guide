// Matches a "Main characters" name (from src/data/characters.ts) to a Person slug (from
// src/data/people.ts), so BookPage can link character mentions to their People page. Exact,
// case-insensitive matching only after normalization — never fuzzy.
import { PEOPLE } from '../data/people'

// Aliases that aren't derivable just by normalizing a Person's own `name` field.
const MANUAL_ALIASES: Record<string, string> = {
  adam: 'adam-and-eve',
  'mary and joseph': 'mary',
  cephas: 'peter',
}

/** Strips any parenthetical, cuts at the first comma, and trims. */
function normalize(raw: string): string {
  const withoutParens = raw.replace(/\([^)]*\)/g, '')
  const commaIndex = withoutParens.indexOf(',')
  const cut = commaIndex === -1 ? withoutParens : withoutParens.slice(0, commaIndex)
  return cut.trim()
}

const BY_NORMALIZED_NAME = new Map<string, string>()
for (const person of PEOPLE) {
  const key = normalize(person.name).toLowerCase()
  if (!BY_NORMALIZED_NAME.has(key)) BY_NORMALIZED_NAME.set(key, person.slug)
}

/** Returns the Person slug a "Main characters" name refers to, or undefined if there's no exact match. */
export function personSlugForCharacter(name: string): string | undefined {
  const normalized = normalize(name)
  if (/^jesus/i.test(normalized)) return 'jesus'

  const key = normalized.toLowerCase()
  return BY_NORMALIZED_NAME.get(key) ?? MANUAL_ALIASES[key]
}
