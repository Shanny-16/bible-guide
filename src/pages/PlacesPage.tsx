import { useEffect } from 'react'
import { PLACES, PLACE_ERAS } from '../data/places'
import { BibleMap } from '../components/BibleMap'
import { EraJumpBar } from '../components/EraJumpBar'
import { IndexCard } from '../components/IndexCard'

export function PlacesPage() {
  useEffect(() => {
    document.title = 'Places of the Bible · Bible Notes'
  }, [])

  const erasWithPlaces = PLACE_ERAS.map((era) => ({ era, places: PLACES.filter((p) => p.era === era.id) })).filter(
    (g) => g.places.length > 0,
  )

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Places of the Bible</h1>
        <p className="mt-1 text-[15px] text-muted">Where the story happened, in the order it happened.</p>
      </div>

      <div>
        <BibleMap interactive />
        <p className="mt-1.5 text-center text-xs text-muted">Tap a dot to open that place.</p>
      </div>

      <EraJumpBar eras={PLACE_ERAS} />

      <div className="flex flex-col gap-8">
        {erasWithPlaces.map(({ era, places }) => (
          <section key={era.id} id={`era-${era.id}`} className="scroll-mt-16">
            <div className="rounded-card border border-major-deep/20 bg-major-soft px-4 py-3">
              <h2 className="font-heading text-lg font-semibold text-major-deep">{era.name}</h2>
              <p className="text-sm text-major-deep/80">{era.dates}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {places.map((place) => (
                <IndexCard
                  key={place.slug}
                  to={`/places/${place.slug}`}
                  slug={place.slug}
                  name={place.name}
                  tagline={place.tagline}
                  meta={place.today}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
