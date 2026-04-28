# Checkpoint 03 — 2026-04-28 — Splash Screen Visual Implementation

> AI 201 — Project 2: The Reactive Sandbox
> Saved after splash screen background art and CSS PLAY button are approved.

---

## What Was Built This Session

### Splash Screen — Background Image
- User provided clean art asset (no button drawn in): `src/assets/images/demon slay 1.png` (1536×1024, 3:2 ratio)
- `SplashScreen.jsx` updated to import the image and use it as a full-bleed background via inline `backgroundImage` style
- Removed HTML logo, subtitle, and silhouette placeholder elements
- `.splash-bg` div uses `background-size: contain` + `background-position: center center` to show the full image without cropping, with dark background (`#050008`) filling any side gaps

### Splash Screen — CSS PLAY Button
- `index.html` updated with Google Fonts: Oswald 700
- Neon octagonal PLAY button built entirely in CSS — no image needed
- Structure: `.play-btn-wrap` (glow + hover) → `.play-btn-border` (clip-path octagon + pink fill) → `.play-btn-fill` (dark bg + Oswald text)
- `clip-path: polygon(18px 0%, ...)` creates the cut-corner octagon shape
- 2px pink border simulated by wrapping dark fill inside pink outer div
- `filter: drop-shadow()` creates neon glow that respects the clip-path shape
- Four diamond pip decorators (◆) absolutely positioned at top / bottom / left / right edges of the button
- Hover: scale(1.04) + intensified glow; Active: scale(0.97)
- Button anchored with `position: absolute; bottom: 12%` so it stays in the lower area regardless of viewport width

---

## Key Technical Decisions

| Decision | Why |
|----------|-----|
| `background-size: contain` instead of `cover` | Image is 3:2; 16:9 desktop with `cover` crops the bottom, hiding ground/water reflection |
| `background-position: center center` | Centers the image vertically so neither top nor bottom is preferentially cropped |
| `position: absolute; bottom: 12%` for button | Decouples button position from content flow — stays consistent across viewport widths |
| Google Font (Oswald 700) for button | Heavy condensed style matches the bold game aesthetic |
| Two-div border technique (outer pink + inner dark) | `box-shadow` doesn't work with clip-path; `filter: drop-shadow` on the wrapper handles the glow |
| Image as pure background art (no button) | Keeps UI interactive and responsive; button gets real hover/click states |

---

## Design Decisions Discussed

- User asked whether to overlay a clickable element on the drawn button vs. recreating the button in CSS → recommended CSS button for responsiveness
- Agreed pattern for ALL future screens: images = background art only, all UI (buttons, cards, labels) built in CSS/HTML
- User will replicate other screen designs in Figma for CSS implementation

---

## Current State at Checkpoint

Splash screen approved and working. All other screens (Level Select, Camera Permission, Countdown, Gameplay, Time's Up) still use placeholder styles. Next step: implement background art for remaining screens as assets become available.
