import type { VersionCode } from '../data/links'
import { passageUrl } from '../data/links'

interface PassageChipProps {
  label: string
  reference: string
  version: VersionCode
}

/** A tappable chip linking a reference straight to Bible Gateway. */
export function PassageChip({ label, reference, version }: PassageChipProps) {
  return (
    <a
      href={passageUrl(reference, version)}
      target="_blank"
      rel="noopener"
      className="inline-flex min-h-[38px] items-center rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-cream active:bg-cream"
    >
      {label}
    </a>
  )
}
