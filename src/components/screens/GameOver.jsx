import { useEffect } from 'react'
import { stopMusic, playTimesUp } from '../../hooks/useAudio'
import bgImage from '../../assets/images/demon slayer game over background.png'
import './screens.css'

// Screen 7 — Game Over
// Shown when the player loses all 3 lives.
// Background art + PLAY AGAIN and BACK TO MENU buttons.

function GameOver({ gameState, updateState }) {
  useEffect(() => {
    stopMusic()
    playTimesUp()
  }, [])

  const handlePlayAgain = () => updateState({
    gameScreen: 'levelSelect',
    gameActive: false,
    gamePaused: false,
    score: 0,
    demonsSlayed: 0,
    currentCombo: 0,
    lives: 3,
    activeDemonHeads: [],
    fingerTrail: [],
  })

  const handleMainMenu = () => updateState({
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

  return (
    <div className="screen go-screen">
      <div className="go-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      <div className="go-actions">
        {/* PLAY AGAIN */}
        <div className="go-btn-wrap go-btn-wrap--play" onClick={handlePlayAgain}>
          <div className="go-btn-border go-btn-border--play">
            <div className="go-btn-fill">PLAY AGAIN</div>
          </div>
        </div>

        {/* BACK TO MENU */}
        <div className="go-btn-wrap go-btn-wrap--menu" onClick={handleMainMenu}>
          <div className="go-btn-border go-btn-border--menu">
            <div className="go-btn-fill">BACK TO MENU</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOver
