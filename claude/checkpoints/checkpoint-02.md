# Checkpoint 02 — 2026-04-27 — Visual Redesign Attempt (Reverted)

> AI 201 — Project 2: The Reactive Sandbox
> This checkpoint documents a full visual redesign pass that was rejected and reverted.
> Source files were restored to Checkpoint 01 state. Only this documentation was kept.

---

## What Was Attempted

A visual redesign based on a Figma inspiration image (node 101:4) with 5 changes applied one at a time:

### 1. Background — deep purple-black
- `index.css` body: `#0a0a0f` → `#0a0010`
- `screens.css` splash and countdown backgrounds updated to match

### 2. Finger trail — neon magenta with glow
- `FingerTrail.jsx` stroke color: `rgba(255, 200, 80, ...)` → `rgba(224, 64, 251, ...)`
- Added SVG `<defs>` with `feGaussianBlur` glow filter wrapping all trail lines
- Stroke width: 4px → 5px

### 3. Accent color — magenta replacing red
- `screens.css`: all `#e63946` → `#e040fb`, all `rgba(230, 57, 70, ...)` → `rgba(224, 64, 251, ...)`
- `DemonHead.css`: demon glow filter updated to magenta
- Splatter gradient: red → deep crimson + pink `rgba(255, 80, 120, 0.9)` → `rgba(140, 0, 60, 0.6)`

### 4. HUD — floating glass panel
- `HUDPanel.css`: removed full-width gradient bar
- Added `backdrop-filter: blur(12px)`, centered floating pill shape, magenta border glow, inner highlight

### 5. Score popups on slay
- `App.jsx`: added `scorePopups: []` to initialState
- `ControllerPanel.jsx`: on slay, pushes `{id, x, y, label, createdAt}` popup entries; cleans up popups >900ms in movement loop
- `Gameplay.jsx`: renders `.score-popup` divs at each demon's last position
- `screens.css`: added `@keyframes popupRise` — scale in, rise, fade out
- `TimesUp.jsx`: resets `scorePopups: []` on play again and main menu
- Labels: `+10 GOOD` default, `+10 PERFECT!` when `currentCombo % 3 === 0`

---

## Outcome

**All changes reverted.** User did not like any of them.

Source files restored to Checkpoint 01 state via `git restore`. Only this documentation commit was kept.

---

## Records of Resistance

See RoR 4 in `records-of-resistance.md`.
