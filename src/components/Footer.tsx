import { ExternalLink } from './ExternalLink'

export function Footer() {
  return (
    <footer className="mt-12 border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-4xl px-4 py-6 text-sm text-muted sm:px-6">
        <p>
          Sources:{' '}
          <ExternalLink href="https://www.biblegateway.com" className="text-muted">
            Bible Gateway
          </ExternalLink>{' '}
          ·{' '}
          <ExternalLink href="https://bibleproject.com" className="text-muted">
            BibleProject
          </ExternalLink>{' '}
          ·{' '}
          <ExternalLink href="https://enduringword.com" className="text-muted">
            Enduring Word
          </ExternalLink>
        </p>
        <p className="mt-1">Made with love for our small group.</p>
      </div>
    </footer>
  )
}
