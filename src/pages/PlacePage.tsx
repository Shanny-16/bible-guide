import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PLACES, PLACE_ERAS, placeBySlug } from '../data/places'
import { useVersion } from '../lib/storage'
import { BibleMap } from '../components/BibleMap'
import { BookChip } from '../components/BookChip'
import { Figure } from '../components/Figure'
import { PassageChip } from '../components/PassageChip'
import { PassageSheet } from '../components/PassageSheet'
import { RelatedSection } from '../components/RelatedSection'
import { ArrowLeftIcon, ArrowRightIcon } from '../components/icons'
import { NotFoundPage } from './NotFoundPage'

export function PlacePage() {
  const { slug = '' } = useParams()
  const place = placeBySlug(slug.toLowerCase())
  const { version } = useVersion()
  const [openRef, setOpenRef] = useState<string | null>(null)

  useEffect(() => {
    document.title = place ? `${place.name} · Bible Notes` : 'Not found · Bible Notes'
  }, [place])

  if (!place) {
    return <NotFoundPage />
  }

  const era = PLACE_ERAS.find((e) => e.id === place.era)
  const index = PLACES.findIndex((p) => p.slug === place.slug)
  const prevPlace = index > 0 ? PLACES[index - 1] : undefined
  const nextPlace = index >= 0 && index < PLACES.length - 1 ? PLACES[index + 1] : undefined

  return (
    <div className="flex flex-col gap-6">
      <Link to="/places" className="inline-flex min-h-[44px] w-fit items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
        <ArrowLeftIcon className="h-4 w-4" />
        All places
      </Link>

      <div className="flex flex-col gap-2">
        {era && (
          <span className="inline-flex w-fit items-center rounded-full bg-major-soft px-3 py-1 text-sm font-semibold text-major-deep">
            {era.name}
          </span>
        )}
        <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">{place.name}</h1>
        <p className="text-sm text-muted">{place.today}</p>
        <p className="text-[15px] italic text-muted">{place.tagline}</p>
      </div>

      <Figure slug={place.slug} variant="detail" />

      <div className="rounded-card border border-ink/10 bg-white p-4">
        <p className="text-[17px] leading-relaxed text-ink">{place.summary}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-ink">Where it is</h2>
        <BibleMap highlight={place.slug} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-ink">Read about it</h2>
        <div className="flex flex-wrap gap-2">
          {place.passages.map((p) => (
            <PassageChip key={p.ref} label={p.label} reference={p.ref} onOpen={setOpenRef} />
          ))}
        </div>
        <p className="text-xs text-muted">Tap a passage to read it here.</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-ink">Books to open</h2>
        <div className="flex flex-wrap gap-1.5">
          {place.books.map((bookSlug) => (
            <BookChip key={bookSlug} slug={bookSlug} />
          ))}
        </div>
      </div>

      <RelatedSection slug={place.slug} />

      <div className="mt-2 flex items-stretch justify-between gap-3 border-t border-ink/10 pt-4">
        {prevPlace ? (
          <Link
            to={`/places/${prevPlace.slug}`}
            className="flex min-h-[44px] flex-1 flex-col items-start justify-center gap-0.5 rounded-card border border-ink/10 bg-white px-4 py-2 hover:bg-ink/5"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              <ArrowLeftIcon className="h-3.5 w-3.5" /> Previous
            </span>
            <span className="font-heading text-[15px] font-semibold text-ink">{prevPlace.name}</span>
          </Link>
        ) : (
          <span className="flex-1 rounded-card border border-ink/5 bg-cream px-4 py-2 text-sm text-muted/60" aria-hidden="true" />
        )}

        {nextPlace ? (
          <Link
            to={`/places/${nextPlace.slug}`}
            className="flex min-h-[44px] flex-1 flex-col items-end justify-center gap-0.5 rounded-card border border-ink/10 bg-white px-4 py-2 text-right hover:bg-ink/5"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              Next <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
            <span className="font-heading text-[15px] font-semibold text-ink">{nextPlace.name}</span>
          </Link>
        ) : (
          <span className="flex-1 rounded-card border border-ink/5 bg-cream px-4 py-2 text-sm text-muted/60" aria-hidden="true" />
        )}
      </div>

      <PassageSheet reference={openRef} onClose={() => setOpenRef(null)} version={version} />
    </div>
  )
}
