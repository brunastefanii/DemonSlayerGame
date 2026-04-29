import './HUDPanel.css'

// Panel B — HUD
// CSS-built bar: SCORE left | diamond | COMBO center | diamond | TIME right
// Purple neon glow matching the reference design.

function HUDPanel({ score, timeRemaining, currentCombo, demonsSlayed, lives, gameActive, gameScreen }) {
  const showHUD = gameActive || gameScreen === 'countdown'
  if (!showHUD) return null

  const isLow = timeRemaining <= 10
  const isCritical = timeRemaining <= 5

  return (
    <div className="hud-panel">
      <div className="hud-bar">

        {/* SCORE */}
        <div className="hud-section hud-section--left">
          <span className="hud-label">SCORE</span>
          <span className="hud-value">{score}</span>
        </div>

        <span className="hud-pip">✦</span>

        {/* COMBO center */}
        <div className="hud-section hud-section--center">
          <span className="hud-label">COMBO</span>
          <span className="hud-value hud-combo-val">
            {currentCombo >= 2 ? `x${currentCombo}` : '0'}
          </span>
        </div>

        <span className="hud-pip">✦</span>

        {/* TIME */}
        <div className="hud-section hud-section--right">
          <span className="hud-label">TIME</span>
          <span className={`hud-value ${isLow ? 'hud-timer--low' : ''} ${isCritical ? 'hud-timer--critical' : ''}`}>
            {timeRemaining}
          </span>
        </div>

        <span className="hud-pip">✦</span>

        {/* LIVES */}
        <div className="hud-section hud-section--lives">
          <span className="hud-label">LIVES</span>
          <span className="hud-lives">
            {[1, 2, 3].map(i => (
              <span key={i} className={`hud-heart${lives >= i ? '' : ' hud-heart--lost'}`}>♥</span>
            ))}
          </span>
        </div>

      </div>
    </div>
  )
}

export default HUDPanel
