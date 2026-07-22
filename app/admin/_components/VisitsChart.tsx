export type VisitPoint = { date: string; visits: number; uniqueVisitors: number }

const WIDTH = 600
const HEIGHT = 220
const PAD_X = 8
const PAD_Y = 16

export function VisitsChart({ data }: { data: VisitPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-6">
        <p className="text-sm font-medium text-gray-700 mb-1">No analytics connected yet</p>
        <p className="text-xs text-gray-400 max-w-xs">
          Wire up <code className="bg-gray-100 px-1 py-0.5 rounded">getSiteAnalytics()</code> in{' '}
          <code className="bg-gray-100 px-1 py-0.5 rounded">app/lib/action/analytics.ts</code> to see visit trends here.
        </p>
      </div>
    )
  }

  const maxVal = Math.max(...data.map((d) => Math.max(d.visits, d.uniqueVisitors)), 1)
  const innerW = WIDTH - PAD_X * 2
  const innerH = HEIGHT - PAD_Y * 2
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0

  const pointsFor = (key: 'visits' | 'uniqueVisitors') =>
    data.map((d, i) => {
      const x = PAD_X + i * stepX
      const y = PAD_Y + innerH - (d[key] / maxVal) * innerH
      return { x, y }
    })

  const toLine = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

  const visitsPts = pointsFor('visits')
  const visitorsPts = pointsFor('uniqueVisitors')

  const visitsArea =
    toLine(visitsPts) +
    ` L ${visitsPts[visitsPts.length - 1].x.toFixed(1)} ${(PAD_Y + innerH).toFixed(1)}` +
    ` L ${visitsPts[0].x.toFixed(1)} ${(PAD_Y + innerH).toFixed(1)} Z`

  const labelEvery = Math.max(1, Math.ceil(data.length / 6))

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT + 24}`} className="w-full" role="img" aria-label="Site visits over time">
        <defs>
          <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((f) => (
          <line
            key={f}
            x1={PAD_X}
            x2={WIDTH - PAD_X}
            y1={PAD_Y + innerH * f}
            y2={PAD_Y + innerH * f}
            stroke="#F3F4F6"
            strokeWidth={1}
          />
        ))}

        <path d={visitsArea} fill="url(#visitsFill)" stroke="none" />
        <path d={toLine(visitsPts)} fill="none" stroke="#4F46E5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d={toLine(visitorsPts)} fill="none" stroke="#A5B4FC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {visitsPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="#4F46E5" className="opacity-0 hover:opacity-100">
            <title>{`${data[i].date}: ${data[i].visits} visits, ${data[i].uniqueVisitors} unique`}</title>
          </circle>
        ))}

        {data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text
              key={`${d.date}-${i}`}
              x={PAD_X + i * stepX}
              y={HEIGHT + 18}
              fontSize={11}
              fill="#9CA3AF"
              textAnchor="middle"
            >
              {d.date}
            </text>
          ) : null
        )}
      </svg>

      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Visits
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-300" /> Unique visitors
        </span>
      </div>
    </div>
  )
}