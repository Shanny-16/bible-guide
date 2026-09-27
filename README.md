# Bible Study Guide

A small, phone-friendly reference site for a church small group. It is the online version of
Sharon's printed "Pastel Bible Guide": all 66 books with date, authorship, a study snapshot and
key passages, plus the Bible storyline, timeline anchors, major covenants and study tips.

- No accounts and no database. "Mark as read" and personal notes are saved only in the reader's
  own browser.
- Every key passage links to Bible Gateway (version picker: NIV, ESV, NLT, NKJV, NVI, RVR1960).
- Each book links to its BibleProject overview video and Enduring Word chapter commentary.

## Editing the content

All wording lives in three files and nothing else needs to change when you edit them:

- `src/data/books.ts` - the 66 books (date, authorship, snapshot, key passages)
- `src/data/guide.ts` - storyline, timeline, covenants, prophets, NT connections
- `src/data/links.ts` - Bible versions and the outbound link patterns

## Running it locally

```
npm install
npm run dev
```

## Deploying

Static site. `npm run build` outputs `dist/`. `vercel.json` contains the single-page-app rewrite
so deep links like `/book/psalms` work on Vercel.

Tech: Vite, React, TypeScript, Tailwind v4, react-router. Spec: `BUILD_SPEC.md`.
