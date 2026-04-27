import gameData from '../../data/gameData.json'
import { playHover } from '../../hooks/useAudio'
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
      <h2 className="screen-title">SELECT LEVEL</h2>

      <div className="level-cards">
        {Object.entries(gameData.levels).map(([key, level]) => (
          <button
            key={key}
            className={`level-card level-card--${key}`}
            onMouseEnter={playHover}
            onClick={() => handleSelectLevel(key)}
          >
            <h3 className="level-card__name">{level.label}</h3>
            <p className="level-card__tagline">{level.tagline}</p>
          </button>
        ))}
      </div>

      <button
        className="btn btn--ghost"
        onClick={() => updateState({ gameScreen: 'splash' })}
      >
        BACK
      </button>
    </div>
  )
}

export default LevelSelect
