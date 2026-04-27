import DemonHead from '../ui/DemonHead'
import FingerTrail from '../ui/FingerTrail'
import './screens.css'

// Screen 5 — Active Gameplay
// Camera feed fills the background (managed by MediaPipe Camera in ControllerPanel).
// Demon heads and finger trail render as overlays.
// All game logic lives in ControllerPanel — this screen only renders.

function Gameplay({ gameState }) {
  const { activeDemonHeads, fingerTrail } = gameState

  return (
    <div className="screen gameplay-screen">
      {/* Camera feed — stream attached by MediaPipe Camera in ControllerPanel */}
      <video
        id="gameplay-camera"
        autoPlay
        playsInline
        muted
        className="camera-feed"
      />

      {activeDemonHeads.map(demon => (
        <DemonHead key={demon.id} demon={demon} />
      ))}

      <FingerTrail trail={fingerTrail} />
    </div>
  )
}

export default Gameplay
