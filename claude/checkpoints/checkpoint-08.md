# Checkpoint 08 — 2026-04-29 — Gameplay Screen: Virtual Background

## What was built

Gameplay screen now shows the player composited over the game background using MediaPipe SelfieSegmentation — same virtual background effect as Zoom.

## Key decisions
- `@mediapipe/selfie_segmentation` added as dependency
- Module-level singleton (`segSingleton`) initialized on import so wasm downloads during Countdown, not at gameplay start
- Throttled to every 4th frame (~15fps) to avoid starving the Hands model (finger trail fix)
- Canvas resolution: 640×360 (half of 1280×720) — reduces processing load, CSS scales up
- `modelSelection: 0` (general/selfie model) — faster than landscape model
- Normal orientation (not mirrored) — user preference; hand tracking x updated to match (`tip.x` instead of `1 - tip.x`)
- Hidden `<video>` feeds both MediaPipe Hands and SelfieSegmentation; canvas renders the composited output

## Compositing approach (canvas)
1. Draw segmentation mask (white = person)
2. `source-in` composite + draw video frame → person pixels only
3. `destination-over` + draw background image → game art behind person
4. Reset to `source-over`

## Records of Resistance
- First version: rAF loop competing with Hands model → finger trail stopped working
- First version: model initialized on gameplay start → slow/missing on first game
- Both fixed by: singleton preload + throttling

## Files changed
- `src/hooks/useBodySegmentation.js` — new hook, singleton pattern, throttled rAF
- `src/hooks/useHandTracking.js` — removed x mirroring (`tip.x` instead of `1 - tip.x`)
- `src/components/screens/Gameplay.jsx` — added canvas + useBodySegmentation, removed gameplay-bg div
- `src/components/screens/Countdown.jsx` — side-effect import of useBodySegmentation to trigger early load
- `src/components/screens/screens.css` — added `.segmentation-canvas`, removed `scaleX(-1)` from camera feed
- `package.json` / `package-lock.json` — added `@mediapipe/selfie_segmentation`
