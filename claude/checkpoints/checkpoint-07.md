# Checkpoint 07 — 2026-04-29 — Countdown Screen & HUD Panel

## What was built

### Countdown Screen
Full Countdown screen rebuilt — transparent PNG countdown assets over static background art.

- Background: `demon slayer 3 background.png` — dark purple pagoda scene (same as camera permission, no camera feed)
- 4 transparent PNG assets swapped per step: `demon slayer countdown transparent 3/2/1/GO.png`
- Scale-in animation (`countIn`) on each step via `key={step}` React trick
- Camera feed completely removed — user rejected it ("I didn't like the camera")
- All sound/timing logic unchanged (1s per step, 800ms delay before gameplay transition)

### HUD Panel
Pure CSS HUD bar replacing the `demon slayer 4 score combo time 1.png` asset (too large).

- Layout: SCORE left | ✦ diamond pip | COMBO center | ✦ diamond pip | TIME right
- Purple neon glow matching PLAY button intensity: three `drop-shadow` layers on `.hud-panel` wrapper
- `will-change: filter` + `filter` on wrapper, `clip-path` on inner bar (same glow pattern as all buttons)
- Angled bottom clip-path: `polygon(0% 0%, 100% 0%, 100% 70%, calc(100% - 16px) 100%, 16px 100%, 0% 70%)`
- Combo shows `0` (not `—`) when no active combo
- Timer states: `--low` (≤10s, red), `--critical` (≤5s, pulsing red animation)
- Crescent SVG ornament removed after user feedback

## Key CSS values

### Countdown
- `.countdown-screen`: `background: #030010`
- `.countdown-bg`: `background-size: cover; background-position: center`
- `.countdown-img`: `width: min(420px, 70vw); animation: countIn 0.35s`
- `@keyframes countIn`: scale 0.6→1.05→1.0 with opacity fade

### HUD Panel
- `.hud-panel`: `width: min(820px, 88vw)`, three-layer purple `drop-shadow`
- `.hud-bar`: `background: rgba(4, 0, 12, 0.88)`, `border: 1px solid #9944cc`, `border-top: none`
- `.hud-value`: `font-size: 1.5rem`, white
- `.hud-combo-val`: `color: #cc44ff`
- `.hud-pip`: `color: #9944cc`, `font-size: 0.9rem`

## Records of Resistance
- Asset image (`demon slayer 4 score combo time 1.png`) rendered too large — user asked for CSS version instead
- Crescent SVG ornament: added, then immediately removed on user request
- Combo `—` dash changed to `0` per user request
- Alignment issue: COMBO not centered — fixed by standardizing `hud-section` min-width

## Files changed
- `src/components/screens/Countdown.jsx` — camera feed removed, transparent PNG assets + static background
- `src/components/screens/screens.css` — `.countdown-*` classes added
- `src/components/panels/HUDPanel.jsx` — full rewrite, CSS bar, no asset image
- `src/components/panels/HUDPanel.css` — full rewrite, purple neon glow
- New assets added: `demon slayer 3 background.png`, `demon slayer 4 score combo time 1.png`, `demon slayer countdown transparent 1/2/3/GO.png`, `demon slayer 2/3/4.png`, `demon slayer 2/3 background.png`
