# Checkpoint 05 — 2026-04-28 — Level Select Screen Approved

> AI 201 — Project 2: The Reactive Sandbox

---

## What Was Built

### Level Select Screen
- **Background**: `demon slayer level select.png` (1536×1024, 3:2) — purple demon forest scene with "SELECT LEVEL / CHOOSE YOUR HUNT" baked into the art. `background-size: contain` with `#050008` letterbox.
- **BACK button**: `position: absolute; top: 1.2rem; left: 1.2rem` — ghost style, upper left corner.
- **Card container**: `position: absolute; top: 42%` — positioned just below the "CHOOSE YOUR HUNT" text in the background art.

### LevelCard Component
- New `src/components/ui/LevelCard.jsx` + `LevelCard.css`
- Figma source: nodes 114:594 (Easy), 114:618 (Medium), 114:642 (Hard)
- Original Figma card: 355×559px → rendered at 195px wide (scale ≈ 0.549)
- **Card background art**: `card-easy.png`, `card-medium.png`, `card-hard.png`
- **Diamond badge**: hangs 19px above card top, centered; diamond SVG + sprite-cropped demon icon inside
- **Demon sprites**: `sprite-easy-medium.png` (shared by Easy/Medium, different crop positions), `sprite-hard.png`
- **Text overlay** at `top: 52%` inside card: level name (Impact, glowing), divider SVG (line◆line), subtitle, description, divider line, spawn rate (5 pips, active/dimmed)
- **Colors**: Easy `#47ff68`, Medium `#ffbd20`, Hard `#ff174f`
- **Spawn rate**: Easy 2/5 active, Medium 4/5, Hard 5/5

### Assets in `src/assets/images/cards/`
- `card-easy.png`, `card-medium.png`, `card-hard.png` — card background art (~850KB each)
- `sprite-easy-medium.png`, `sprite-hard.png` — demon sprite sheets (353KB each)
- `diamond-easy.svg`, `diamond-medium.svg`, `diamond-hard.svg` — vector diamonds (~388B each)

---

## Current State at Checkpoint

- Splash screen: ✅ working
- Level select: ✅ working — background art, BACK button, three Figma cards
- Camera permission, countdown, gameplay, times up: placeholder styles (untouched)
- Next: continue with remaining screens or visual polish
