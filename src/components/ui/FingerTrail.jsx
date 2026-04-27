// UI Component — FingerTrail
// Renders the glowing slash trail as an SVG polyline following the player's fingertip.
// Trail points come from fingerTrail in shared state (written by ControllerPanel in Phase 4).

function FingerTrail({ trail }) {
  if (!trail || trail.length < 2) return null

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {trail.map((point, i) => {
        if (i === 0) return null
        const prev = trail[i - 1]
        const opacity = (i / trail.length).toFixed(2)
        return (
          <line
            key={i}
            x1={prev.x}
            y1={prev.y}
            x2={point.x}
            y2={point.y}
            stroke={`rgba(255, 200, 80, ${opacity})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default FingerTrail
