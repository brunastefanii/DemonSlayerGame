import { useEffect, useCallback } from 'react'
import gameData from '../../data/gameData.json'
import { useHandTracking } from '../../hooks/useHandTracking'

// Panel C — The Controller (Input & Game Logic Layer)
// Manages the game timer, demon spawning, movement, hand tracking, and slash detection.
// The only component that writes to shared state during active gameplay.
// Renders nothing — it is pure logic.

const SLAY_RADIUS  = 50   // px — distance from demon center that counts as a slay
const TRAIL_LENGTH = 15   // max finger trail points kept in state
const SLAY_LINGER  = 650  // ms — how long a slayed demon stays for its animation

function createDemon(speed) {
  const W = window.innerWidth
  const H = window.innerHeight
  const cx = W / 2
  const cy = H / 2

  const edge = Math.floor(Math.random() * 4)
  let x, y
  if (edge === 0)      { x = Math.random() * W; y = -90 }
  else if (edge === 1) { x = Math.random() * W; y = H + 90 }
  else if (edge === 2) { x = -90; y = Math.random() * H }
  else                 { x = W + 90; y = Math.random() * H }

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
    slayed: false,
    slayTime: null,
  }
}

function ControllerPanel({ gameState, updateState }) {
  const { gameActive, selectedLevel } = gameState

  // Finger move handler — updates trail and detects slays.
  // Slayed demons are marked slayed:true and frozen in place; the movement
  // loop removes them after SLAY_LINGER ms so the animation can play out.
  const handleFingerMove = useCallback(({ x, y }) => {
    updateState(prev => {
      const trail = [...prev.fingerTrail, { x, y }].slice(-TRAIL_LENGTH)

      let slayCount = 0
      const updated = prev.activeDemonHeads.map(demon => {
        if (demon.slayed) return demon // already animating out
        const dx = x - demon.x
        const dy = y - demon.y
        if (Math.sqrt(dx * dx + dy * dy) < SLAY_RADIUS) {
          slayCount++
          return { ...demon, slayed: true, slayTime: Date.now() }
        }
        return demon
      })

      if (slayCount > 0) {
        return {
          fingerTrail: trail,
          activeDemonHeads: updated,
          score: prev.score + slayCount * 10,
          demonsSlayed: prev.demonsSlayed + slayCount,
          currentCombo: prev.currentCombo + slayCount,
        }
      }

      return { fingerTrail: trail }
    })
  }, [updateState])

  useHandTracking({ gameActive, onFingerMove: handleFingerMove })

  // Game timer
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

  // Demon spawning
  useEffect(() => {
    if (!gameActive || !selectedLevel) return
    const level = gameData.levels[selectedLevel]
    const spawnInterval = setInterval(() => {
      const demon = createDemon(level.demonSpeed)
      updateState(prev => ({ activeDemonHeads: [...prev.activeDemonHeads, demon] }))
    }, level.spawnIntervalMs)
    return () => clearInterval(spawnInterval)
  }, [gameActive, selectedLevel])

  // Demon movement (~30fps).
  // Slayed demons are frozen (no position update) and removed after SLAY_LINGER ms.
  useEffect(() => {
    if (!gameActive) return
    const moveInterval = setInterval(() => {
      updateState(prev => {
        if (prev.activeDemonHeads.length === 0) return {}
        const now = Date.now()
        const W = window.innerWidth
        const H = window.innerHeight

        const next = prev.activeDemonHeads
          .map(d => d.slayed ? d : { ...d, x: d.x + d.vx, y: d.y + d.vy })
          .filter(d => {
            if (d.slayed) return now - d.slayTime < SLAY_LINGER
            if (now - d.spawnTime < 600) return true
            return d.x > -100 && d.x < W + 100 && d.y > -100 && d.y < H + 100
          })

        return { activeDemonHeads: next }
      })
    }, 33)
    return () => clearInterval(moveInterval)
  }, [gameActive])

  return null
}

export default ControllerPanel
