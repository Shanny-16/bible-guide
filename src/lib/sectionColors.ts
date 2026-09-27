// Tailwind class names for each section's pastel pair, plus the raw hex values
// (for the rare spot where an inline style is easier than a utility class).
// Class names are written out in full here so Tailwind's scanner can find them.
import type { SectionId } from '../data/books'

export interface SectionClasses {
  hexSoft: string
  hexDeep: string
  bg: string
  text: string
  border: string
  borderSolid: string
  borderSoft: string
  ring: string
}

const MAP: Record<SectionId, SectionClasses> = {
  law: {
    hexSoft: '#FFF1BF',
    hexDeep: '#8A6A00',
    bg: 'bg-law-soft',
    text: 'text-law-deep',
    border: 'border-law-deep/25',
    borderSolid: 'border-law-deep',
    borderSoft: 'border-law-deep/10',
    ring: 'ring-law-deep/25',
  },
  history: {
    hexSoft: '#FFDCC8',
    hexDeep: '#9A4B1E',
    bg: 'bg-history-soft',
    text: 'text-history-deep',
    border: 'border-history-deep/25',
    borderSolid: 'border-history-deep',
    borderSoft: 'border-history-deep/10',
    ring: 'ring-history-deep/25',
  },
  wisdom: {
    hexSoft: '#E9DDFF',
    hexDeep: '#5D3FA8',
    bg: 'bg-wisdom-soft',
    text: 'text-wisdom-deep',
    border: 'border-wisdom-deep/25',
    borderSolid: 'border-wisdom-deep',
    borderSoft: 'border-wisdom-deep/10',
    ring: 'ring-wisdom-deep/25',
  },
  major: {
    hexSoft: '#D6E8FF',
    hexDeep: '#1F4E9A',
    bg: 'bg-major-soft',
    text: 'text-major-deep',
    border: 'border-major-deep/25',
    borderSolid: 'border-major-deep',
    borderSoft: 'border-major-deep/10',
    ring: 'ring-major-deep/25',
  },
  minor: {
    hexSoft: '#D3F2E3',
    hexDeep: '#1E6B46',
    bg: 'bg-minor-soft',
    text: 'text-minor-deep',
    border: 'border-minor-deep/25',
    borderSolid: 'border-minor-deep',
    borderSoft: 'border-minor-deep/10',
    ring: 'ring-minor-deep/25',
  },
  gospels: {
    hexSoft: '#FFD9E4',
    hexDeep: '#A02F55',
    bg: 'bg-gospels-soft',
    text: 'text-gospels-deep',
    border: 'border-gospels-deep/25',
    borderSolid: 'border-gospels-deep',
    borderSoft: 'border-gospels-deep/10',
    ring: 'ring-gospels-deep/25',
  },
  acts: {
    hexSoft: '#FFE4C4',
    hexDeep: '#9A5A12',
    bg: 'bg-acts-soft',
    text: 'text-acts-deep',
    border: 'border-acts-deep/25',
    borderSolid: 'border-acts-deep',
    borderSoft: 'border-acts-deep/10',
    ring: 'ring-acts-deep/25',
  },
  paul: {
    hexSoft: '#DCE3FF',
    hexDeep: '#3B4BA8',
    bg: 'bg-paul-soft',
    text: 'text-paul-deep',
    border: 'border-paul-deep/25',
    borderSolid: 'border-paul-deep',
    borderSoft: 'border-paul-deep/10',
    ring: 'ring-paul-deep/25',
  },
  general: {
    hexSoft: '#DDEFD6',
    hexDeep: '#3C6B2A',
    bg: 'bg-general-soft',
    text: 'text-general-deep',
    border: 'border-general-deep/25',
    borderSolid: 'border-general-deep',
    borderSoft: 'border-general-deep/10',
    ring: 'ring-general-deep/25',
  },
  apocalypse: {
    hexSoft: '#EEDCF5',
    hexDeep: '#6C2E8A',
    bg: 'bg-apocalypse-soft',
    text: 'text-apocalypse-deep',
    border: 'border-apocalypse-deep/25',
    borderSolid: 'border-apocalypse-deep',
    borderSoft: 'border-apocalypse-deep/10',
    ring: 'ring-apocalypse-deep/25',
  },
}

export function sectionColors(id: SectionId): SectionClasses {
  return MAP[id]
}
