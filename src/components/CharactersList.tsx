import type { SectionId } from '../data/books'
import { CHARACTERS } from '../data/characters'
import { sectionColors } from '../lib/sectionColors'
import { BookOpenIcon } from './icons'

interface CharactersListProps {
  slug: string
  section: SectionId
  /** Opens the existing PassageSheet (BookPage's openRef state) with the given reference. */
  onOpen: (reference: string) => void
}

/** "Main characters": the people this book talks about most, with an optional jump-to-passage pill. */
export function CharactersList({ slug, section, onOpen }: CharactersListProps) {
  const characters = CHARACTERS[slug]
  if (!characters || characters.length === 0) return null

  const colors = sectionColors(section)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-heading text-lg font-semibold text-ink">Main characters</h2>
      <p className="text-sm text-muted">Besides God himself, the people this book talks about most.</p>
      <div className="rounded-card border border-ink/10 bg-white">
        {characters.map((c, i) => (
          <div
            key={c.name}
            className={`flex items-center gap-3 px-4 py-3 ${i < characters.length - 1 ? 'border-b border-ink/10' : ''}`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-[16px] font-semibold leading-snug text-ink">{c.name}</p>
              <p className="text-[15px] leading-snug text-muted">{c.role}</p>
            </div>
            {c.where && (
              <button
                type="button"
                onClick={() => onOpen(c.where!.ref)}
                className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-cream active:bg-cream"
              >
                <BookOpenIcon className="h-3.5 w-3.5 shrink-0" />
                ch. {c.where.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
