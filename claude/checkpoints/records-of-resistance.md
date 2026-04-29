# Records of Resistance — Demon Slayer Hunters

> All moments where AI output was rejected, revised, or redirected.
> The assignment requires 3. This project documents ALL of them.

---

## Format

```
### RoR [N] — [Date] — [Topic]

**What AI gave:**
**What I did instead:**
**Why:**
```

---

## Records

---

### RoR 1 — 2026-04-27 — README Created Too Early

**What AI gave:**
A fully written `README.md` as part of the initial project setup scaffold.

**What I did instead:**
Rejected it. README will be created at the end of the project.

**Why:**
README should reflect the finished, working project — not be a speculative placeholder written before any code exists.

---

### RoR 2 — 2026-04-27 — Time Limits Were Different Per Level

**What AI gave:**
`gameData.json` with `timeLimit: 60` (Easy), `timeLimit: 45` (Medium), `timeLimit: 30` (Hard).

**What I did instead:**
Changed all levels to `timeLimit: 30`.

**Why:**
All modes should have the same 30-second game duration. The difficulty difference comes from spawn rate and demon speed, not time.

---

### RoR 3 — 2026-04-27 — Records of Resistance Inside the Wrong File

**What AI gave:**
A Records of Resistance table embedded inside `AI-Direction-Log.md`.

**What I did instead:**
Moved it to its own file: `claude/checkpoints/records-of-resistance.md`.

**Why:**
The AI Direction Log is for conversation history only. Records of Resistance is a separate deliverable and should live in the checkpoints folder as its own document.

---

### RoR 4 — 2026-04-27 — Full Visual Redesign Rejected

**What AI gave:**
A 5-part visual redesign based on a Figma inspiration image: deep purple-black background, neon magenta finger trail with SVG glow, magenta accents replacing all red, a floating glass HUD panel with backdrop blur, and score popups (+10 GOOD / +10 PERFECT!) rising from slayed demon positions.

**What I did instead:**
Rejected all of it. Asked AI to save a checkpoint documenting what was tried, then revert all source files to Checkpoint 01 state.

**Why:**
Did not like any of the visual changes.

---

### RoR 5 — 2026-04-28 — Wrong Revert: Deleted Work Instead of Iterating

**What AI gave:**
When user said "revert" after a failed level select implementation, AI used `git restore` on modified files AND `rm -rf` on new untracked files (LevelCard.jsx, LevelCard.css, cards/ asset folder), deleting all the work instead of keeping the implementation for iteration.

**What I did instead:**
Asked AI to do a checkpoint, document the error, and re-implement the level select screen from scratch correctly.

**Why:**
"Revert" meant go back to the last stable state and try again — not permanently delete new work. The correct approach would have been to keep the files and fix the specific issue (broken diamond image downloads), not delete everything.

---

### RoR 6 — 2026-04-28 — Level Select Card Implementation Rejected

**What AI gave:**
A full LevelCard component (`LevelCard.jsx`, `LevelCard.css`) built from Figma card designs (nodes 114:377, 114:379, 114:420) with: card background images, inline SVG diamond badges, inline SVG dividers, level name/subtitle/description text overlay, and spawn rate pips. Also updated `LevelSelect.jsx` to use the new component and background image, and rewrote the level-select section in `screens.css`.

**What I did instead:**
Rejected the implementation before it ran. Asked AI to revert the modified files (`LevelSelect.jsx`, `screens.css`) back to their prior state. New files (`LevelCard.jsx`, `LevelCard.css`) kept intact, not deleted.

**Why:**
Not stated — user interrupted before build.

---

### RoR 7 — 2026-04-28 — Camera Permission Panel Rejected

**What AI gave:**
A full bordered panel floating over the background with "CAMERA ACCESS" title, bullet points, and ALLOW CAMERA button inside a styled panel container.

**What I did instead:**
Rejected the panel. Asked for floating text directly over the background art, no panel — same approach as level select.

**Why:**
The panel felt too heavy and inconsistent with the rest of the design language. The background image has enough visual weight on its own.

---

### RoR 8 — 2026-04-28 — Figma Export Abandoned Mid-Way

**What AI gave:**
Started building the Camera Permission screen in Figma using the `use_figma` Plugin API. Failed on a node ID reference error.

**What I did instead:**
Interrupted and redirected: "we are not designing in figma we are doing the project."

**Why:**
The priority is building the game, not designing in Figma. The Figma work was a detour.

---

### RoR 9 — 2026-04-29 — Camera Feed for Countdown Rejected

**What AI gave:**
Countdown screen with the live camera feed as background + a dark overlay on top, then transparent PNG countdown assets over it.

**What I did instead:**
Asked to remove the camera feed entirely and replace with the static `demon slayer 3 background.png` background art.

**Why:**
Didn't like the look of the camera as countdown background. Clean background art looked better.

---

### RoR 10 — 2026-04-29 — HUD Asset Image Rejected

**What AI gave:**
A HUD bar using `demon slayer 4 score combo time 1.png` as a frame image, with score/combo/time values overlaid on top.

**What I did instead:**
Asked to build a CSS version of the HUD instead of using the asset.

**Why:**
The asset rendered too large and was hard to control. A CSS version gives full control over sizing, glow intensity, and responsive scaling.

---

### RoR 11 — 2026-04-29 — Mirrored Camera Orientation Rejected

**What AI gave:**
Virtual background canvas showing the player mirrored (selfie style) over the game background.

**What I did instead:**
Asked for normal (non-mirrored) orientation.

**Why:**
Normal orientation feels more natural for a game where you're acting as a character in the world, not looking at yourself in a mirror.

---

### RoR 12 — 2026-04-29 — Segmentation Performance Broke Finger Trail

**What AI gave:**
First version of `useBodySegmentation` running a full rAF loop at 60fps alongside the MediaPipe Hands model. The finger trail stopped working and the segmentation sometimes didn't show up.

**What I did instead:**
Asked to fix it. AI throttled segmentation to every 4th frame (~15fps) and added a module singleton to preload the model during countdown.

**Why:**
Running both MediaPipe models at full framerate saturated the CPU, starving the hand tracking. Throttling freed enough cycles for the finger trail to work again.

---

### RoR 13 — 2026-04-29 — Game Over Buttons Too High

**What AI gave:**
Game Over screen with PLAY AGAIN and BACK TO MENU buttons positioned at `bottom: 12%`.

**What I did instead:**
Asked to move them lower. Changed to `bottom: 6%`.

**Why:**
At 12%, the buttons sat too high on the background art and didn't feel anchored to the bottom of the screen.

---

### RoR 14 — 2026-04-29 — Play Again Routed to Countdown

**What AI gave:**
PLAY AGAIN button on both Game Over and Times Up screens routing to `gameScreen: 'countdown'`.

**What I did instead:**
Changed to `gameScreen: 'levelSelect'`.

**Why:**
Player should go back to level selection when replaying — they may want to choose a different difficulty. Skipping straight to countdown assumes the same level, which is not the intended flow.

---

_[Add new records below as they occur throughout the project]_
