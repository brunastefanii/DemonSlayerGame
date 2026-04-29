// UI Component — FingerTrail
// Renders a smooth sword-slash trail using bezier curves and a 3-layer SVG glow.
// Trail points come from fingerTrail in shared state (written by ControllerPanel).

function buildPath(trail) {
  if (trail.length < 2) return ''
  let d = `M ${trail[0].x} ${trail[0].y}`
  for (let i = 1; i < trail.length - 1; i++) {
    // Midpoint between current and next point — makes the curve smooth and organic
    const mx = (trail[i].x + trail[i + 1].x) / 2
    const my = (trail[i].y + trail[i + 1].y) / 2
    d += ` Q ${trail[i].x} ${trail[i].y} ${mx} ${my}`
  }
  const last = trail[trail.length - 1]
  d += ` L ${last.x} ${last.y}`
  return d
}

function FingerTrail({ trail }) {
  if (!trail || trail.length < 2) return null

  const d = buildPath(trail)

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id="sword-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Layer 1 — wide outer glow */}
      <path
        d={d}
        stroke="rgba(200, 220, 255, 0.25)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sword-glow)"
      />

      {/* Layer 2 — core */}
      <path
        d={d}
        stroke="rgba(220, 235, 255, 0.72)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 3 — bright white edge */}
      <path
        d={d}
        stroke="rgba(255, 255, 255, 0.96)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default FingerTrail
