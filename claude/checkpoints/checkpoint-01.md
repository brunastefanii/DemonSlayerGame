# Checkpoint 01 — 2026-04-27 — Full Build Through Phase 5 Polish

> AI 201 — Project 2: The Reactive Sandbox
> Saved before implementing visual redesign from Figma inspiration.

---

## Session Context

This is the first checkpoint for Demon Slayer Hunters. The game is functionally complete — all six screens work, hand tracking detects finger position via MediaPipe, demons spawn and move, slays are detected, audio plays across all game events, and the slay animation (CSS clip-path split) fires on demon contact. The project has been pushed to GitHub and auto-deploys to GitHub Pages via GitHub Actions.

---

## What Was Built This Session

### Phase 1 — Vite + React Scaffold
- `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`
- `src/App.jsx` with centralized state (`gameState`) and `updateState()` supporting both object and functional updates
- `src/index.css`, `.github/workflows/deploy.yml`
- Vite base: `/DemonSlayerGame/` for GitHub Pages

### Phase 2 — Three-Panel System & All Screens
- **Panel A** `BrowserPanel.jsx` — renders active screen by switching on `gameScreen`
- **Panel B** `HUDPanel.jsx` — score, timer, combo overlay (only visible during gameplay)
- **Panel C** `ControllerPanel.jsx` — game timer, demon spawning, demon movement, slash detection, audio reactions (pure logic, renders nothing)
- Six screens: Splash, LevelSelect, CameraPermission, Countdown, Gameplay, TimesUp
- `DemonHead.jsx`, `FingerTrail.jsx`
- `gameData.json` with Easy/Medium/Hard level configs and grade thresholds (S/A/B/C)
- `screens.css` with placeholder styles

### Phase 3 — Demon Spawning & Movement
- Demons spawn from random screen edges, velocity aimed at center with slight randomization
- Movement loop runs at ~30fps via `setInterval(33)`
- Functional state updates throughout to avoid stale closures

### Phase 4 — Camera & Hand Tracking
- `useHandTracking.js` — MediaPipe Hands + Camera integration
  - WASM loaded from CDN (`@mediapipe/hands@0.4.1675469240`)
  - Mirrors x-coordinate: `x = (1 - tip.x) * window.innerWidth` to match `scaleX(-1)` video
  - callbackRef pattern keeps onFingerMove fresh without restarting MediaPipe
- Slash detection in ControllerPanel: `SLAY_RADIUS = 50px`
- Demons slayed: marked `slayed: true` + `slayTime`, frozen in place, removed after `SLAY_LINGER = 650ms`
- `FingerTrail.jsx` renders last 15 positions as fading dots

### Phase 5a — Slay Animation
- CSS clip-path split: left half (`polygon 0-50%`) and right half (`polygon 50-100%`) fly apart with rotation
- `.demon-splatter` radial burst on slay
- Demon stays visible for 650ms during animation, then filtered out

### Phase 5b — Audio System
- `useAudio.js` — singleton Web Audio API module (not a React hook)
- All sounds generated programmatically — no audio files required
- Swap-ready: each function has a comment explaining how to replace with a WAV file
- Sounds: `playMusic`, `stopMusic`, `playHover`, `playCountdown`, `playGo`, `playSlay`, `playCombo`, `playHeartbeat`, `playTick`, `playTimesUp`
- `playHover` added to level card `onMouseEnter` in LevelSelect

---

## Key Technical Decisions

| Decision | Why |
|----------|-----|
| Functional state updates in intervals | Avoids stale closures — interval callbacks always read latest state |
| callbackRef for MediaPipe callback | Keeps onFingerMove fresh without restarting the MediaPipe camera pipeline |
| Slay audio in useEffect watching demonsSlayed | Prevents calling audio from inside a state updater function |
| 30-second timer for all levels | Difficulty comes from spawn rate + speed, not time pressure |
| WASM loaded from CDN | Avoids bundling MediaPipe WASM into Vite build |
| Singleton AudioContext | Browser allows only one AudioContext per page; shared module ensures it |

---

## Directions Given

- Ask questions before every new phase or task before making changes
- README is a final deliverable — do not create it during build
- Records of Resistance = separate file in `claude/checkpoints/` (not embedded in AI Direction Log)
- AI Direction Log = chat history only
- All checkpoint docs live in `claude/checkpoints/`
- Placeholder sounds are fine; include swap instructions for real WAV files
- All three levels should have `timeLimit: 30`

---

## Records of Resistance This Session

| # | Topic | Summary |
|---|-------|---------|
| RoR 1 | README too early | AI created README at setup — rejected, deferred to project end |
| RoR 2 | Different time limits | AI set 60/45/30s per level — changed all to 30s |
| RoR 3 | Records in wrong file | AI embedded Records of Resistance in AI Direction Log — moved to own file |

---

## Successes

- Full game loop functional: spawn → move → slay → score → timesUp → replay
- Hand tracking mirrors video correctly — finger position matches what user sees on screen
- Slay animation fires cleanly and removes demon after linger period
- Audio system is complete and swap-ready — no audio files needed to run the project
- GitHub Pages deploy pipeline working via GitHub Actions
- All state flows top-down from App.jsx; no local state in logic components

---

## Current State at Checkpoint

The game is fully playable. Next step (pending after this commit): apply visual redesign based on Figma inspiration — dark purple-black background, neon magenta finger trail, glass HUD panel, gold/magenta accent colors, score popups on slay.
