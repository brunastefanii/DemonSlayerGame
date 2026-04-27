import { useState, useEffect } from 'react'
import gameData from '../../data/gameData.json'
import { playCountdown, playGo } from '../../hooks/useAudio'
import './screens.css'

// Screen 4 — Countdown
// Displays 3 → 2 → 1 → GO! then writes gameActive → true and transitions to gameplay.

const STEPS = [3, 2, 1, 'GO!']

function Countdown({ gameState, updateState }) {
  const [step, setStep] = useState(0)

  // Play sound on each step change
  useEffect(() => {
    if (step < STEPS.length - 1) {
      playCountdown(step)
    } else {
      playGo()
    }
  }, [step])

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
      <div className="countdown-number" key={step}>
        {STEPS[step]}
      </div>
    </div>
  )
}

export default Countdown
