import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import coastline from '../data/coastline.json'
import { PLACES, placeBySlug } from '../data/places'

interface BibleMapProps {
  /** Slug of the place to highlight with a pin, e.g. from PlacePage. */
  highlight?: string
  /** When true, every dot is tappable and navigates to its place. */
  interactive?: boolean
  className?: string
}

// --- projection: matches scripts/build-coastline.mjs -----------------------------------------
const LON_MIN = 8
const LON_MAX = 52
const LAT_MIN = 26
const LAT_MAX = 44
const VIEW_W = 1000
const VIEW_H = 500

function project(lon: number, lat: number): [number, number] {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * VIEW_W
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEW_H
  return [x, y]
}

// --- "Around Jerusalem" inset projection ------------------------------------------------------
const INSET_LON_MIN = 34.6
const INSET_LON_MAX = 35.9
const INSET_LAT_MIN = 31.3
const INSET_LAT_MAX = 32.9
const INSET_W = 320
const INSET_H = 460

function projectInset(lon: number, lat: number): [number, number] {
  const x = ((lon - INSET_LON_MIN) / (INSET_LON_MAX - INSET_LON_MIN)) * INSET_W
  const y = ((INSET_LAT_MAX - lat) / (INSET_LAT_MAX - INSET_LAT_MIN)) * INSET_H
  return [x, y]
}

function inInsetBounds(lon: number, lat: number): boolean {
  return lon >= INSET_LON_MIN && lon <= INSET_LON_MAX && lat >= INSET_LAT_MIN && lat <= INSET_LAT_MAX
}

const JERUSALEM = placeBySlug('jerusalem')
const JERUSALEM_COORDS = JERUSALEM?.coords

// Places whose distance from Jerusalem isn't meaningful because they sit inside it.
const INSIDE_JERUSALEM_SLUGS = new Set(['jerusalem', 'the-temple', 'mount-of-olives', 'golgotha'])

// A handful of subtle orientation labels: [text, lon, lat, anchor].
const ORIENTATION_LABELS: Array<{ text: string; lon: number; lat: number }> = [
  { text: 'MEDITERRANEAN SEA', lon: 19, lat: 35.5 },
  { text: 'EGYPT', lon: 29.5, lat: 27 },
  { text: 'MESOPOTAMIA', lon: 43.5, lat: 33.5 },
  { text: 'ASIA MINOR', lon: 32, lat: 39.2 },
  { text: 'GREECE', lon: 22, lat: 39.3 },
  { text: 'ITALY', lon: 13, lat: 42.8 },
]

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function roundTo(n: number, step: number): number {
  return Math.round(n / step) * step
}

interface LabelPoint {
  slug: string
  name: string
  x: number
  y: number
}

// Several places (Jerusalem, the Temple, Mount of Olives, Golgotha…) sit almost on top of one
// another at this zoom. Group points that land within a few pixels of each other and stack their
// labels vertically so every name stays readable instead of overlapping into a smear.
function layoutClusteredLabels(points: LabelPoint[], clusterRadius = 14, lineHeight = 11): LabelPoint[] {
  const clusters: { x: number; y: number; members: LabelPoint[] }[] = []
  for (const p of points) {
    const cluster = clusters.find((c) => Math.hypot(c.x - p.x, c.y - p.y) < clusterRadius)
    if (cluster) {
      cluster.members.push(p)
    } else {
      clusters.push({ x: p.x, y: p.y, members: [p] })
    }
  }
  const labels: LabelPoint[] = []
  for (const c of clusters) {
    const startY = c.y - ((c.members.length - 1) * lineHeight) / 2
    c.members.forEach((m, i) => {
      labels.push({ slug: m.slug, name: m.name, x: c.x + 9, y: startY + i * lineHeight + 3 })
    })
  }
  return labels
}

interface DotProps {
  slug: string
  name: string
  lon: number
  lat: number
  project: (lon: number, lat: number) => [number, number]
  interactive?: boolean
  onNavigate?: (slug: string) => void
}

function PlaceDot({ slug, name, lon, lat, project, interactive, onNavigate }: DotProps) {
  const [x, y] = project(lon, lat)
  const circle = (
    <>
      <circle cx={x} cy={y} r={4} fill="var(--color-major-deep)" stroke="#fff" strokeWidth={1.5} />
      {interactive && <circle cx={x} cy={y} r={22} fill="transparent" />}
    </>
  )

  if (interactive) {
    return (
      <a
        href={`/places/${slug}`}
        onClick={(e) => {
          e.preventDefault()
          onNavigate?.(slug)
        }}
        aria-label={name}
      >
        <title>{name}</title>
        {circle}
      </a>
    )
  }

  return (
    <g>
      <title>{name}</title>
      {circle}
    </g>
  )
}

function HighlightPin({
  x,
  y,
  name,
  viewW,
}: {
  x: number
  y: number
  name: string
  viewW: number
}) {
  const labelLeft = x > viewW - 150
  return (
    <g>
      <circle cx={x} cy={y} r={7} className="map-pulse-ring" fill="none" stroke="var(--color-gospels-deep)" strokeWidth={2} />
      <circle cx={x} cy={y} r={7} fill="var(--color-gospels-deep)" stroke="#fff" strokeWidth={2} />
      <text
        x={labelLeft ? x - 12 : x + 12}
        y={y + 4}
        textAnchor={labelLeft ? 'end' : 'start'}
        fontSize={13}
        fontWeight={700}
        fill="var(--color-ink)"
        stroke="#fff"
        strokeWidth={3}
        paintOrder="stroke"
      >
        {name}
      </text>
    </g>
  )
}

export function BibleMap({ highlight, interactive, className }: BibleMapProps) {
  const navigate = useNavigate()
  const handleNavigate = (slug: string) => navigate(`/places/${slug}`)

  const highlightPlace = highlight ? placeBySlug(highlight) : undefined

  const placesWithCoords = useMemo(() => PLACES.filter((p) => p.coords), [])

  const distanceLine = useMemo(() => {
    if (!highlightPlace || !highlightPlace.coords || !JERUSALEM_COORDS) return null
    if (highlightPlace.slug === 'jerusalem') return null
    if (INSIDE_JERUSALEM_SLUGS.has(highlightPlace.slug)) {
      return `${highlightPlace.name} · in Jerusalem`
    }
    const [lat1, lon1] = highlightPlace.coords
    const [lat2, lon2] = JERUSALEM_COORDS
    const km = haversineKm(lat1, lon1, lat2, lon2)
    const miles = km * 0.621371
    return `${highlightPlace.name} · about ${roundTo(km, 10).toLocaleString()} km (${roundTo(miles, 10).toLocaleString()} miles) from Jerusalem`
  }, [highlightPlace])

  const showInset = useMemo(() => {
    if (!highlightPlace?.coords || !JERUSALEM_COORDS) return false
    const [lat, lon] = highlightPlace.coords
    const [jLat, jLon] = JERUSALEM_COORDS
    const dist = Math.sqrt((lat - jLat) ** 2 + (lon - jLon) ** 2)
    return dist <= 1.5
  }, [highlightPlace])

  const insetPlaces = useMemo(() => {
    if (!showInset) return []
    return placesWithCoords.filter((p) => p.coords && inInsetBounds(p.coords[1], p.coords[0]))
  }, [showInset, placesWithCoords])

  const insetLabels = useMemo(() => {
    if (!showInset || !highlightPlace) return []
    const points = insetPlaces
      .filter((p) => p.slug !== highlightPlace.slug)
      .map((p) => {
        const [x, y] = projectInset(p.coords![1], p.coords![0])
        return { slug: p.slug, name: p.name, x, y }
      })
    return layoutClusteredLabels(points)
  }, [showInset, insetPlaces, highlightPlace])

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-card border border-ink/10 bg-white shadow-sm">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role={interactive ? 'group' : 'img'}
          aria-label="Map of Bible lands"
          className="block h-auto w-full"
        >
          <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="#EAF3FB" />
          {coastline.paths.map((d, i) => (
            <path key={i} d={d} fill="#F4ECDC" stroke="#C9B98F" strokeWidth={0.6} />
          ))}

          {ORIENTATION_LABELS.map((l) => {
            const [x, y] = project(l.lon, l.lat)
            return (
              <text
                key={l.text}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize={10}
                letterSpacing="0.06em"
                fill="var(--color-muted)"
                opacity={0.65}
              >
                {l.text}
              </text>
            )
          })}

          {placesWithCoords
            .filter((p) => p.slug !== highlightPlace?.slug)
            .map((p) => (
              <PlaceDot
                key={p.slug}
                slug={p.slug}
                name={p.name}
                lon={p.coords![1]}
                lat={p.coords![0]}
                project={project}
                interactive={interactive}
                onNavigate={handleNavigate}
              />
            ))}

          {highlightPlace?.coords &&
            (() => {
              const [x, y] = project(highlightPlace.coords[1], highlightPlace.coords[0])
              return <HighlightPin x={x} y={y} name={highlightPlace.name} viewW={VIEW_W} />
            })()}
        </svg>
      </div>

      {distanceLine && <p className="mt-2 text-xs text-muted">{distanceLine}</p>}

      {showInset && highlightPlace?.coords && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Around Jerusalem</p>
          <div className="overflow-hidden rounded-card border border-dashed border-ink/20 bg-[#F4ECDC]">
            <svg
              viewBox={`0 0 ${INSET_W} ${INSET_H}`}
              role="img"
              aria-label="Map of places near Jerusalem"
              className="block h-auto w-full"
              style={{ maxHeight: 360, margin: '0 auto' }}
            >
              {/* Jordan River, roughly */}
              <line
                x1={projectInset(35.55, 32.7)[0]}
                y1={projectInset(35.55, 32.7)[1]}
                x2={projectInset(35.55, 31.7)[0]}
                y2={projectInset(35.55, 31.7)[1]}
                stroke="#BBD9EE"
                strokeWidth={4}
                strokeLinecap="round"
              />
              {/* Dead Sea, roughly */}
              <ellipse
                cx={projectInset(35.5, 31.45)[0]}
                cy={projectInset(35.5, 31.45)[1]}
                rx={10}
                ry={38}
                fill="#BBD9EE"
              />

              {insetPlaces
                .filter((p) => p.slug !== highlightPlace.slug)
                .map((p) => (
                  <PlaceDot
                    key={p.slug}
                    slug={p.slug}
                    name={p.name}
                    lon={p.coords![1]}
                    lat={p.coords![0]}
                    project={projectInset}
                    interactive={interactive}
                    onNavigate={handleNavigate}
                  />
                ))}

              {insetLabels.map((l) => (
                <text
                  key={l.slug}
                  x={l.x}
                  y={l.y}
                  fontSize={10}
                  fill="var(--color-ink)"
                  stroke="#F4ECDC"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {l.name}
                </text>
              ))}

              {(() => {
                const [x, y] = projectInset(highlightPlace.coords[1], highlightPlace.coords[0])
                return <HighlightPin x={x} y={y} name={highlightPlace.name} viewW={INSET_W} />
              })()}
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
