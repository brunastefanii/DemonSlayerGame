// UI Component — DemonHead
// Renders a single demon on the gameplay screen.
// Position is driven by demon.x and demon.y from shared state.
// Final demon art assets will replace the placeholder in the polish phase.

function DemonHead({ demon }) {
  return (
    <div
      className="demon-head"
      style={{
        position: 'absolute',
        left: demon.x,
        top: demon.y,
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      👹
    </div>
  )
}

export default DemonHead
