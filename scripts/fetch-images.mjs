// Fetches public-domain / freely-licensed images from Wikimedia Commons for every person and place
// in src/data/people.ts and src/data/places.ts, using the `image` search hint on each entry.
// Plain Node (>=18, global fetch), no dependencies. Run with: node scripts/fetch-images.mjs
//
// Writes:
//   public/img/people/<slug>.jpg|png
//   public/img/places/<slug>.jpg|png
//   src/data/images.json         { slug: { file, title, author, license, source } }
//   public/img/contact-sheet.html  (not linked from the app; for human review)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const UA = 'BibleNotesImageFetcher/1.0 (biblenotes.live; contact sharon.unik@gmail.com)'
const API = 'https://commons.wikimedia.org/w/api.php'
const SLEEP_MS = 500

const ACCEPTABLE_LICENSE_RE = /^(public domain|pd-|cc0|cc by\b|cc by-sa\b|no known copyright restrictions)/i

/** @param {number} ms */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function truncate(str, max) {
  if (!str) return str
  return str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str
}

async function apiGet(params) {
  const url = new URL(API)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`API ${res.status} for ${url}`)
  return res.json()
}

async function searchCommons(query) {
  const data = await apiGet({
    action: 'query',
    list: 'search',
    srnamespace: '6',
    srlimit: '10',
    format: 'json',
    srsearch: `${query} filetype:bitmap`,
  })
  return (data?.query?.search ?? []).map((r) => r.title)
}

async function getImageInfo(titles, urlWidth = 1000) {
  if (titles.length === 0) return {}
  const data = await apiGet({
    action: 'query',
    titles: titles.join('|'),
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: String(urlWidth),
    format: 'json',
  })
  const pages = data?.query?.pages ?? {}
  /** @type {Record<string, any>} */
  const out = {}
  for (const page of Object.values(pages)) {
    const p = /** @type {any} */ (page)
    if (p.missing !== undefined) continue
    const info = p.imageinfo?.[0]
    if (!info) continue
    out[p.title] = info
  }
  return out
}

function licenseOf(info) {
  return info?.extmetadata?.LicenseShortName?.value ?? ''
}

function isAcceptable(info) {
  if (!info) return false
  const mime = info.mime ?? ''
  if (mime !== 'image/jpeg' && mime !== 'image/png') return false
  const width = info.thumbwidth ?? info.width ?? 0
  if (width < 600) return false
  const license = licenseOf(info)
  if (!ACCEPTABLE_LICENSE_RE.test(license.trim())) return false
  return true
}

/**
 * Try a list of search queries in order; for each, fetch imageinfo for the candidates and
 * return the first acceptable one (honoring an optional preference filter).
 */
async function findImage({ queries, preferTitleRe, avoidTitleRe, urlWidth = 1000 }) {
  for (const query of queries) {
    let titles
    try {
      titles = await searchCommons(query)
    } catch (e) {
      console.error(`  search failed for "${query}": ${e.message}`)
      continue
    }
    await sleep(SLEEP_MS)
    if (titles.length === 0) continue

    let infos
    try {
      infos = await getImageInfo(titles, urlWidth)
    } catch (e) {
      console.error(`  imageinfo failed for "${query}": ${e.message}`)
      continue
    }
    await sleep(SLEEP_MS)

    const candidates = titles.filter((t) => isAcceptable(infos[t]))
    if (candidates.length === 0) continue

    let ordered = candidates
    if (preferTitleRe) {
      const preferred = candidates.filter((t) => preferTitleRe.test(t))
      const rest = candidates.filter((t) => !preferTitleRe.test(t))
      ordered = [...preferred, ...rest]
    }
    if (avoidTitleRe) {
      const kept = ordered.filter((t) => !avoidTitleRe.test(t))
      if (kept.length > 0) ordered = kept
    }

    const title = ordered[0]
    return { title, info: infos[title], query }
  }
  return null
}

async function downloadTo(url, destPath) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`download ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.mkdirSync(path.dirname(destPath), { recursive: true })
  fs.writeFileSync(destPath, buf)
  return buf.length
}

function extFor(info) {
  return info.mime === 'image/png' ? 'png' : 'jpg'
}

async function processEntry(entry, kind, hasMetadata) {
  const { slug, name, image: hint } = entry
  const dir = path.join(ROOT, 'public', 'img', kind === 'person' ? 'people' : 'places')

  // Skip download only if the file already exists AND we already have metadata for it
  // (images.json entry from a prior run). Otherwise an orphaned file with no metadata
  // would silently stay undocumented.
  if (hasMetadata) {
    for (const ext of ['jpg', 'png']) {
      const existing = path.join(dir, `${slug}.${ext}`)
      if (fs.existsSync(existing)) {
        console.log(`  [skip existing] ${slug}.${ext}`)
        return { slug, skipped: true, file: `/img/${kind === 'person' ? 'people' : 'places'}/${slug}.${ext}` }
      }
    }
  }

  let queries
  let preferTitleRe
  const avoidTitleRe = kind === 'place' ? /\bmap\b/i : undefined

  if (kind === 'person') {
    queries = [hint, `${name} Bible engraving`, `${name} Bible painting`, `${name} Bible`]
    preferTitleRe = /dor[ée]/i
  } else {
    queries = [hint, `${name}`, `${name} ruins`, `${name} photograph`]
  }

  const found = await findImage({ queries, preferTitleRe, avoidTitleRe })
  if (!found) {
    console.log(`  NO IMAGE FOUND: ${slug} (${name})`)
    return { slug, notFound: true }
  }

  const { title, info } = found
  const ext = extFor(info)
  const destPath = path.join(dir, `${slug}.${ext}`)
  let bytes
  try {
    bytes = await downloadTo(info.thumburl || info.url, destPath)
  } catch (e) {
    console.log(`  DOWNLOAD FAILED: ${slug} (${name}) — ${e.message}`)
    return { slug, notFound: true }
  }
  await sleep(SLEEP_MS)

  // Re-download smaller if too large
  if (bytes > 400 * 1024) {
    try {
      const smallerInfos = await getImageInfo([title], 800)
      await sleep(SLEEP_MS)
      const smallerInfo = smallerInfos[title]
      if (smallerInfo?.thumburl) {
        bytes = await downloadTo(smallerInfo.thumburl, destPath)
        console.log(`  [resized to 800px] ${slug}: ${(bytes / 1024).toFixed(0)} KB`)
      }
    } catch (e) {
      console.error(`  resize failed for ${slug}: ${e.message}`)
    }
  }

  const em = info.extmetadata ?? {}
  const descTitle = stripHtml(em.ImageDescription?.value) || title.replace(/^File:/, '').replace(/\.[a-zA-Z]+$/, '')
  const result = {
    slug,
    file: `/img/${kind === 'person' ? 'people' : 'places'}/${slug}.${ext}`,
    title: truncate(descTitle, 120),
    author: truncate(stripHtml(em.Artist?.value), 80),
    license: licenseOf(info),
    source: info.descriptionurl,
    _commonsTitle: title,
    _bytes: bytes,
  }
  console.log(`  OK: ${slug} <- ${title} [${result.license}] (${(bytes / 1024).toFixed(0)} KB)`)
  return result
}

// Plain Node can't import .ts directly, so parse the two data files' arrays with a tiny extractor.
function loadEntries(file, arrayName) {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', file), 'utf8')
  const startMarker = `export const ${arrayName}`
  const startIdx = src.indexOf(startMarker)
  if (startIdx === -1) throw new Error(`could not find ${arrayName} in ${file}`)
  const eqIdx = src.indexOf('=', startIdx)
  const arrStart = src.indexOf('[', eqIdx)
  // Find matching closing bracket
  let depth = 0
  let i = arrStart
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') {
      depth--
      if (depth === 0) break
    }
  }
  const arrText = src.slice(arrStart, i + 1)

  // Extract each object literal at the top level of the array.
  const entries = []
  let d = 0
  let objStart = -1
  for (let j = 0; j < arrText.length; j++) {
    const ch = arrText[j]
    if (ch === '{') {
      if (d === 0) objStart = j
      d++
    } else if (ch === '}') {
      d--
      if (d === 0 && objStart !== -1) {
        entries.push(arrText.slice(objStart, j + 1))
        objStart = -1
      }
    }
  }

  return entries.map((objText) => {
    const slug = /slug:\s*'([^']*)'/.exec(objText)?.[1]
    const name = /name:\s*'((?:[^'\\]|\\.)*)'/.exec(objText)?.[1]?.replace(/\\'/g, "'")
    const image = /image:\s*'((?:[^'\\]|\\.)*)'/.exec(objText)?.[1]?.replace(/\\'/g, "'")
    return { slug, name, image }
  })
}

async function run() {
  const people = loadEntries('people.ts', 'PEOPLE:').map((e) => ({ ...e }))
  const places = loadEntries('places.ts', 'PLACES:').map((e) => ({ ...e }))

  console.log(`Loaded ${people.length} people, ${places.length} places.\n`)

  const imagesPath = path.join(ROOT, 'src', 'data', 'images.json')
  let existing = {}
  if (fs.existsSync(imagesPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(imagesPath, 'utf8'))
    } catch {
      existing = {}
    }
  }

  const images = {}
  const failures = []
  const summaryRows = []

  console.log('--- PEOPLE ---')
  for (const person of people) {
    if (!person.slug || !person.image) {
      console.log(`  [skip - missing data] ${JSON.stringify(person)}`)
      continue
    }
    console.log(`${person.slug} (${person.name})`)
    const result = await processEntry(person, 'person', Boolean(existing[person.slug]))
    if (result?.notFound) {
      failures.push({ slug: person.slug, name: person.name, kind: 'person' })
      summaryRows.push({ slug: person.slug, status: 'NO IMAGE FOUND' })
    } else if (result?.skipped) {
      images[person.slug] = existing[person.slug]
      summaryRows.push({ slug: person.slug, status: 'already downloaded' })
    } else if (result) {
      images[person.slug] = {
        file: result.file,
        title: result.title,
        author: result.author,
        license: result.license,
        source: result.source,
      }
      summaryRows.push({ slug: person.slug, status: `${result._commonsTitle} [${result.license}]` })
    }
  }

  console.log('\n--- PLACES ---')
  for (const place of places) {
    if (!place.slug || !place.image) {
      console.log(`  [skip - missing data] ${JSON.stringify(place)}`)
      continue
    }
    console.log(`${place.slug} (${place.name})`)
    const result = await processEntry(place, 'place', Boolean(existing[place.slug]))
    if (result?.notFound) {
      failures.push({ slug: place.slug, name: place.name, kind: 'place' })
      summaryRows.push({ slug: place.slug, status: 'NO IMAGE FOUND' })
    } else if (result?.skipped) {
      images[place.slug] = existing[place.slug]
      summaryRows.push({ slug: place.slug, status: 'already downloaded' })
    } else if (result) {
      images[place.slug] = {
        file: result.file,
        title: result.title,
        author: result.author,
        license: result.license,
        source: result.source,
      }
      summaryRows.push({ slug: place.slug, status: `${result._commonsTitle} [${result.license}]` })
    }
  }

  // Merge with existing images.json entries not touched this run, so re-runs on a subset don't wipe prior results.
  const merged = { ...existing, ...images }
  fs.writeFileSync(imagesPath, JSON.stringify(merged, null, 2) + '\n')

  console.log('\n=== SUMMARY ===')
  for (const row of summaryRows) console.log(`${row.slug}: ${row.status}`)

  if (failures.length > 0) {
    console.log('\n=== FAILURES ===')
    for (const f of failures) console.log(`${f.slug} (${f.name}) [${f.kind}]`)
  } else {
    console.log('\nAll entries resolved.')
  }

  // Contact sheet
  writeContactSheet(merged, people, places)

  console.log(`\nWrote ${Object.keys(merged).length} image entries to src/data/images.json`)
}

function writeContactSheet(images, people, places) {
  const rowsFor = (list, kind) =>
    list
      .filter((e) => images[e.slug])
      .map((e) => {
        const img = images[e.slug]
        return `<figure>
  <img src="${img.file}" alt="${escapeHtml(e.name)}" loading="lazy">
  <figcaption><strong>${escapeHtml(e.slug)}</strong><br>${escapeHtml(img.title)}<br><small>${escapeHtml(img.license)}</small></figcaption>
</figure>`
      })
      .join('\n')

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Image contact sheet</title>
<style>
  body { font-family: system-ui, sans-serif; background: #111; color: #eee; padding: 20px; }
  h2 { margin-top: 40px; }
  .grid { display: flex; flex-wrap: wrap; gap: 16px; }
  figure { margin: 0; width: 180px; }
  figure img { width: 180px; height: 200px; object-fit: cover; border-radius: 4px; display: block; }
  figcaption { font-size: 12px; margin-top: 4px; line-height: 1.3; }
</style>
</head>
<body>
<h1>Image contact sheet</h1>
<h2>People</h2>
<div class="grid">
${rowsFor(people, 'person')}
</div>
<h2>Places</h2>
<div class="grid">
${rowsFor(places, 'place')}
</div>
</body>
</html>
`
  fs.writeFileSync(path.join(ROOT, 'public', 'img', 'contact-sheet.html'), html)
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
