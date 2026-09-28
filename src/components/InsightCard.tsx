import type { SectionId } from '../data/books'
import { INSIGHTS } from '../data/insights'
import { sectionColors } from '../lib/sectionColors'
import { BookOpenIcon } from './icons'

interface InsightCardProps {
  slug: string
  section: SectionId
}

/** "Worth noticing": a short interesting paragraph, tinted with the book's section color. */
export function InsightCard({ slug, section }: InsightCardProps) {
  const text = INSIGHTS[slug]
  if (!text) return null

  const colors = sectionColors(section)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-heading text-lg font-semibold text-ink">Worth noticing</h2>
      <div className={`flex items-start gap-3 rounded-card border ${colors.border} ${colors.bg} p-4`}>
        <BookOpenIcon className={`mt-0.5 h-5 w-5 shrink-0 ${colors.text}`} />
        <p className={`text-[16px] leading-relaxed ${colors.text}`}>{text}</p>
      </div>
    </div>
  )
}
