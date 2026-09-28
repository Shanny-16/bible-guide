import { useEffect, useState } from 'react'
import {
  COVENANTS,
  KEY_STORYLINE_SENTENCE,
  NT_CONNECTIONS,
  PROPHETS_IN_SETTING,
  PROPHETS_TIP,
  STORYLINE,
  TIMELINE_ANCHORS,
} from '../data/guide'
import { useVersion } from '../lib/storage'
import { PassageChip } from '../components/PassageChip'
import { PassageSheet } from '../components/PassageSheet'
import { BookChip } from '../components/BookChip'

function isBc(when: string): boolean {
  return /\bBC\b/.test(when)
}

export function StorylinePage() {
  const { version } = useVersion()
  const [openRef, setOpenRef] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Storyline & timeline · Bible Notes'
  }, [])

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-card border border-major-deep/20 bg-major-soft px-5 py-5">
        <h1 className="font-heading text-2xl font-semibold text-major-deep">The Bible's storyline</h1>
        <p className="mt-1.5 text-[15px] font-semibold text-major-deep">{KEY_STORYLINE_SENTENCE}</p>
      </section>

      <section className="flex flex-col gap-4">
        <ol className="flex flex-col gap-0 md:flex-row md:flex-wrap md:gap-4">
          {STORYLINE.map((step, i) => (
            <li key={step.label} className="relative flex gap-3 pb-6 md:w-[calc(50%-0.5rem)] md:pb-0 lg:w-[calc(33.333%-0.7rem)]">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gospels-soft text-xs font-bold text-gospels-deep">
                  {i + 1}
                </span>
                {i < STORYLINE.length - 1 && <span className="mt-1 w-px flex-1 bg-ink/15 md:hidden" aria-hidden="true" />}
              </div>
              <div className="flex flex-1 flex-col gap-1.5 rounded-card border border-ink/10 bg-white p-3.5 md:h-full">
                <h3 className="font-heading text-base font-semibold text-ink">{step.label}</h3>
                <p className="text-sm text-muted">{step.hint}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {step.books.map((slug) => (
                    <BookChip key={slug} slug={slug} />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold text-ink">Timeline anchors</h2>
        <ul className="flex flex-col gap-2">
          {TIMELINE_ANCHORS.map((anchor) => {
            const bc = isBc(anchor.when)
            return (
              <li
                key={anchor.when}
                className={`flex flex-col gap-0.5 rounded-card border px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 ${
                  bc ? 'border-history-deep/20 bg-history-soft/60' : 'border-major-deep/20 bg-major-soft/60'
                }`}
              >
                <span className={`font-heading font-semibold sm:w-40 sm:shrink-0 ${bc ? 'text-history-deep' : 'text-major-deep'}`}>
                  {anchor.when}
                </span>
                <span className="text-[15px] text-ink">{anchor.what}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold text-ink">Major covenants</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {COVENANTS.map((c) => (
            <div key={c.name} className="rounded-card border border-wisdom-deep/25 bg-white p-4">
              <h3 className="font-heading text-base font-semibold text-wisdom-deep">{c.name}</h3>
              <p className="mt-1 text-sm text-ink">{c.summary}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {c.refs.map((ref) => (
                  <PassageChip key={ref} label={ref} reference={ref} onOpen={setOpenRef} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold text-ink">Prophets in their setting</h2>
        <div className="flex flex-col gap-3">
          {PROPHETS_IN_SETTING.map((group) => (
            <div key={group.setting} className="rounded-card border border-minor-deep/20 bg-white p-4">
              <h3 className="font-heading text-base font-semibold text-minor-deep">{group.setting}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {group.books.map((slug) => (
                  <BookChip key={slug} slug={slug} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="rounded-card border border-acts-deep/25 bg-acts-soft px-4 py-3 text-sm font-medium text-acts-deep">{PROPHETS_TIP}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold text-ink">New Testament study connections</h2>
        <ul className="flex flex-col gap-2">
          {NT_CONNECTIONS.map((line) => (
            <li key={line} className="flex gap-2.5 rounded-card border border-paul-deep/20 bg-white px-4 py-3 text-[15px] text-ink">
              <span className="mt-0.5 text-paul-deep">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <PassageSheet reference={openRef} onClose={() => setOpenRef(null)} version={version} />
    </div>
  )
}
