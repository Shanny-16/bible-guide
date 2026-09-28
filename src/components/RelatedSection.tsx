import { Link } from 'react-router-dom'
import { PEOPLE } from '../data/people'
import { PLACES } from '../data/places'
import { RELATIONS } from '../data/relations'

interface RelatedSectionProps {
  slug: string
}

/** "Related people and places" pills on a Person or Place detail page. Renders nothing if there are none. */
export function RelatedSection({ slug }: RelatedSectionProps) {
  const related = RELATIONS[slug]
  if (!related) return null

  const people = (related.people ?? [])
    .map((s) => PEOPLE.find((p) => p.slug === s))
    .filter((p): p is (typeof PEOPLE)[number] => Boolean(p))

  const places = (related.places ?? [])
    .map((s) => PLACES.find((p) => p.slug === s))
    .filter((p): p is (typeof PLACES)[number] => Boolean(p))

  if (people.length === 0 && places.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-heading text-lg font-semibold text-ink">Related people and places</h2>

      {people.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold text-muted">People:</span>
          {people.map((p) => (
            <Link
              key={p.slug}
              to={`/people/${p.slug}`}
              className="inline-flex min-h-[36px] items-center rounded-full bg-wisdom-soft px-3 py-1 text-sm font-semibold text-wisdom-deep transition-transform hover:-translate-y-0.5"
            >
              {p.name}
            </Link>
          ))}
        </div>
      )}

      {places.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold text-muted">Places:</span>
          {places.map((p) => (
            <Link
              key={p.slug}
              to={`/places/${p.slug}`}
              className="inline-flex min-h-[36px] items-center rounded-full bg-major-soft px-3 py-1 text-sm font-semibold text-major-deep transition-transform hover:-translate-y-0.5"
            >
              {p.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
