# Bible Study Guide — build spec (v1)

A small, fast, mobile-first reference web app for a church small group. It replaces a printed
"Pastel Bible Guide" (a table of all 66 books: date, authorship, study snapshot, key passages,
plus a storyline/timeline footer). The audience is ordinary adults on their phones, not developers.
It must feel calm, friendly and clear. No login, no database.

## Stack (already scaffolded — do not change)

- Vite 8 + React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`) + react-router-dom v7.
- `package.json`, `tsconfig*.json`, `vite.config.ts`, `vercel.json` exist. `npm install` has been run.
- Data lives in `src/data/books.ts`, `src/data/guide.ts`, `src/data/links.ts`. **Do not edit the
  wording of any book data.** Import and render it. (You may add helpers in new files.)
- Deployed later as a static site on Vercel (SPA rewrite already in `vercel.json`).
- Routing: `BrowserRouter`. Routes: `/` (Books), `/book/:slug`, `/storyline`, `/about`. Unknown
  route → friendly "not found" with a link home.

## Files to create

```
index.html                  # title, meta description, theme-color, Google Fonts link, manifest link
public/manifest.webmanifest # name, short_name, icons (SVG), theme/background colors, display: standalone
public/icon.svg             # simple pastel open-book mark (hand-drawn SVG, no external asset)
public/favicon.svg          # same mark
src/main.tsx
src/App.tsx                 # router + layout shell
src/index.css               # @import "tailwindcss"; @theme tokens; base styles
src/lib/storage.ts          # localStorage helpers (read-set, notes, version) with try/catch
src/lib/search.ts           # search/filter over BOOKS
src/components/*.tsx        # Header, SearchBar, TestamentToggle, SectionGroup, BookCard,
                            # PassageChip, ProgressBar, VersionPicker, Footer, ExternalLink, etc.
src/pages/BooksPage.tsx
src/pages/BookPage.tsx
src/pages/StorylinePage.tsx
src/pages/AboutPage.tsx
src/pages/NotFoundPage.tsx
```

## Visual design — "pastel study notebook"

Keep the identity of the printed pastel guide, but make it look like a well-designed app, not a
spreadsheet and not a generic AI template.

- **Background**: warm cream `#FBF8F2`. Ink (text): `#2A2833`. Muted text: `#6B6878`.
- **Section pastels** (used for section headers, card accents, pills). Each section gets a `soft`
  (background) and `deep` (text/border) pair:
  | section | soft | deep |
  |---|---|---|
  | law | `#FFF1BF` | `#8A6A00` |
  | history | `#FFDCC8` | `#9A4B1E` |
  | wisdom | `#E9DDFF` | `#5D3FA8` |
  | major | `#D6E8FF` | `#1F4E9A` |
  | minor | `#D3F2E3` | `#1E6B46` |
  | gospels | `#FFD9E4` | `#A02F55` |
  | acts | `#FFE4C4` | `#9A5A12` |
  | paul | `#DCE3FF` | `#3B4BA8` |
  | general | `#DDEFD6` | `#3C6B2A` |
  | apocalypse | `#EEDCF5` | `#6C2E8A` |
  Define these as CSS variables in `@theme` and expose a small helper `sectionColors(id)`.
- **Type**: headings in **Fraunces** (Google Fonts, weight 500-600, optical size auto), body in
  **Nunito** (400/600/700). Load both with `display=swap`. Base body size 17px on mobile.
- **Shape**: rounded cards (20px), soft 1px borders in the section `deep` color at ~25% opacity,
  very light shadow. No heavy drop shadows, no gradients-as-decoration, no glassmorphism.
- **Motion**: subtle only. Card hover lift on desktop; page transitions none. Respect
  `prefers-reduced-motion`.
- Everything must be tappable with a thumb: minimum 44px targets, 16px side gutters, no horizontal
  page scroll at 360px width.
- Dark mode: not required in v1 (light only), but do not hard-code white; use tokens.

## Pages

### `/` Books (home)
1. Header: app name **"Bible Study Guide"** (small tagline: "A quick reference for our small group"),
   nav links: Books · Storyline · About. Compact on mobile (nav as a bottom-of-header row or a
   simple bottom tab bar — your call, keep it simple).
2. **Progress strip**: "You've marked N of 66 books as read" with a thin pastel progress bar.
   Hidden until N > 0.
3. **Search** (sticky under header on scroll): one input, placeholder "Search a book, person or
   theme… e.g. Ruth, Elijah, covenant". Filters by book name, snapshot, authorship. Matching is
   case-insensitive substring across those fields; also match "song of solomon" → Song of Songs.
   Show "No books match" state with a clear-search button.
4. **Testament toggle**: segmented control All · Old Testament · New Testament.
5. **Section groups**: for each section (in order) show a header band tinted with the section's
   soft color: section name, count (e.g. "5 books"), blurb. Below, a responsive grid of
   **BookCards** (1 col at <400px, 2 cols on phones, 3-4 on desktop). Card shows: number badge,
   name, snapshot (2 lines, clamped), a tiny date line, and a check mark if marked read.
   Whole card is a link to `/book/:slug`.
6. Footer: "Sources: Bible Gateway · BibleProject · Enduring Word" + "Made with love for our
   small group".

### `/book/:slug` Book detail
- Top: "← All books" link, section pill (tinted), **book name** (large Fraunces), line
  "Book N of 66 · X chapters · Old/New Testament".
- Row of two buttons: **Mark as read** (toggle, filled when read) and **Read on Bible Gateway**
  (opens `readBookUrl(book, version)` in a new tab).
- Three info cards with small labels: **When was it written?** (date), **Who wrote it?**
  (authorship), **What is it about?** (snapshot). Section-tinted left border.
- **Key passages**: chips, each a link (new tab) to `passageUrl(p.ref, version)`; chip text is
  `p.label`; a small helper line "Tap a passage to read it (opens Bible Gateway)".
- **Go deeper** list:
  - BibleProject overview video(s) from `bibleProjectVideos(book)` — one row per video, label
    "Watch: <label> overview (BibleProject)".
  - "Chapter-by-chapter commentary (Enduring Word)" → `enduringWordUrl(book, 1)`.
  All external links: `target="_blank" rel="noopener"`, with a small ↗ icon.
- **My notes**: a textarea saved to localStorage per book, with the caption "Saved only on this
  device". Autosave on change (debounced), no buttons.
- Bottom: Previous / Next book links (by number, wrapping 66 → 1 disabled instead of wrapping).
- Document title should become "<Book> · Bible Study Guide".

### `/storyline` Storyline & timeline
- Intro sentence: `KEY_STORYLINE_SENTENCE`.
- **The Bible's storyline**: the 12 `STORYLINE` steps as a vertical path on mobile (dots connected
  by a line) and a horizontal wrapping path on desktop. Each step: label, hint, small chips for its
  books linking to `/book/:slug`.
- **Timeline anchors**: `TIMELINE_ANCHORS` as a clean two-column list (date · what), tinted by
  BC/AD.
- **Major covenants**: `COVENANTS` cards; refs as passage chips (Bible Gateway links).
- **Prophets in their setting**: `PROPHETS_IN_SETTING` groups with book chips; then `PROPHETS_TIP`
  as a callout.
- **New Testament study connections**: `NT_CONNECTIONS` as a friendly bulleted list.

### `/about`
- What this is (the printed guide moved online, for the group).
- How to read the dates and authorship lines: "Trad." = traditional attribution; "debated" means
  scholars disagree; "c." = circa/approximately. The guide summarises both traditional and
  scholarly views without taking sides.
- Bible version picker (`BIBLE_VERSIONS`) — saved in localStorage; also surface it as a compact
  select in the book page next to the "Read" button.
- Sources with links: Bible Gateway (biblegateway.com), BibleProject (bibleproject.com),
  Enduring Word (enduringword.com).
- "Reset my progress and notes" button with a confirm().

## Storage (`src/lib/storage.ts`)
- Keys: `bg.read` (array of slugs), `bg.notes.<slug>` (string), `bg.version` (VersionCode).
- Wrap every localStorage call in try/catch; the app must render fine if storage is unavailable.
- Provide small React hooks: `useReadBooks()`, `useNote(slug)`, `useVersion()`.

## Quality bar
- `npm run build` must pass with zero TypeScript errors (`noUnusedLocals` is on).
- No console errors in the browser.
- Lighthouse-style hygiene: semantic headings, labelled inputs, alt text, focus styles visible,
  color contrast ≥ 4.5:1 for body text on pastel backgrounds (use the `deep` colors for text on
  `soft` backgrounds, never mid-tone on pastel).
- No external JS libraries beyond those in package.json. No icon library — inline a few tiny SVGs.
- Keep components small and readable; a non-developer owner may skim this code later.

## Out of scope for v1
Accounts, shared/group notes, dark mode, Spanish UI translation, reading plans. Leave clean seams
(data-driven, storage behind hooks) so these can come later.
