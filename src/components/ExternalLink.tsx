import type { ReactNode } from 'react'
import { ExternalIcon } from './icons'

interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
  /** Set to false for link-styled-as-button uses that shouldn't be underlined. Defaults to true. */
  underline?: boolean
}

/** An outbound link: always opens in a new tab, always shows a small ↗ mark. */
export function ExternalLink({ href, children, className, underline = true }: ExternalLinkProps) {
  const underlineClasses = underline ? 'underline decoration-1 underline-offset-2 hover:decoration-2 ' : ''
  return (
    <a href={href} target="_blank" rel="noopener" className={`inline-flex items-center gap-1.5 ${underlineClasses}${className ?? ''}`}>
      <span>{children}</span>
      <ExternalIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
    </a>
  )
}
