import type { SectionId } from '../data/books'
import { CONTEXT } from '../data/context'
import { sectionColors } from '../lib/sectionColors'
import { GlobeIcon } from './icons'

interface ContextCardProps {
  slug: string
  section: SectionId
}

/**
 * "The context": a white card with a thick section-colored left border (not a tinted
 * background, so it reads distinctly from InsightCard's "Worth noticing").
 */
export function ContextCard({ slug, section }: ContextCardProps) {
  const text = CONTEXT[slug]
  if (!text) return null

  const colors = sectionColors(section)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <h2 className="font-heading text-lg font-semibold text-ink">The context</h2>
        <p className="text-sm text-muted">
          When it was written, who first heard it, and what was going on in their world.
        </p>
      </div>
      <div className={`flex items-start gap-3 rounded-card border-l-4 ${colors.borderSolid} bg-white p-4`}>
        <GlobeIcon className={`mt-0.5 h-5 w-5 shrink-0 ${colors.text}`} />
        <p className="text-[16px] leading-relaxed text-ink sm:text-[17px]">{text}</p>
      </div>
    </div>
  )
}
