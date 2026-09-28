// Looks up a resolved image (file + credit) for a person or place slug.
// The images.json map is produced by a separate script/agent; this app only reads it.
import images from '../data/images.json'

export interface ImageEntry {
  file: string
  title: string
  author: string
  license: string
  source: string
}

const IMAGES = images as Record<string, ImageEntry>

export function getImage(slug: string): ImageEntry | undefined {
  return IMAGES[slug]
}
