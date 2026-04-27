import './DemonHead.css'

// UI Component — DemonHead
// Renders a single demon on the gameplay screen.
// Position driven by demon.x / demon.y from shared state (written by ControllerPanel).
// Final demon art assets replace the emoji placeholder in the polish phase.

function DemonHead({ demon }) {
  return (
    <div
      className="demon-head"
      style={{
        position: 'absolute',
        left: demon.x,
        top: demon.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      👹
    </div>
  )
}

export default DemonHead
