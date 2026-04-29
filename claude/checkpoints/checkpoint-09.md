# Checkpoint 09 — 2026-04-29 — Gameplay Features: Lives, Sword Trail, Pause

## What was built

### Finger Trail — Sword Glow
- Rebuilt from individual `<line>` segments to a single smooth bezier curve path
- Quadratic bezier interpolation via midpoints between trail points — organic, curved feel
- 3-layer SVG glow: wide blurry outer halo (rgba 200,220,255) + grey-white core + sharp bright white edge
- Color changed from gold/yellow to white-grey sword aesthetic

### Lives System
- `lives: 3` added to global state (App.jsx)
- Miss detection: demon within 100px of screen center = 1 life lost, demon removed
- Game over at 0 lives → `gameActive: false, gameScreen: 'timesUp'`
- Lives reset to 3 on game start (Countdown), play again, and main menu (TimesUp)
- HUD: LIVES section added on the right side with ♥ hearts (red glow = full, faded = lost)
- HUD bar widened from 820px to 980px to fit 4 sections

### No-Spawn Last 2 Seconds
- Demon spawner checks `prev.timeRemaining <= 2` and skips — screen clears before time's up

### Pause System (Spacebar)
- `gamePaused: false` added to global state
- Spacebar toggles pause — timer, spawning, movement, and finger tracking all freeze
- Pause overlay: dark semi-transparent bg, pause icon + "GAME PAUSED" label stacked vertically center
- 3 action buttons at lower center, each in its own individual box (dark fill, purple border, angled clip-path):
  - ✕ — leave to splash, resets all state
  - ↺ — restart from countdown, resets all state
  - ▶ — resume (same as spacebar)
- Button icons match pause icon weight: 60x60 viewBox, thick strokes/filled shapes

### Mirror Fix
- Canvas display mirrored via `transform: scaleX(-1)` on `.segmentation-canvas`
- Hand tracking x re-mirrored to match: `(1 - tip.x) * window.innerWidth`

## Key CSS values
- `.gameplay-pause-word`: `font-size: 0.75rem`, `letter-spacing: 0.25em`, `margin-top: 0.6rem`
- `.gameplay-pause-actions`: `position: absolute; bottom: 8%`
- `.pause-btn`: 60×60px, dark bg, `border: 1px solid #9944cc`, angled clip-path, purple drop-shadow

## Records of Resistance
- Lives added to left side of HUD → moved to right side on user request
- Pause buttons styled with circular border/background → rejected, matched to pause icon style
- All 3 buttons in one shared box → rejected, each button gets its own individual box
- "PAUSE" text → changed to "GAME PAUSED", made smaller
- "GAME PAUSED" rendering beside icon → fixed with `flex-direction: column` on overlay

## Files changed
- `src/components/ui/FingerTrail.jsx` — bezier curves + 3-layer sword glow
- `src/components/panels/ControllerPanel.jsx` — miss detection, lives, no-spawn last 2s, spacebar pause
- `src/components/panels/HUDPanel.jsx` — lives section (right side), hearts
- `src/components/panels/HUDPanel.css` — heart styles, wider panel
- `src/components/screens/Gameplay.jsx` — pause overlay with icon, text, 3 buttons
- `src/components/screens/screens.css` — pause overlay styles, button styles
- `src/App.jsx` — `lives: 3`, `gamePaused: false` in initial state, `lives` prop to HUD
- `src/components/screens/Countdown.jsx` — `lives: 3` on game start
- `src/components/screens/TimesUp.jsx` — `lives: 3` on play again + main menu
