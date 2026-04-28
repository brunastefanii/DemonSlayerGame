# AI Direction Log — Demon Slayer Hunters

> AI 201 — Project 2: The Reactive Sandbox
> This log records every AI conversation session: what was asked, what was produced, what was changed/rejected/kept and why.
> Records of Resistance live separately in `claude/checkpoints/records-of-resistance.md`.

---

## Entry Format

```
### Entry [N] — [Date] — [Topic]

**What I asked AI to do:**
**What AI produced:**
**What I kept:**
**What I changed/rejected:**
**Why:**
**Checkpoint:** [YES / NO — link if applicable]
```

---

## Entries

---

### Entry 1 — 2026-04-27 — Project Setup & File Structure

**What I asked AI to do:**
Read all docs in `claude/docs/` and create the project file structure for DemonSlayerGame, mirroring what was done for CharacterSelectionScreen. Also create the AI Direction Log.

**What AI produced:**
- Folder structure: `src/components/panels/`, `src/components/screens/`, `src/assets/audio/`, `src/assets/images/`, `src/data/`, `src/hooks/`, `.github/workflows/`, `claude/checkpoints/`, `claude/design-intent/`
- `README.md` (attempted)
- `AI-Direction-Log.md`

**What I kept:**
- All directory structure
- `AI-Direction-Log.md`

**What I changed/rejected:**
- Rejected `README.md` — will be created at end of project only

**Why:**
README should reflect the finished project, not be a placeholder written at setup.

**Checkpoint:** NO

---

### Entry 2 — 2026-04-27 — GitHub Remote & First Push

**What I asked AI to do:**
Connect the GitHub repo and push the current files.

**What AI produced:**
- Confirmed remote `origin` was already pointing to `https://github.com/brunastefanii/DemonSlayerGame.git`
- Committed and pushed structure files
- `claude/.DS_Store` was accidentally included in the commit

**What I kept:**
- The push and commit

**What I changed/rejected:**
- Asked AI to add `.gitignore` to prevent `.DS_Store` from being tracked again
- AI removed the already-tracked `.DS_Store` files and pushed a cleanup commit

**Why:**
`.DS_Store` is a macOS system file, not project code. Should never be in a repo.

**Checkpoint:** NO

---

### Entry 3 — 2026-04-27 — Phase 1: Vite + React Scaffold

**What I asked AI to do:**
Initialize the Vite + React project and set up GitHub Pages auto-deploy.

**What AI produced:**
- `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/App.css`
- `.github/workflows/deploy.yml`
- Centralized state shape defined in `App.jsx`

**What I kept:**
- Everything

**What I changed/rejected:**
- Nothing rejected in this session

**Why:**
—

**Checkpoint:** NO

---

### Entry 4 — 2026-04-27 — Phase 2: Three-Panel System & All Screens

**What I asked AI to do:**
Build the three panels (BrowserPanel, HUDPanel, ControllerPanel), all six screens, UI components (DemonHead, FingerTrail), and wire centralized state.

**What AI produced:**
- `BrowserPanel.jsx` — renders active screen based on `gameScreen` state
- `HUDPanel.jsx` — score/timer/combo overlay, only visible during gameplay
- `ControllerPanel.jsx` — game timer with functional update to avoid stale closures
- All six screens: Splash, LevelSelect, CameraPermission, Countdown, Gameplay, TimesUp
- `DemonHead.jsx`, `FingerTrail.jsx`
- `gameData.json` with level configs and grade thresholds
- `screens.css` with placeholder styles

**What I kept:**
- Everything

**What I changed/rejected:**
- Nothing rejected in this session

**Why:**
—

**Checkpoint:** NO

---

### Entry 5 — 2026-04-27 — Phase 3: Demon Spawning & Movement

**What I asked AI to do:**
Add demon spawning from random screen edges and animate them moving toward the center. No slash detection — deferred to Phase 4.

**What AI produced:**
- Updated `ControllerPanel.jsx` with three `useEffect` hooks: timer, demon spawning, demon movement (~30fps)
- Updated `DemonHead.jsx` with pulse animation and red glow

**What I kept:**
- Everything

**What I changed/rejected:**
- Nothing rejected in this session

**Why:**
—

**Checkpoint:** NO

---

### Entry 6 — 2026-04-27 — Time Limit Adjustment

**What I asked AI to do:**
Change the time limit to 30 seconds for all levels (Easy was 60s, Medium was 45s).

**What AI produced:**
- Updated `gameData.json` — `timeLimit: 30` for Easy and Medium

**What I kept:**
- The change

**What I changed/rejected:**
- Nothing rejected

**Why:**
All modes should have the same 30-second time limit for consistency.

**Checkpoint:** NO

---

### Entry 7 — 2026-04-27 — Documentation Structure Correction

**What I asked AI to do:**
Clarify that the AI Direction Log is for chat history only. Records of Resistance should be a separate file inside `claude/checkpoints/`. Created `records-of-resistance.md` there.

**What AI produced:**
- Updated `AI-Direction-Log.md` (this file) — removed the embedded Records of Resistance table
- Created `claude/checkpoints/records-of-resistance.md`

**What I kept:**
- The new structure

**What I changed/rejected:**
- Removed Records of Resistance from this file — it was in the wrong place

**Why:**
Records of Resistance and chat history serve different purposes and should be separate documents.

**Checkpoint:** NO

---

---

### Entry 8 — 2026-04-27 — Phase 4: Camera & Hand Tracking

**What I asked AI to do:**
Add MediaPipe Hands integration so the camera tracks the user's fingertip in real time, and use that position to detect demon slays.

**What AI produced:**
- `useHandTracking.js` — MediaPipe Hands + Camera utility using callbackRef pattern
- Finger x-coordinate mirrored (`1 - tip.x`) to match `scaleX(-1)` video selfie view
- WASM loaded from CDN to avoid Vite bundling issues
- Slash detection in `ControllerPanel.jsx`: `SLAY_RADIUS = 50px`
- Demons marked `slayed: true` + `slayTime` on contact, removed after 650ms
- `FingerTrail.jsx` renders last 15 fingertip positions as fading dots

**What I kept:**
- Everything

**What I changed/rejected:**
- Deferred slash detection testing to Phase 4 (not Phase 3) — user's decision

**Why:**
Wanted demons moving on screen first before adding the slay layer.

**Checkpoint:** NO

---

### Entry 9 — 2026-04-27 — Phase 5a: Slay Animation

**What I asked AI to do:**
Add a visual animation when a demon is slayed. Chose the CSS clip-path split option from three options presented.

**What AI produced:**
- `DemonHead.css` split animation: left half clips `polygon(0 0, 50% 0, 50% 100%, 0 100%)` flying left + rotating, right half flying right + rotating
- `.demon-splatter` radial burst overlay
- Demon element stays in DOM for 650ms (SLAY_LINGER) during animation, then filtered out by movement loop

**What I kept:**
- The clip-path split approach

**What I changed/rejected:**
- Three options were presented (clip-path, particle burst, scale + fade) — chose clip-path

**Why:**
Most dramatic and on-brand for a slashing game.

**Checkpoint:** NO

---

### Entry 10 — 2026-04-27 — Phase 5b: Audio System

**What I asked AI to do:**
Add sound effects for all game events. Placeholder/programmatic sounds are fine; include WAV swap instructions. Do all sounds at once. Format: WAV.

**What AI produced:**
- `useAudio.js` — singleton Web Audio API module
- All sounds generated via oscillators and noise buffers — no files needed
- `playHover` (level card), `playCountdown` (3/2/1), `playGo` (GO!), `playSlay` (slash), `playCombo` (every 3 slays), `playHeartbeat` (≤10s), `playTick` (≤5s), `playTimesUp` (gong), `playMusic`/`stopMusic` (ambient drone)
- Each function includes a comment explaining how to swap for a real WAV file

**What I kept:**
- Everything

**What I changed/rejected:**
- Nothing rejected

**Why:**
—

**Checkpoint:** NO

---

### Entry 11 — 2026-04-27 — Hover Sound on Level Cards

**What I asked AI to do:**
Add the missing hover sound to LevelSelect — when the user hovers over Easy, Medium, or Hard cards.

**What AI produced:**
- Added `onMouseEnter={playHover}` to each level card button in `LevelSelect.jsx`
- `playHover` was already built in `useAudio.js` — just needed to be wired up

**What I kept:**
- The change

**What I changed/rejected:**
- Nothing rejected

**Why:**
The hover sound was defined but never connected to any element.

**Checkpoint:** NO

---

### Entry 12 — 2026-04-27 — Figma Design Review

**What I asked AI to do:**
Review the Figma inspiration image to understand what visual changes to make before implementing them.

**What AI produced:**
- Retrieved Figma node 101:4 (design inspiration screen)
- Identified key visual differences from current build:
  - Background: deep purple-black (`#0a0010`) vs current dark grey
  - Finger trail: neon magenta (`#e040fb`) with glow vs current yellow
  - Accent / demon UI: magenta/purple vs current red (`#e63946`)
  - HUD panel: dark glass panel with blur vs current flat overlay
  - Score popups: floating `+10 GOOD` / `+30 PERFECT` text on slay
  - Demon splatter: deep crimson + pink vs current red

**What I kept:**
- Analysis only — no changes made yet (checkpoint first)

**What I changed/rejected:**
- Deferred all visual changes until after checkpoint commit

**Why:**
User requested checkpoint before implementing any visual changes.

**Checkpoint:** YES — checkpoint-01.md

---

### Entry 13 — 2026-04-28 — Splash Screen Visual Implementation

**What I asked AI to do:**
Implement the splash screen using a custom background image (no button in the art) and recreate the PLAY button in CSS to match the design.

**What AI produced:**
- `SplashScreen.jsx` updated: imports background image, removes placeholder logo/silhouette, renders `.splash-bg` + CSS PLAY button
- `index.html`: Google Fonts link for Oswald 700
- `screens.css`: full splash section rewritten — contain background, CSS octagonal PLAY button with neon glow, diamond pips, hover/active states
- Button anchored with `position: absolute; bottom: 12%` after repositioning fix

**What I kept:**
- Everything after the responsiveness fix

**What I changed/rejected:**
- Initial `background-size: cover` caused bottom of image to be cropped — changed to `contain`
- Initial `padding-bottom: 10%` caused button to overlap SLAY text — changed to `position: absolute; bottom: 12%`

**Why:**
Image is 3:2; 16:9 desktop with cover crops the bottom. Button needed absolute anchoring to stay consistent across screen widths.

**Checkpoint:** YES — checkpoint-03.md

---

### Entry 15 — 2026-04-28 — Level Select Screen: Background + Cards Approved

**What I asked AI to do:**
1. Use a new background image (purple demon forest scene with "SELECT LEVEL / CHOOSE YOUR HUNT" baked in) for the level select screen.
2. Move the BACK button to upper left corner.
3. Implement the three Figma card designs (nodes 114:594 Easy, 114:618 Medium, 114:642 Hard).
4. Adjust card vertical position to sit just below "CHOOSE YOUR HUNT" text.
5. Adjust text content inside cards to sit lower, closer to the bottom border.

**What AI produced:**
- `demon slayer level select.png` saved to `src/assets/images/`
- `LevelSelect.jsx` updated: background image + LevelCard component + BACK button top-left
- `LevelCard.jsx` (new): portrait card with card BG image, diamond badge with sprite-cropped demon icon, inline SVG dividers, level name/subtitle/desc, spawn rate pips
- `LevelCard.css` (new): 195px wide, 355/559 aspect ratio, diamond badge hanging 19px above, sprite crop windows, text overlay
- `screens.css`: level-select section replaced; cards container positioned at `top: 42%`
- Assets downloaded to `cards/`: new card backgrounds, `sprite-easy-medium.png`, `sprite-hard.png`, updated diamond SVGs
- Card content position tuned to `top: 52%` inside card

**What I kept:**
- Everything — background, BACK button, all three cards, final position values

**What I changed/rejected:**
- Position iterated: `bottom: 4%` → `top: 52%` → `top: 46%` → `top: 42%` (card container)
- Card content: `top: 44%` → `top: 52%` (text inside card)
- RoR 6 (previous full implementation attempt) was rejected before this — this attempt was approved

**Why:**
Cards needed to align visually with the background art.

**Checkpoint:** YES — checkpoint-05.md

---

### Entry 14 — 2026-04-28 — Level Select Card Implementation Rejected

**What I asked AI to do:**
Re-implement Level Select screen with background image, three Figma card designs, diamond badges, and BACK button in upper left corner.

**What AI produced:**
- `LevelCard.jsx` — new component with card BG images, inline SVG diamond badges and dividers, text overlay, spawn rate pips
- `LevelCard.css` — portrait card layout with hanging diamond badge
- Updated `LevelSelect.jsx` — background image + LevelCard components + repositioned BACK button
- Updated `screens.css` — rewrote level-select section

**What I kept:**
- `LevelCard.jsx` and `LevelCard.css` (kept for reference, not connected)

**What I changed/rejected:**
- Rejected full implementation before it ran
- Reverted `LevelSelect.jsx` and `screens.css` to prior state

**Why:**
Not stated — user interrupted before build.

**Checkpoint:** NO

---

## Checkpoint Index

| Checkpoint | Date | Summary |
|-----------|------|---------|
| [checkpoint-01.md](checkpoint-01.md) | 2026-04-27 | Full build through Phase 5 (audio + slay animation), before visual redesign |
| [checkpoint-02.md](checkpoint-02.md) | 2026-04-27 | Visual redesign attempt — all 5 changes rejected and reverted |
| [checkpoint-03.md](checkpoint-03.md) | 2026-04-28 | Splash screen background art + CSS PLAY button approved |
| [checkpoint-04.md](checkpoint-04.md) | 2026-04-28 | Level select attempt failed; bad revert deleted work instead of iterating |
| [checkpoint-05.md](checkpoint-05.md) | 2026-04-28 | Level select screen approved — background art, BACK button, three Figma cards |

_[Checkpoint docs live in `claude/checkpoints/`. Add a row here each time one is created.]_
