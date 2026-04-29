import { useEffect, useRef, useCallback } from 'react'
import gameData from '../../data/gameData.json'
import { useHandTracking } from '../../hooks/useHandTracking'
import { playSlay, playCombo, playHeartbeat, playTick } from '../../hooks/useAudio'

// Panel C — The Controller (Input & Game Logic Layer)
// Manages the game timer, demon spawning, movement, hand tracking, and slash detection.
// The only component that writes to shared state during active gameplay.
// Renders nothing — it is pure logic.

const SLAY_RADIUS      = 75   // px — matches demon visual radius (150px / 2)
const MISS_RADIUS      = 100  // px from screen center — demon reaching this = 1 life lost
const TRAIL_LENGTH     = 15   // max finger trail points kept in state
const SLAY_LINGER      = 650  // ms — how long a slayed demon stays for its split animation
const COMBO_THRESHOLD  = 3    // minimum kills in a burst to trigger combo
const BURST_WINDOW_MS  = 800  // ms of inactivity that ends a kill burst

// Returns the minimum distance from point (px,py) to segment (ax,ay)→(bx,by)
function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax
  const dy = by - ay
  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) return Math.sqrt((px - ax) ** 2 + (py - ay) ** 2)
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq))
  return Math.sqrt((px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2)
}

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
    imageIndex: Math.floor(Math.random() * 6),
    spawnTime: Date.now(),
    slayed: false,
    slayTime: null,
  }
}

function ControllerPanel({ gameState, updateState }) {
  const { gameActive, selectedLevel } = gameState
  const prevSlayedRef  = useRef(0)
  const prevComboRef   = useRef(0)
  const prevTimeRef    = useRef(null)
  const burstRef       = useRef({ kills: 0, bonusApplied: false })
  const burstTimerRef  = useRef(null)

  // ── Audio reactions (watch state, fire sounds) ──────────────────────────────

  // Slay & combo sounds — fire when demonsSlayed or currentCombo increments
  useEffect(() => {
    if (!gameActive) return
    if (gameState.demonsSlayed > prevSlayedRef.current) {
      playSlay()
      prevSlayedRef.current = gameState.demonsSlayed
    }
    if (gameState.currentCombo > prevComboRef.current) {
      playCombo()
      prevComboRef.current = gameState.currentCombo
    }
  }, [gameState.demonsSlayed, gameState.currentCombo, gameActive])

  // Timer urgency sounds — heartbeat ≤10s, tick ≤5s
  useEffect(() => {
    if (!gameActive) return
    const t = gameState.timeRemaining
    if (t === prevTimeRef.current) return
    prevTimeRef.current = t

    if (t <= 5 && t > 0)       playTick()
    else if (t <= 10 && t > 5) playHeartbeat()
  }, [gameState.timeRemaining, gameActive])

  // ── Finger tracking & slash detection ───────────────────────────────────────

  const handleFingerMove = useCallback(({ x, y }) => {
    // Manage burst window outside updateState to keep the update pure
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current)
    burstTimerRef.current = setTimeout(() => {
      burstRef.current = { kills: 0, bonusApplied: false }
    }, BURST_WINDOW_MS)

    updateState(prev => {
      if (prev.gamePaused) return {}
      const trail = [...prev.fingerTrail, { x, y }].slice(-TRAIL_LENGTH)

      // Check each segment of the trail so fast sweeps don't skip over demons
      const trailPoints = [...prev.fingerTrail, { x, y }]

      let slayCount = 0
      const updated = prev.activeDemonHeads.map(demon => {
        if (demon.slayed) return demon
        const hit = trailPoints.some((pt, i) => {
          if (i === 0) {
            // First point — check as a single point
            return Math.sqrt((pt.x - demon.x) ** 2 + (pt.y - demon.y) ** 2) < SLAY_RADIUS
          }
          // Check segment from previous point to current point
          const prev = trailPoints[i - 1]
          return distToSegment(demon.x, demon.y, prev.x, prev.y, pt.x, pt.y) < SLAY_RADIUS
        })
        if (hit) {
          slayCount++
          return { ...demon, slayed: true, slayTime: Date.now() }
        }
        return demon
      })

      if (slayCount === 0) return { fingerTrail: trail }

      const prevBurstKills = burstRef.current.kills
      burstRef.current.kills += slayCount

      let pointsEarned
      let comboIncrement = 0

      if (burstRef.current.kills >= COMBO_THRESHOLD && !burstRef.current.bonusApplied) {
        // Combo just activated — double all kills in this burst
        burstRef.current.bonusApplied = true
        comboIncrement = 1
        // Retroactive bonus for kills before this batch (already scored at 1x, add 1x more)
        const retroBonus = prevBurstKills * 10
        // Current batch gets 2x
        pointsEarned = slayCount * 20 + retroBonus
      } else if (burstRef.current.bonusApplied) {
        // Already in a combo burst — 2x for all kills
        pointsEarned = slayCount * 20
      } else {
        // Normal kill, no combo yet
        pointsEarned = slayCount * 10
      }

      return {
        fingerTrail: trail,
        activeDemonHeads: updated,
        score: prev.score + pointsEarned,
        demonsSlayed: prev.demonsSlayed + slayCount,
        currentCombo: prev.currentCombo + comboIncrement,
      }
    })
  }, [updateState])

  useHandTracking({ gameActive, onFingerMove: handleFingerMove })

  // Reset burst state when game starts or ends
  useEffect(() => {
    burstRef.current = { kills: 0, bonusApplied: false }
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current)
  }, [gameActive])

  // ── Pause (spacebar) ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!gameActive) return
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        updateState(prev => ({ gamePaused: !prev.gamePaused }))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameActive, updateState])

  // ── Game timer ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!gameActive) return
    const interval = setInterval(() => {
      updateState(prev => {
        if (prev.gamePaused) return {}
        if (prev.timeRemaining <= 1) {
          return { timeRemaining: 0, gameActive: false, gameScreen: 'timesUp' }
        }
        return { timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [gameActive])

  // ── Demon spawning ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (!gameActive || !selectedLevel) return
    const level = gameData.levels[selectedLevel]
    const spawnInterval = setInterval(() => {
      updateState(prev => {
        if (prev.gamePaused) return {}
        // Stop spawning in the last 2 seconds so the screen clears before time's up
        if (prev.timeRemaining <= 2) return {}
        const demon = createDemon(level.demonSpeed)
        return { activeDemonHeads: [...prev.activeDemonHeads, demon] }
      })
    }, level.spawnIntervalMs)
    return () => clearInterval(spawnInterval)
  }, [gameActive, selectedLevel])

  // ── Demon movement (~30fps) ──────────────────────────────────────────────────

  useEffect(() => {
    if (!gameActive) return
    const moveInterval = setInterval(() => {
      updateState(prev => {
        if (prev.gamePaused) return {}
        if (prev.activeDemonHeads.length === 0) return {}
        const now = Date.now()
        const W = window.innerWidth
        const H = window.innerHeight
        const cx = W / 2
        const cy = H / 2

        const moved = prev.activeDemonHeads.map(d =>
          d.slayed ? d : { ...d, x: d.x + d.vx, y: d.y + d.vy }
        )

        let missCount = 0
        const surviving = moved.filter(d => {
          if (d.slayed) return now - d.slayTime < SLAY_LINGER
          if (now - d.spawnTime < 600) return true

          // Miss: demon reached center without being slayed
          const distToCenter = Math.sqrt((d.x - cx) ** 2 + (d.y - cy) ** 2)
          if (distToCenter < MISS_RADIUS) {
            missCount++
            return false
          }

          return d.x > -100 && d.x < W + 100 && d.y > -100 && d.y < H + 100
        })

        if (missCount > 0) {
          const newLives = prev.lives - missCount
          if (newLives <= 0) {
            return {
              activeDemonHeads: surviving,
              lives: 0,
              gameActive: false,
              gameScreen: 'gameOver',
            }
          }
          return { activeDemonHeads: surviving, lives: newLives }
        }

        return { activeDemonHeads: surviving }
      })
    }, 33)
    return () => clearInterval(moveInterval)
  }, [gameActive])

  return null
}

export default ControllerPanel
