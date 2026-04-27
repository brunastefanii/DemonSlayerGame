import { useEffect } from 'react'
import gameData from '../../data/gameData.json'

// Panel C — The Controller (Input & Game Logic Layer)
// Manages the game timer, demon spawning, and movement animation.
// The only component that writes to shared state during active gameplay.
// Renders nothing — it is pure logic.

// Phase 4: camera stream, MediaPipe hand tracking, and slash detection will be added here.

function createDemon(speed) {
  const W = window.innerWidth
  const H = window.innerHeight
  const cx = W / 2
  const cy = H / 2

  // Spawn from a random screen edge
  const edge = Math.floor(Math.random() * 4)
  let x, y
  if (edge === 0) { x = Math.random() * W; y = -90 }         // top
  else if (edge === 1) { x = Math.random() * W; y = H + 90 } // bottom
  else if (edge === 2) { x = -90; y = Math.random() * H }    // left
  else                 { x = W + 90; y = Math.random() * H } // right

  // Velocity aimed toward screen center with slight randomness
  const dx = cx - x
  const dy = cy - y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const s = speed * 2.5

  return {
    id: `demon-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    x,
    y,
    vx: (dx / dist) * s + (Math.random() - 0.5),
    vy: (dy / dist) * s + (Math.random() - 0.5),
    spawnTime: Date.now(),
  }
}

function ControllerPanel({ gameState, updateState }) {
  const { gameActive, selectedLevel } = gameState

  // Game timer — counts down every second. Uses functional update to avoid stale closure.
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

  // Demon spawning — interval driven by level's spawnIntervalMs.
  useEffect(() => {
    if (!gameActive || !selectedLevel) return

    const level = gameData.levels[selectedLevel]

    const spawnInterval = setInterval(() => {
      const demon = createDemon(level.demonSpeed)
      updateState(prev => ({
        activeDemonHeads: [...prev.activeDemonHeads, demon],
      }))
    }, level.spawnIntervalMs)

    return () => clearInterval(spawnInterval)
  }, [gameActive, selectedLevel])

  // Demon movement — ~30fps position updates. Removes demons that exit the screen.
  useEffect(() => {
    if (!gameActive) return

    const moveInterval = setInterval(() => {
      updateState(prev => {
        if (prev.activeDemonHeads.length === 0) return {}

        const now = Date.now()
        const W = window.innerWidth
        const H = window.innerHeight

        const moved = prev.activeDemonHeads
          .map(d => ({ ...d, x: d.x + d.vx, y: d.y + d.vy }))
          .filter(d => {
            // Keep newly spawned demons even if still off-screen
            if (now - d.spawnTime < 600) return true
            return d.x > -100 && d.x < W + 100 && d.y > -100 && d.y < H + 100
          })

        return { activeDemonHeads: moved }
      })
    }, 33)

    return () => clearInterval(moveInterval)
  }, [gameActive])

  // Phase 4: camera stream, hand tracking, and slash detection go here.

  return null
}

export default ControllerPanel
