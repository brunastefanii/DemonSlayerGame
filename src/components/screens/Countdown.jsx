import { useState, useEffect } from 'react'
import gameData from '../../data/gameData.json'
import { playCountdown, playGo } from '../../hooks/useAudio'
import bgImage from '../../assets/images/demon slayer 3 background.png'
// Side-effect import: triggers the segmentation model singleton to start
// downloading its wasm files during countdown, so it's ready for gameplay.
import '../../hooks/useBodySegmentation'
import img3 from '../../assets/images/demon slayer countdown transparent 3.png'
import img2 from '../../assets/images/demon slayer countdown transparent 2.png'
import img1 from '../../assets/images/demon slayer countdown transparent 1.png'
import imgGo from '../../assets/images/demon slayer countdown transparent GO.png'
import './screens.css'

// Screen 4 — Countdown
// Dark background + transparent PNG countdown assets (3 → 2 → 1 → GO!)
// Advances to gameplay on GO!

const STEPS = [3, 2, 1, 'GO!']
const IMAGES = [img3, img2, img1, imgGo]

function Countdown({ gameState, updateState }) {
  const [step, setStep] = useState(0)

  // Play sound on each step
  useEffect(() => {
    if (step < STEPS.length - 1) {
      playCountdown(step)
    } else {
      playGo()
    }
  }, [step])

  // Advance steps and transition to gameplay
  useEffect(() => {
    if (step < STEPS.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 1000)
      return () => clearTimeout(t)
    }

    if (STEPS[step] === 'GO!') {
      const level = gameData.levels[gameState.selectedLevel]
      const t = setTimeout(() => {
        updateState({
          gameActive: true,
          gameScreen: 'gameplay',
          timeRemaining: level.timeLimit,
          score: 0,
          demonsSlayed: 0,
          currentCombo: 0,
          activeDemonHeads: [],
          fingerTrail: [],
        })
      }, 800)
      return () => clearTimeout(t)
    }
  }, [step])

  return (
    <div className="screen countdown-screen">
      <div className="countdown-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <img
        key={step}
        src={IMAGES[step]}
        className="countdown-img"
        alt={String(STEPS[step])}
      />
    </div>
  )
}

export default Countdown
