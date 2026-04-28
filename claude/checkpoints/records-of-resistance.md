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

_[Add new records below as they occur throughout the project]_
