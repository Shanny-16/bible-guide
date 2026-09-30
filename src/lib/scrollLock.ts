// Reference-counted page scroll lock, shared by every modal (the passage sheet, the search panel).
// The page's original overflow/padding is saved once when the first lock is taken and restored only
// when the last one is released, so stacked dialogs can never leave the page stuck or unlocked.

let count = 0
let savedOverflow = ''
let savedPaddingRight = ''

export function lockScroll(): void {
  if (count === 0) {
    const body = document.body
    savedOverflow = body.style.overflow
    savedPaddingRight = body.style.paddingRight
    // Keep the layout from jumping sideways when the scrollbar disappears.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
  }
  count += 1
}

export function unlockScroll(): void {
  if (count === 0) return
  count -= 1
  if (count === 0) {
    const body = document.body
    body.style.overflow = savedOverflow
    body.style.paddingRight = savedPaddingRight
  }
}
