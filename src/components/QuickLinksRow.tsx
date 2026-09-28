import { Link } from 'react-router-dom'
import { BookOpenIcon, GlobeIcon } from './icons'

/** Small "People" / "Places" quick links shown on the Books home page. Subtle — Books stays the main content. */
export function QuickLinksRow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Link
        to="/people"
        className="flex items-center gap-3 rounded-card border border-wisdom-deep/20 bg-wisdom-soft px-4 py-3 transition-transform hover:-translate-y-0.5"
      >
        <BookOpenIcon className="h-6 w-6 shrink-0 text-wisdom-deep" />
        <div>
          <p className="font-heading text-[15px] font-semibold text-wisdom-deep">People</p>
          <p className="text-xs text-wisdom-deep/80">Meet the Bible's main figures</p>
        </div>
      </Link>
      <Link
        to="/places"
        className="flex items-center gap-3 rounded-card border border-major-deep/20 bg-major-soft px-4 py-3 transition-transform hover:-translate-y-0.5"
      >
        <GlobeIcon className="h-6 w-6 shrink-0 text-major-deep" />
        <div>
          <p className="font-heading text-[15px] font-semibold text-major-deep">Places</p>
          <p className="text-xs text-major-deep/80">See where the story happened</p>
        </div>
      </Link>
    </div>
  )
}
