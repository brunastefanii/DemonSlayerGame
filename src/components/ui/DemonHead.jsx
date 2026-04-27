import './DemonHead.css'

// UI Component — DemonHead
// Renders a living demon OR the split slay animation depending on demon.slayed.
// Position driven by demon.x / demon.y from shared state (written by ControllerPanel).

function DemonHead({ demon }) {
  const style = {
    position: 'absolute',
    left: demon.x,
    top: demon.y,
  }

  if (demon.slayed) {
    return (
      <div className="demon-slay" style={style}>
        <div className="demon-half demon-half--left">👹</div>
        <div className="demon-half demon-half--right">👹</div>
        <div className="demon-splatter" />
      </div>
    )
  }

  return (
    <div className="demon-head" style={style}>
      👹
    </div>
  )
}

export default DemonHead
