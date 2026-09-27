// localStorage helpers + small React hooks for read-progress, per-book notes,
// and the preferred Bible version. Every localStorage call is wrapped in
// try/catch so the app renders fine even when storage is unavailable
// (private browsing, locked-down devices, etc).
import { useCallback, useEffect, useState } from 'react'
import type { VersionCode } from '../data/links'
import { DEFAULT_VERSION } from '../data/links'

const READ_KEY = 'bg.read'
const VERSION_KEY = 'bg.version'
const NOTE_PREFIX = 'bg.notes.'
const noteKey = (slug: string) => `${NOTE_PREFIX}${slug}`

// Fired whenever this tab changes storage, so every hook instance stays in sync.
const CHANGE_EVENT = 'bg:storage-change'

function notifyChange(): void {
  try {
    window.dispatchEvent(new Event(CHANGE_EVENT))
  } catch {
    // no-op: window/events unavailable
  }
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // storage full or unavailable: fail silently, app still works
  }
}

function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // no-op
  }
}

function readReadList(): string[] {
  const raw = safeGet(READ_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

function writeReadList(slugs: string[]): void {
  safeSet(READ_KEY, JSON.stringify(slugs))
  notifyChange()
}

export function getReadBooks(): string[] {
  return readReadList()
}

export function setBookRead(slug: string, read: boolean): void {
  const current = new Set(readReadList())
  if (read) current.add(slug)
  else current.delete(slug)
  writeReadList(Array.from(current))
}

/** Read-progress hook: current list, a lookup and a toggle. */
export function useReadBooks() {
  const [readBooks, setReadBooks] = useState<string[]>(() => readReadList())

  useEffect(() => {
    const sync = () => setReadBooks(readReadList())
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const isRead = useCallback((slug: string) => readBooks.includes(slug), [readBooks])

  const toggleRead = useCallback((slug: string) => {
    setBookRead(slug, !readReadList().includes(slug))
  }, [])

  return { readBooks, isRead, toggleRead }
}

/** Per-book notes hook, saved as plain text under `bg.notes.<slug>`. */
export function useNote(slug: string) {
  const key = noteKey(slug)
  const [note, setNoteState] = useState<string>(() => safeGet(key) ?? '')

  useEffect(() => {
    setNoteState(safeGet(key) ?? '')
  }, [key])

  const setNote = useCallback(
    (value: string) => {
      setNoteState(value)
      safeSet(key, value)
    },
    [key],
  )

  return { note, setNote }
}

/** Preferred Bible version, shared between the About page and book pages. */
export function useVersion() {
  const [version, setVersionState] = useState<VersionCode>(() => (safeGet(VERSION_KEY) as VersionCode) || DEFAULT_VERSION)

  useEffect(() => {
    const sync = () => setVersionState((safeGet(VERSION_KEY) as VersionCode) || DEFAULT_VERSION)
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const setVersion = useCallback((value: VersionCode) => {
    setVersionState(value)
    safeSet(VERSION_KEY, value)
    notifyChange()
  }, [])

  return { version, setVersion }
}

/** Clears read-progress and every saved note. Used by the About page's reset button. */
export function resetAllProgress(): void {
  safeRemove(READ_KEY)
  try {
    const toRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(NOTE_PREFIX)) toRemove.push(k)
    }
    toRemove.forEach(safeRemove)
  } catch {
    // no-op
  }
  notifyChange()
}
