import { useEffect } from 'react'
import gameData from '../../data/gameData.json'
import { stopMusic, playTimesUp } from '../../hooks/useAudio'
import './screens.css'

// Screen 6 — Time's Up
// Reveals final score, grade badge, and CTAs.
// Writes gameScreen on PLAY AGAIN or MAIN MENU.

function getGrade(score, level) {
  const thresholds = gameData.gradeThresholds[level]
  if (!thresholds) return 'C'
  if (score >= thresholds.S) return 'S'
  if (score >= thresholds.A) return 'A'
  if (score >= thresholds.B) return 'B'
  return 'C'
}

function TimesUp({ gameState, updateState }) {
  const { score, demonsSlayed, selectedLevel } = gameState
  const grade = getGrade(score, selectedLevel)

  useEffect(() => {
    stopMusic()
    playTimesUp()
  }, [])

  const handlePlayAgain = () => {
    updateState({
      gameScreen: 'countdown',
      score: 0,
      demonsSlayed: 0,
      currentCombo: 0,
      activeDemonHeads: [],
      fingerTrail: [],
    })
  }

  const handleMainMenu = () => {
    updateState({
      gameScreen: 'splash',
      selectedLevel: null,
      gameActive: false,
      score: 0,
      demonsSlayed: 0,
      currentCombo: 0,
      activeDemonHeads: [],
      fingerTrail: [],
    })
  }

  return (
    <div className="screen timesup-screen">
      <h1 className="timesup-title">TIME'S UP!</h1>

      <div className={`grade-badge grade-badge--${grade.toLowerCase()}`}>
        {grade}
      </div>

      <div className="final-score">{score}</div>
      <p className="demons-slayed">{demonsSlayed} demons slayed</p>

      <div className="timesup-actions">
        <button className="btn btn--primary" onClick={handlePlayAgain}>
          PLAY AGAIN
        </button>
        <button className="btn btn--ghost" onClick={handleMainMenu}>
          MAIN MENU
        </button>
      </div>
    </div>
  )
}

export default TimesUp
