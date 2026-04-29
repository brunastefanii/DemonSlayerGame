import { useEffect, useRef } from 'react'
import DemonHead from '../ui/DemonHead'
import FingerTrail from '../ui/FingerTrail'
import { playMusic, stopMusic } from '../../hooks/useAudio'
import { useBodySegmentation } from '../../hooks/useBodySegmentation'
import bgImage from '../../assets/images/demon slayer 3 background.png'
import './screens.css'

// Screen 5 — Active Gameplay
// Canvas shows player (camera) composited over background via MediaPipe segmentation.
// Hidden video feeds both the Hands model and SelfieSegmentation.
// Demon heads and finger trail render as overlays.
// All game logic lives in ControllerPanel — this screen only renders.

function Gameplay({ gameState }) {
  const { activeDemonHeads, fingerTrail, gameActive } = gameState
  const canvasRef = useRef(null)

  useBodySegmentation({ gameActive, canvasRef, bgImageSrc: bgImage })

  useEffect(() => {
    playMusic('gameplay')
    return () => stopMusic()
  }, [])

  return (
    <div className="screen gameplay-screen">
      <video
        id="gameplay-camera"
        autoPlay
        playsInline
        muted
        className="camera-feed camera-feed--hidden"
      />
      <canvas ref={canvasRef} width={640} height={360} className="segmentation-canvas" />

      {activeDemonHeads.map(demon => (
        <DemonHead key={demon.id} demon={demon} />
      ))}

      <FingerTrail trail={fingerTrail} />
    </div>
  )
}

export default Gameplay
