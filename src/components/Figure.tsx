import { getImage } from '../lib/images'
import { BookOpenIcon } from './icons'

interface FigureProps {
  slug: string
  /** "card" = 4:3 (grid cards), "detail" = 3:2 (detail page hero). */
  variant?: 'card' | 'detail'
  /** Shown as the credit line's leading label ("Image: ..."); falls back to the image's own title. */
  className?: string
}

/**
 * A fixed-aspect-ratio image box so layout never jumps whether or not an image has resolved yet.
 * Shows a cream placeholder with a small book icon when there is no image for this slug.
 */
/** images.json's `file` may be a bare filename ("people/david.jpg") or already rooted ("/img/people/david.jpg"). */
export function imageSrc(file: string): string {
  if (/^https?:\/\//.test(file)) return file
  const trimmed = file.replace(/^\/+/, '')
  return trimmed.startsWith('img/') ? `/${trimmed}` : `/img/${trimmed}`
}

export function Figure({ slug, variant = 'card', className }: FigureProps) {
  const image = getImage(slug)
  const aspect = variant === 'detail' ? 'aspect-[3/2]' : 'aspect-[4/3]'

  return (
    <div className={className}>
      <div className={`${aspect} w-full overflow-hidden rounded-card border border-ink/10 bg-cream`}>
        {image ? (
          <img
            src={imageSrc(image.file)}
            alt={image.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpenIcon className="h-8 w-8 text-ink/20" />
          </div>
        )}
      </div>
      {variant === 'detail' && image && (
        <p className="mt-1.5 truncate text-xs text-muted">
          Image:{' '}
          <a href={image.source} target="_blank" rel="noopener" className="underline decoration-1 underline-offset-2 hover:decoration-2">
            {image.title} · {image.author} · {image.license}
          </a>
        </p>
      )}
    </div>
  )
}
