import { playHover } from '../../hooks/useAudio'
import LevelCard from '../ui/LevelCard'
import bgImage from '../../assets/images/demon slayer level select.png'
import './screens.css'

// Screen 2 — Level Select
// Writes selectedLevel and advances to cameraPermission (first time) or countdown.

function LevelSelect({ gameState, updateState }) {
  const handleSelectLevel = (levelKey) => {
    const nextScreen = gameState.cameraAllowed === true ? 'countdown' : 'cameraPermission'
    updateState({ selectedLevel: levelKey, gameScreen: nextScreen })
  }

  return (
    <div className="screen level-select-screen">
      <div className="level-select-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      <div
        className="ls-back-wrap"
        onClick={() => updateState({ gameScreen: 'splash' })}
      >
        <div className="ls-back-border">
          <div className="ls-back-fill">← BACK</div>
        </div>
      </div>

      <div className="level-select-cards">
        <div className="level-select-cards-row">
          {['easy', 'medium', 'hard'].map(key => (
            <LevelCard
              key={key}
              levelKey={key}
              onMouseEnter={playHover}
              onClick={() => handleSelectLevel(key)}
            />
          ))}
        </div>

        <div className="ls-tip">
          <div className="ls-tip-inner">
            <svg className="ls-tip-icon" viewBox="0 0 36 36" fill="none">
              <path d="M18 2L34 18L18 34L2 18Z" fill="rgba(153,68,204,0.12)" stroke="#9944cc" strokeWidth="1.8"/>
              <text x="18" y="23" textAnchor="middle" fill="#9944cc" fontStyle="italic" fontWeight="700" fontSize="14">i</text>
            </svg>
            <p className="ls-tip-text"><span className="ls-tip-label">TIP:</span> Higher difficulty = more demons, faster speed, more chaos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelSelect
