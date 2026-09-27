import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpenIcon } from '../components/icons'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found · Bible Study Guide'
  }, [])

  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-ink/10 bg-white px-6 py-16 text-center">
      <BookOpenIcon className="h-10 w-10 text-gospels-deep" />
      <h1 className="font-heading text-2xl font-semibold text-ink">We couldn't find that page</h1>
      <p className="text-[15px] text-muted">It may have been moved, or the link might be off. Let's get you back to the books.</p>
      <Link to="/" className="mt-1 inline-flex min-h-[44px] items-center rounded-full bg-gospels-soft px-5 text-sm font-semibold text-gospels-deep">
        Go to all books
      </Link>
    </div>
  )
}
