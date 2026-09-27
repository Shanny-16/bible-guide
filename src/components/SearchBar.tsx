import { SearchIcon, CloseIcon } from './icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="book-search" className="sr-only">
        Search a book, person or theme
      </label>
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <input
        id="book-search"
        type="text"
        inputMode="search"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a book, person or theme… e.g. Ruth, Elijah, covenant"
        className="h-12 w-full rounded-full border border-ink/15 bg-white pl-11 pr-11 text-base text-ink placeholder:text-muted focus-visible:border-major-deep"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
