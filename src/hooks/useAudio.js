// Audio module — Web Audio API placeholder sounds.
// All sounds are generated programmatically. No files needed.
//
// TO SWAP FOR REAL WAV FILES:
//   Replace each play* function body with:
//     const sfx = new Audio('/audio/filename.wav'); sfx.play()
//   Drop your WAV files into src/assets/audio/ and update the paths.

let _ctx = null
let _masterGain = null
let _music = []
let _muted = false

function getCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext || window.webkitAudioContext)()
    _masterGain = _ctx.createGain()
    _masterGain.gain.value = _muted ? 0 : 1
    _masterGain.connect(_ctx.destination)
  }
  if (_ctx.state === 'suspended') _ctx.resume()
  return _ctx
}

function dest() {
  getCtx()
  return _masterGain
}

export function setMuted(muted) {
  _muted = muted
  if (_masterGain) _masterGain.gain.value = muted ? 0 : 1
}

export function isMuted() {
  return _muted
}

// ─── Music ────────────────────────────────────────────────────────────────────

export function stopMusic() {
  const ctx = getCtx()
  _music.forEach(({ osc, gain }) => {
    try {
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)
      osc.stop(ctx.currentTime + 0.45)
    } catch {}
  })
  _music = []
}

export function playMusic(screen) {
  stopMusic()
  const ctx = getCtx()

  // Placeholder: ambient chord drone — swap with looping Audio() for real tracks
  // splash = dark ambient A minor, gameplay = energetic F major
  const freqs = screen === 'gameplay'
    ? [174.6, 220, 261.6, 349.2]  // F3 chord
    : [110,   146.8, 196,  220]   // A2 minor ambient

  _music = freqs.map((freq, i) => {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(dest())
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.03 - i * 0.005, ctx.currentTime + 1)
    osc.start(ctx.currentTime)
    return { osc, gain }
  })
}

// ─── SFX ──────────────────────────────────────────────────────────────────────

// Level card hover — soft UI blip
export function playHover() {
  const ctx  = getCtx()
  const osc  = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(dest())
  osc.type = 'sine'
  osc.frequency.setValueAtTime(520, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.06)
  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.12)
}

// Countdown 3 / 2 / 1 — deep drum hit, pitch rises each count
export function playCountdown(step) {
  const ctx  = getCtx()
  const freq = [100, 140, 200][step] ?? 200
  const osc  = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(dest())
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(freq, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, ctx.currentTime + 0.25)
  gain.gain.setValueAtTime(0.45, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.35)
}

// GO! — energetic synth burst
export function playGo() {
  const ctx = getCtx()
  ;[440, 550, 660, 880].forEach((freq, i) => {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(dest())
    osc.type = 'square'
    const t = ctx.currentTime + i * 0.04
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0.28, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
    osc.start(t)
    osc.stop(t + 0.45)
  })
}

// Demon slay — sharp slash + noise burst
export function playSlay() {
  const ctx        = getCtx()
  const bufferSize = Math.floor(ctx.sampleRate * 0.12)
  const buffer     = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data       = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type  = 'bandpass'
  filter.frequency.setValueAtTime(1400, ctx.currentTime)
  filter.Q.setValueAtTime(0.6, ctx.currentTime)
  const gain = ctx.createGain()
  source.connect(filter)
  filter.connect(gain)
  gain.connect(dest())
  gain.gain.setValueAtTime(0.65, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
  source.start(ctx.currentTime)
}

// Combo achieved — ascending chime / synth stab
export function playCombo() {
  const ctx = getCtx()
  ;[523, 659, 784, 1047].forEach((freq, i) => {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(dest())
    osc.type = 'sine'
    const t = ctx.currentTime + i * 0.07
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.25, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22)
    osc.start(t)
    osc.stop(t + 0.28)
  })
}

// Timer ≤ 10s — heartbeat-like double pulse
export function playHeartbeat() {
  const ctx = getCtx()
  ;[0, 0.15].forEach(offset => {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(dest())
    osc.type = 'sine'
    osc.frequency.setValueAtTime(70, ctx.currentTime + offset)
    gain.gain.setValueAtTime(0.5, ctx.currentTime + offset)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.18)
    osc.start(ctx.currentTime + offset)
    osc.stop(ctx.currentTime + offset + 0.22)
  })
}

// Timer ≤ 5s — rapid high tick
export function playTick() {
  const ctx  = getCtx()
  const osc  = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(dest())
  osc.type = 'square'
  osc.frequency.setValueAtTime(1400, ctx.currentTime)
  gain.gain.setValueAtTime(0.22, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.05)
}

// Time's Up — large bell / gong
export function playTimesUp() {
  const ctx = getCtx()
  ;[220, 440, 660, 880].forEach((freq, i) => {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(dest())
    osc.type = 'sine'
    const t = ctx.currentTime + i * 0.015
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0.2, t)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8)
    osc.start(t)
    osc.stop(ctx.currentTime + 3)
  })
}
