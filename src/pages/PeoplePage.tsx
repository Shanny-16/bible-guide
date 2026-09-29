import { useEffect } from 'react'
import { PEOPLE, PEOPLE_ERAS } from '../data/people'
import { EraJumpBar } from '../components/EraJumpBar'
import { IndexCard } from '../components/IndexCard'

export function PeoplePage() {
  useEffect(() => {
    document.title = 'People of the Bible · Bible Notes'
  }, [])

  const erasWithPeople = PEOPLE_ERAS.map((era) => ({ era, people: PEOPLE.filter((p) => p.era === era.id) })).filter(
    (g) => g.people.length > 0,
  )

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">People of the Bible</h1>
        <p className="mt-1 text-[15px] text-muted">The main figures in the order they appear, from Adam to the early church.</p>
      </div>

      <EraJumpBar eras={PEOPLE_ERAS} />

      <div className="flex flex-col gap-8">
        {erasWithPeople.map(({ era, people }) => (
          <section key={era.id} id={`era-${era.id}`} className="scroll-mt-28">
            <div className="rounded-card border border-wisdom-deep/20 bg-wisdom-soft px-4 py-3">
              <h2 className="font-heading text-lg font-semibold text-wisdom-deep">{era.name}</h2>
              <p className="text-sm text-wisdom-deep/80">{era.dates}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {people.map((person) => (
                <IndexCard key={person.slug} to={`/people/${person.slug}`} slug={person.slug} name={person.name} tagline={person.tagline} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
