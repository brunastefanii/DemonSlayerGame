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

## Checkpoint Index

| Checkpoint | Date | Summary |
|-----------|------|---------|
| — | — | — |

_[Checkpoint docs live in `claude/checkpoints/`. Add a row here each time one is created.]_
