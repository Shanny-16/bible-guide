import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  failed: boolean
}

/** Last-resort safety net: shows a friendly page instead of a blank screen if something throws while rendering. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  private reload = () => {
    window.location.reload()
  }

  private clearAndReload = () => {
    try {
      const keys: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith('bg.')) keys.push(k)
      }
      keys.forEach((k) => localStorage.removeItem(k))
    } catch {
      /* storage unavailable */
    }
    window.location.reload()
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-2xl font-semibold text-ink">Something went wrong</h1>
        <p className="text-[15px] text-ink">
          Please reload the page. If it keeps happening, clearing this site&apos;s saved data usually fixes it.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={this.reload}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-cream"
          >
            Reload
          </button>
          <button
            type="button"
            onClick={this.clearAndReload}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-ink/15 bg-white px-5 text-sm font-semibold text-ink"
          >
            Clear saved data and reload
          </button>
        </div>
      </div>
    )
  }
}
