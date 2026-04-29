import { useState } from 'react'
import './App.css'
import BrowserPanel from './components/panels/BrowserPanel'
import HUDPanel from './components/panels/HUDPanel'
import ControllerPanel from './components/panels/ControllerPanel'

// Shared state lives here — App is the single source of truth.
// All three panels receive state as props and send changes back up via updateState.

const initialState = {
  gameScreen: 'splash',       // splash | levelSelect | cameraPermission | countdown | gameplay | timesUp
  selectedLevel: null,        // easy | medium | hard
  cameraAllowed: null,        // true | false | null
  gameActive: false,
  score: 0,
  demonsSlayed: 0,
  currentCombo: 0,
  timeRemaining: 60,
  lives: 3,
  gamePaused: false,
  activeDemonHeads: [],
  fingerTrail: [],
}

function App() {
  const [gameState, setGameState] = useState(initialState)

  // Supports both object updates and functional updates (for timer/game logic avoiding stale closures)
  const updateState = (updates) => {
    if (typeof updates === 'function') {
      setGameState(prev => ({ ...prev, ...updates(prev) }))
    } else {
      setGameState(prev => ({ ...prev, ...updates }))
    }
  }

  return (
    <div className="app">
      {/* Panel A — renders the active game screen */}
      <BrowserPanel gameState={gameState} updateState={updateState} />

      {/* Panel B — HUD overlay: score, timer, combo */}
      <HUDPanel
        score={gameState.score}
        timeRemaining={gameState.timeRemaining}
        currentCombo={gameState.currentCombo}
        demonsSlayed={gameState.demonsSlayed}
        lives={gameState.lives}
        selectedLevel={gameState.selectedLevel}
        gameActive={gameState.gameActive}
        gameScreen={gameState.gameScreen}
      />

      {/* Panel C — invisible: camera, gesture detection, game logic, timer */}
      <ControllerPanel gameState={gameState} updateState={updateState} />
    </div>
  )
}

export default App
