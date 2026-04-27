import DemonHead from '../ui/DemonHead'
import FingerTrail from '../ui/FingerTrail'
import './screens.css'

// Screen 5 — Active Gameplay
// Camera feed as full background (Phase 4).
// Demon heads spawn and move. Finger trail follows hand position.
// All game logic lives in ControllerPanel — this screen only renders.

function Gameplay({ gameState }) {
  const { activeDemonHeads, fingerTrail } = gameState

  return (
    <div className="screen gameplay-screen">
      {/* Camera feed fills this area in Phase 4 */}
      <div className="camera-placeholder">
        <p>[ Camera Feed — Phase 4 ]</p>
      </div>

      {/* Demon heads rendered over camera feed */}
      {activeDemonHeads.map(demon => (
        <DemonHead key={demon.id} demon={demon} />
      ))}

      {/* Finger trail rendered over everything */}
      <FingerTrail trail={fingerTrail} />
    </div>
  )
}

export default Gameplay
