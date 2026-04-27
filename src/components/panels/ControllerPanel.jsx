import { useEffect } from 'react'

// Panel C — The Controller (Input & Game Logic Layer)
// Manages the game timer, demon spawning, camera gesture capture, and hit detection.
// The only component that writes to shared state during active gameplay.
// Renders nothing — it is pure logic.

// Phase 4: camera feed and MediaPipe hand tracking will be added here.

function ControllerPanel({ gameState, updateState }) {
  const { gameActive } = gameState

  // Game timer — counts down timeRemaining every second while gameActive is true.
  // Uses functional update to avoid stale closure on timeRemaining.
  useEffect(() => {
    if (!gameActive) return

    const interval = setInterval(() => {
      updateState(prev => {
        if (prev.timeRemaining <= 1) {
          return { timeRemaining: 0, gameActive: false, gameScreen: 'timesUp' }
        }
        return { timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameActive])

  // Phase 4: demon spawning, camera stream, hand tracking, slash detection go here.

  return null
}

export default ControllerPanel
