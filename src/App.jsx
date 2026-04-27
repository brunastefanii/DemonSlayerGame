import { useState } from 'react'
import './App.css'

// Shared state lives here — App is the single source of truth.
// All three panels receive state as props and send changes back up.

const initialState = {
  gameScreen: 'splash',         // splash | levelSelect | countdown | gameplay | timesUp
  selectedLevel: null,          // easy | medium | hard
  cameraAllowed: null,          // true | false | null
  gameActive: false,
  score: 0,
  demonsSlayed: 0,
  currentCombo: 0,
  timeRemaining: 60,
  activeDemonHeads: [],
  fingerTrail: [],
}

function App() {
  const [gameState, setGameState] = useState(initialState)

  // Helper to update a single key in shared state
  const updateState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="app">
      <p>Demon Slayer Hunters — scaffold working</p>
      <p>Current screen: <strong>{gameState.gameScreen}</strong></p>
    </div>
  )
}

export default App
