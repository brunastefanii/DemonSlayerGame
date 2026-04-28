# Checkpoint 04 — 2026-04-28 — Level Select Attempt & Bad Revert

> AI 201 — Project 2: The Reactive Sandbox
> Saved to document a failed implementation and an incorrect revert action.

---

## What Was Attempted

### Level Select Screen Implementation
- Background image: `demon slayer 2 background.png` (1536×1024, 3:2 ratio, same as splash)
- Three Figma card designs fetched from nodes 114:377 (Easy), 114:379 (Medium), 114:420 (Hard)
- New files created: `src/components/ui/LevelCard.jsx`, `src/components/ui/LevelCard.css`
- Assets downloaded to `src/assets/images/cards/`: card backgrounds, diamond vectors, demon sprites, dividers
- `LevelSelect.jsx` updated to use background image + LevelCard component
- `screens.css` updated with level select section (background, back button, cards area)
- Back button positioned in upper left corner

### What Was Wrong
Implementation did not work as expected. The diamond vector images downloaded at only ~388 bytes each — too small to be valid PNG files. These were likely empty or error responses from the Figma asset CDN. This caused the top diamond badges on the cards to not render.

### The Incorrect Revert
User said "revert" — interpreted as reverting ALL level select work. Used `git restore` on modified files AND `rm` on new untracked files (LevelCard.jsx, LevelCard.css, cards/ folder). This was wrong. The correct action would have been to keep the implementation files so we could iterate and fix the specific issue (the broken diamond images), not delete everything.

---

## Records of Resistance

See RoR 5 in `records-of-resistance.md`.

---

## Current State at Checkpoint

- Splash screen: working correctly with `demon slayer 1.png` background + CSS PLAY button
- Level select: back to placeholder design (reverted)
- Next action: re-implement level select with background image, Figma cards, and back button in upper left
