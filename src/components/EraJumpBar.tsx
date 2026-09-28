interface EraLike {
  id: string
  name: string
}

interface EraJumpBarProps {
  eras: EraLike[]
}

/** A sticky row of chips that jump-scroll to each era's section further down the page. */
export function EraJumpBar({ eras }: EraJumpBarProps) {
  return (
    <div className="sticky top-0 z-10 -mx-4 flex gap-1.5 overflow-x-auto bg-cream/95 px-4 py-2 scrollbar-none sm:-mx-6 sm:px-6">
      {eras.map((era) => (
        <a
          key={era.id}
          href={`#era-${era.id}`}
          className="flex min-h-[36px] shrink-0 items-center rounded-full border border-ink/15 bg-white px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-cream"
        >
          {era.name}
        </a>
      ))}
    </div>
  )
}
