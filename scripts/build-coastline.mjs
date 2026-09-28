// Downloads Natural Earth 1:50m land polygons (public domain) and builds a small SVG-ready
// coastline dataset for the Bible-lands region (lon 8..52, lat 26..44), written to
// src/data/coastline.json as { viewBox, paths: string[] }.
//
// Plain Node (>=18, global fetch + fs), no dependencies. Run with:
//   node scripts/build-coastline.mjs
//
// This script is only for (re)generating src/data/coastline.json — the app itself never runs it.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_FILE = path.join(ROOT, 'src/data/coastline.json')

const UA = 'BibleNotesCoastlineBuilder/1.0 (biblenotes.live; contact sharon.unik@gmail.com)'
const URL_50M = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson'
const URL_110M = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson'

// Bounding box we care about (matches BibleMap.tsx projection).
const LON_MIN = 8
const LON_MAX = 52
const LAT_MIN = 26
const LAT_MAX = 44
const VIEW_W = 1000
const VIEW_H = 500 // 1000 * 18/44 / cos(35deg) ~= 499.5, rounded to a clean 500

function project([lon, lat]) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * VIEW_W
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEW_H
  return [x, y]
}

async function fetchGeoJSON(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`fetch failed: ${res.status} ${url}`)
  return res.json()
}

// --- Sutherland-Hodgman polygon clipping against the lon/lat bounding box -------------------

function clipEdge(points, inside, intersect) {
  if (points.length === 0) return []
  const out = []
  for (let i = 0; i < points.length; i++) {
    const cur = points[i]
    const prev = points[(i - 1 + points.length) % points.length]
    const curIn = inside(cur)
    const prevIn = inside(prev)
    if (curIn) {
      if (!prevIn) out.push(intersect(prev, cur))
      out.push(cur)
    } else if (prevIn) {
      out.push(intersect(prev, cur))
    }
  }
  return out
}

function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

function clipRingToBBox(ring) {
  let pts = ring
  pts = clipEdge(
    pts,
    (p) => p[0] >= LON_MIN,
    (a, b) => lerp(a, b, (LON_MIN - a[0]) / (b[0] - a[0])),
  )
  pts = clipEdge(
    pts,
    (p) => p[0] <= LON_MAX,
    (a, b) => lerp(a, b, (LON_MAX - a[0]) / (b[0] - a[0])),
  )
  pts = clipEdge(
    pts,
    (p) => p[1] >= LAT_MIN,
    (a, b) => lerp(a, b, (LAT_MIN - a[1]) / (b[1] - a[1])),
  )
  pts = clipEdge(
    pts,
    (p) => p[1] <= LAT_MAX,
    (a, b) => lerp(a, b, (LAT_MAX - a[1]) / (b[1] - a[1])),
  )
  return pts
}

// --- simplification -------------------------------------------------------------------------

function roundHalfPx(v) {
  return Math.round(v * 2) / 2
}

function simplifyProjectedRing(points) {
  const out = []
  for (const [x, y] of points) {
    const rx = roundHalfPx(x)
    const ry = roundHalfPx(y)
    const last = out[out.length - 1]
    if (!last || last[0] !== rx || last[1] !== ry) out.push([rx, ry])
  }
  // drop a redundant closing point equal to the first
  if (out.length > 1) {
    const first = out[0]
    const last = out[out.length - 1]
    if (first[0] === last[0] && first[1] === last[1]) out.pop()
  }
  // drop near-collinear points to shave a little more size
  const simplified = []
  for (let i = 0; i < out.length; i++) {
    const prev = simplified[simplified.length - 1] ?? out[out.length - 1]
    const cur = out[i]
    const next = out[(i + 1) % out.length]
    const dx1 = cur[0] - prev[0]
    const dy1 = cur[1] - prev[1]
    const dx2 = next[0] - cur[0]
    const dy2 = next[1] - cur[1]
    const cross = dx1 * dy2 - dy1 * dx2
    if (Math.abs(cross) < 0.05 && dx1 * dx2 + dy1 * dy2 >= 0) continue // nearly collinear, skip
    simplified.push(cur)
  }
  return simplified.length >= 3 ? simplified : out
}

function ringBBoxSpan(points) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const [x, y] of points) {
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
  return Math.max(maxX - minX, maxY - minY)
}

function ringToPathD(points) {
  if (points.length < 3) return null
  const [first, ...rest] = points
  const cmds = [`M${first[0]},${first[1]}`]
  for (const [x, y] of rest) cmds.push(`L${x},${y}`)
  cmds.push('Z')
  return cmds.join('')
}

function collectRings(geojson) {
  const rings = []
  for (const feature of geojson.features ?? []) {
    const geom = feature.geometry
    if (!geom) continue
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.type === 'MultiPolygon' ? geom.coordinates : []
    for (const poly of polys) {
      // poly[0] = outer ring, poly[1..] = holes. Land holes (e.g. Caspian Sea) matter for realism,
      // but at this scale/region they add little and complicate winding, so we only keep outer rings.
      const outer = poly[0]
      if (!outer || outer.length < 3) continue
      rings.push(outer)
    }
  }
  return rings
}

function buildPaths(geojson) {
  const rings = collectRings(geojson)
  const paths = []
  for (const ring of rings) {
    const clipped = clipRingToBBox(ring)
    if (clipped.length < 3) continue
    const projected = clipped.map(project)
    const simplified = simplifyProjectedRing(projected)
    if (ringBBoxSpan(simplified) < 2.5) continue // drop specks under ~2.5px across
    const d = ringToPathD(simplified)
    if (d) paths.push(d)
  }
  return paths
}

function bytesOf(str) {
  return Buffer.byteLength(str, 'utf8')
}

async function main() {
  let geojson
  let source = '50m'
  try {
    console.log(`Fetching ${URL_50M} ...`)
    geojson = await fetchGeoJSON(URL_50M)
  } catch (err) {
    console.warn(`50m fetch failed (${err.message}), falling back to 110m`)
    source = '110m'
    geojson = await fetchGeoJSON(URL_110M)
  }

  let paths = buildPaths(geojson)
  let out = { viewBox: `0 0 ${VIEW_W} ${VIEW_H}`, paths }
  let json = JSON.stringify(out)

  // If the 50m data is still too big, fall back to 110m for a lighter file.
  if (source === '50m' && bytesOf(json) > 150 * 1024) {
    console.warn(`50m output is ${(bytesOf(json) / 1024).toFixed(1)} KB, falling back to 110m`)
    geojson = await fetchGeoJSON(URL_110M)
    source = '110m'
    paths = buildPaths(geojson)
    out = { viewBox: `0 0 ${VIEW_W} ${VIEW_H}`, paths }
    json = JSON.stringify(out)
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
  fs.writeFileSync(OUT_FILE, json)
  console.log(`Wrote ${path.relative(ROOT, OUT_FILE)} (${source}, ${paths.length} paths, ${(bytesOf(json) / 1024).toFixed(1)} KB)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
