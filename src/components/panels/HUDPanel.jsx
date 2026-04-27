import './HUDPanel.css'

// Panel B — The Detail View (HUD / Feedback Layer)
// Displays real-time in-game data: score, timer, combo, kill feedback.
// Reads from shared state only — never writes.

function HUDPanel({ score, timeRemaining, currentCombo, demonsSlayed, gameActive, gameScreen }) {
  const showHUD = gameActive || gameScreen === 'countdown'
  if (!showHUD) return null

  const isLow = timeRemaining <= 10
  const isCritical = timeRemaining <= 5

  return (
    <div className="hud-panel">
      <div className="hud-score">
        <span className="hud-label">SCORE</span>
        <span className="hud-value">{score}</span>
      </div>

      <div className={`hud-timer ${isLow ? 'hud-timer--low' : ''} ${isCritical ? 'hud-timer--critical' : ''}`}>
        <span className="hud-value">{timeRemaining}</span>
      </div>

      <div className="hud-combo">
        {currentCombo >= 2 && (
          <span className="hud-combo-value">x{currentCombo} COMBO</span>
        )}
      </div>
    </div>
  )
}

export default HUDPanel
