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

function Gameplay({ gameState, updateState }) {
  const { activeDemonHeads, fingerTrail, gameActive, gamePaused } = gameState

  const handleResume  = () => updateState({ gamePaused: false })

  const handleRestart = () => updateState({
    gameScreen: 'countdown',
    gamePaused: false,
    score: 0,
    demonsSlayed: 0,
    currentCombo: 0,
    lives: 3,
    activeDemonHeads: [],
    fingerTrail: [],
  })

  const handleLeave = () => updateState({
    gameScreen: 'splash',
    gameActive: false,
    gamePaused: false,
    score: 0,
    demonsSlayed: 0,
    currentCombo: 0,
    lives: 3,
    activeDemonHeads: [],
    fingerTrail: [],
  })
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

      {gamePaused && (
        <div className="gameplay-pause">
          <svg className="gameplay-pause-icon" viewBox="0 0 60 60" fill="none">
            <rect x="10" y="8" width="15" height="44" rx="3" fill="white" />
            <rect x="35" y="8" width="15" height="44" rx="3" fill="white" />
          </svg>
          <span className="gameplay-pause-word">GAME PAUSED</span>

          <div className="gameplay-pause-actions">
            {/* Leave */}
            <button className="pause-btn" onClick={handleLeave} aria-label="Leave game">
              <svg viewBox="0 0 60 60" fill="none">
                <line x1="10" y1="10" x2="50" y2="50" stroke="white" strokeWidth="7" strokeLinecap="round"/>
                <line x1="50" y1="10" x2="10" y2="50" stroke="white" strokeWidth="7" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Restart */}
            <button className="pause-btn" onClick={handleRestart} aria-label="Restart game">
              <svg viewBox="0 0 60 60" fill="none">
                <path d="M30 10 A20 20 0 1 0 50 30" stroke="white" strokeWidth="7" strokeLinecap="round"/>
                <polygon points="50,14 50,30 36,30" fill="white"/>
              </svg>
            </button>

            {/* Resume / Play */}
            <button className="pause-btn" onClick={handleResume} aria-label="Resume game">
              <svg viewBox="0 0 60 60" fill="none">
                <polygon points="14,8 52,30 14,52" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gameplay
