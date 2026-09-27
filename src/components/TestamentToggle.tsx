export type TestamentFilter = 'ALL' | 'OT' | 'NT'

interface TestamentToggleProps {
  value: TestamentFilter
  onChange: (value: TestamentFilter) => void
}

const OPTIONS: Array<{ value: TestamentFilter; label: string }> = [
  { value: 'ALL', label: 'All' },
  { value: 'OT', label: 'Old Testament' },
  { value: 'NT', label: 'New Testament' },
]

export function TestamentToggle({ value, onChange }: TestamentToggleProps) {
  return (
    <div role="radiogroup" aria-label="Filter by testament" className="flex rounded-full border border-ink/15 bg-white p-1">
      {OPTIONS.map((opt) => {
        const isActive = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt.value)}
            className={`min-h-[38px] flex-1 rounded-full px-3 text-sm font-semibold transition-colors ${
              isActive ? 'bg-major-soft text-major-deep' : 'text-muted hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
