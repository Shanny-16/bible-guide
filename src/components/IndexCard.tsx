import { Link } from 'react-router-dom'
import { Figure } from './Figure'

interface IndexCardProps {
  to: string
  slug: string
  name: string
  tagline: string
  /** Extra muted line under the tagline, e.g. a place's modern-day location. */
  meta?: string
}

/** A card in the People/Places grid: image on top, name, tagline, optional meta line. Whole card links out. */
export function IndexCard({ to, slug, name, tagline, meta }: IndexCardProps) {
  return (
    <Link
      to={to}
      className="flex flex-col gap-2 rounded-card border border-ink/10 bg-white p-3 transition-transform hover:-translate-y-0.5 hover:shadow-sm"
    >
      <Figure slug={slug} variant="card" />
      <div>
        <h3 className="font-heading text-[17px] font-semibold leading-tight text-ink">{name}</h3>
        <p className="mt-0.5 text-sm text-muted">{tagline}</p>
        {meta && <p className="mt-0.5 text-xs text-muted">{meta}</p>}
      </div>
    </Link>
  )
}
