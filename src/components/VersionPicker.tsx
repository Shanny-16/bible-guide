import { BIBLE_VERSIONS } from '../data/links'
import type { VersionCode } from '../data/links'

interface VersionPickerProps {
  value: VersionCode
  onChange: (value: VersionCode) => void
  compact?: boolean
  id?: string
}

export function VersionPicker({ value, onChange, compact = false, id = 'bible-version' }: VersionPickerProps) {
  return (
    <div className={compact ? 'inline-flex flex-col' : 'flex flex-col gap-1.5'}>
      <label htmlFor={id} className={compact ? 'sr-only' : 'text-sm font-semibold text-ink'}>
        Bible version
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as VersionCode)}
        className={`rounded-full border border-ink/15 bg-white text-ink ${compact ? 'h-11 px-3 text-sm' : 'h-12 px-4 text-base'}`}
      >
        {BIBLE_VERSIONS.map((v) => (
          <option key={v.code} value={v.code}>
            {compact ? v.code : v.label}
          </option>
        ))}
      </select>
    </div>
  )
}
