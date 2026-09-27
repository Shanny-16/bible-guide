interface ProgressBarProps {
  readCount: number
  total: number
}

/** Hidden until the reader has marked at least one book as read. */
export function ProgressBar({ readCount, total }: ProgressBarProps) {
  if (readCount <= 0) return null

  const percent = Math.round((readCount / total) * 100)

  return (
    <div className="rounded-card border border-minor-deep/20 bg-white px-4 py-3">
      <p className="text-sm font-semibold text-ink">
        You've marked {readCount} of {total} books as read
      </p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-minor-soft" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-minor-deep transition-[width]" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
