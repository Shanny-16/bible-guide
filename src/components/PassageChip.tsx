interface PassageChipProps {
  label: string
  reference: string
  /** Called with the full reference when tapped; the parent opens a PassageSheet. */
  onOpen: (reference: string) => void
}

/** A tappable chip that opens the passage in a PassageSheet, right on the page. */
export function PassageChip({ label, reference, onOpen }: PassageChipProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(reference)}
      className="inline-flex min-h-[44px] items-center rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-cream active:bg-cream"
    >
      {label}
    </button>
  )
}
