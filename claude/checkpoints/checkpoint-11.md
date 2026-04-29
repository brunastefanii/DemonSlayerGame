# Checkpoint 11 — 2026-04-29 — Sound Toggle

## What was built

### Sound On/Off Toggle
- Persistent mute button fixed to top-right corner of every screen (`position: fixed; z-index: 100`)
- Speaker-on SVG / speaker-off SVG icons swap on click
- `SoundToggle.jsx` — reads initial mute state from `isMuted()`, toggles via `setMuted()`
- `SoundToggle.css` — 40×40px dark box, purple border (`rgba(153,68,204,0.5)`), hover glow
- Rendered in `App.jsx` outside all panels — always visible regardless of active screen

### Master Gain Node (useAudio.js)
- Added `_masterGain` — a single GainNode all audio routes through before reaching `ctx.destination`
- `setMuted(true)` sets `_masterGain.gain.value = 0` — silences everything instantly
- `setMuted(false)` restores `_masterGain.gain.value = 1`
- `isMuted()` exposes current mute state so the toggle can initialize correctly
- All `gain.connect(ctx.destination)` calls replaced with `gain.connect(dest())`
- `_muted` persists at module level so state survives re-renders

## Key CSS values
- `.sound-toggle`: `position: fixed; top: 1.1rem; right: 1.4rem; z-index: 100`
- `.sound-toggle`: `width/height: 40px`, `border-radius: 8px`, `border: 1px solid rgba(153,68,204,0.5)`

## Files changed
- `src/hooks/useAudio.js` — master gain node, `setMuted`, `isMuted`, `dest()` helper
- `src/components/ui/SoundToggle.jsx` — created
- `src/components/ui/SoundToggle.css` — created
- `src/App.jsx` — imports and renders `<SoundToggle />`
