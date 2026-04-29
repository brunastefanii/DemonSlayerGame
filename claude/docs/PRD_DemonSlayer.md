# PRD: Demon Slayer Hunters

---

## 1. Game Overview

### 1.1 Concept

Demon Slayer Hunters is a browser-based, camera-powered arcade game fusing the kinetic energy of K-pop Demon Hunters aesthetics with the fast-paced slashing mechanics of Fruit Ninja. Players use their real hand — tracked through the device camera — to slice incoming demon heads in half before time runs out.

### 1.2 Design Pillars

- **Physicality First** — the player's actual body IS the controller. Every interaction is gesture-driven.
- **Instant Gratification** — from screen-on to gameplay in under 15 seconds. Zero friction.

### 1.3 Target Audience

- **Primary:** Casual mobile/web gamers
- **Secondary:** Students and players who enjoy gesture-based or camera games
- **Platform context:** Desktop web browser with webcam access

---

## 2. Screen Map

| Screen | Entry Trigger | Key Elements | Exit Trigger |
|--------|--------------|--------------|--------------|
| 1. Splash / Welcome | App load | Game logo, animated demon silhouette, PLAY button, ambient music starts | User taps PLAY |
| 2. Level Select | PLAY pressed | 3 level cards (Easy / Medium / Hard) with descriptor text, back button | User selects a level |
| 3. Camera Permission | Level selected (first time) | Permission prompt overlay, allow / deny options, fallback message | Permission granted or denied |
| 4. Countdown | Camera active | Full camera feed, 3 → 2 → 1 → GO! animated overlay, demon silhouettes in background | GO! animation completes |
| 5. Gameplay | Countdown ends | Live camera, demon heads, finger trail, score counter (top), timer (top), combo indicator | Timer reaches 0:00 |
| 6. Time's Up | Timer hits 0 | Clock bell animation, 'TIME'S UP!' title, score reveal, grade badge, play again + menu buttons | User taps Play Again or Menu |

### 2.2 Screen-by-Screen Specifications

#### Screen 1 — Splash / Welcome
- Full-screen visually rich game scene — dark atmospheric background
- Animated demon silhouette rising from bottom of screen on load
- Game logo centered with subtle glow pulse animation
- PLAY button: large, chunky, high contrast — primary CTA
- Ambient audio begins looping on load (K-pop influenced instrumental)
- State written on PLAY: `gameScreen → 'levelSelect'`

#### Screen 2 — Level Select
- Three large cards displayed horizontally: Easy / Medium / Hard
- Each card shows: level name, short descriptor text, visual indicator of demon spawn rate
  - Easy: *'Warm Up — Cut demons at your own pace'*
  - Medium: *'Hunter Mode — The demons get faster'*
  - Hard: *'Demon Frenzy — Survive the onslaught'*
- Cards have hover/focus state with color shift and slight scale
- Back button returns to splash
- State written on selection: `selectedLevel → 'easy' | 'medium' | 'hard'`, `gameScreen → 'countdown'`

#### Screen 3 — Camera Permission (First-Time Gate)
- Shown only if `cameraAllowed === null`
- Friendly overlay explaining why camera is needed
- ALLOW button triggers browser camera permission prompt
- If denied: fallback message *'Camera access is required to play. Please allow camera and refresh.'*
- State written: `cameraAllowed → true | false`

#### Screen 4 — Countdown
- Full camera feed renders as background (live)
- Large centered countdown: 3 → 2 → 1 → GO! with bold animation on each beat
- Each number scales up and fades out with a sound cue (drum hit)
- GO! triggers game start: `gameActive → true`, `timeRemaining → difficulty time limit`

#### Screen 5 — Active Gameplay
- Camera feed as full background (player sees themselves)
- Demon heads spawn from random edges and move toward center
- Finger trail: glowing light path follows fingertip position in real time
- Slay detection: if trail intersects a demon's bounding box at sufficient velocity, demon is slayed
- On slay: demon splits in two halves with splatter liquid animation, kill count increments
- Top UI bar: score (left), timer (right), combo indicator (center)
- Timer behavior at 10 seconds: color shifts to red, seconds pulse (scale up/down) to draw attention
- Demons that exit the screen without being slayed disappear silently (no penalty on Easy/Medium)

#### Screen 6 — Time's Up
- Large clock bell animation plays in center of screen
- 'TIME'S UP!' text appears in bold, animated entrance
- Score revealed with animated count-up effect
- Grade badge displayed (S / A / B / C based on score threshold per difficulty)
- High score comparison: *'New Personal Best!'* if applicable
- Two CTAs: PLAY AGAIN (same level) and MAIN MENU
- State written: `gameScreen → 'timeUp'`, `gameActive → false`

---

## 3. The Three Panels

### Panel A — The Browser (Game View Layer)

Renders the active game screen based on `gameScreen` state. This is the main canvas — it displays whatever the current game phase is (splash, level select, countdown, active gameplay, or time's up). It reads from shared state and never writes directly.

- **Reads:** `gameScreen`, `selectedLevel`, `gameActive`, `activeDemonHeads`, `fingerTrail`, `score`, `timeRemaining`
- **Writes:** nothing — it only reacts.

### Panel B — The Detail View (HUD / Feedback Layer)

Displays real-time in-game data: the score counter, timer, combo indicator, and per-demon kill feedback. Reacts instantly whenever `score`, `timeRemaining`, or `currentCombo` changes in shared state.

- **Reads:** `score`, `timeRemaining`, `currentCombo`, `demonsSlayed`, `selectedLevel`
- **Writes:** nothing — reactive only

### Panel C — The Controller (Input & Game Logic Layer)

Manages all user input — camera gesture capture, finger tracking, demon hit detection, and timer countdown. It is the only component that writes to shared state during active gameplay.

- **Reads:** `gameActive`, `selectedLevel`, `timeRemaining`, `activeDemonHeads`
- **Writes:** `score`, `demonsSlayed`, `currentCombo`, `timeRemaining`, `activeDemonHeads`, `fingerTrail`, `gameScreen` (when timer expires)

---

## 4. Audio Design

### 4.1 Music

- **Splash screen:** Ambient, low K-pop instrumental loop (synthesizer + light drums)
- **Gameplay:** Upbeat K-pop inspired loop — escalates energy in final 10 seconds
- **Time's Up:** Music cuts to bell ring SFX then silence
- All music loops seamlessly with no audible gap

### 4.2 Sound Effects

| Trigger | SFX Description |
|---------|----------------|
| Countdown 3 / 2 / 1 | Deep drum hit, pitch increases each count |
| GO! | Energetic synth burst |
| Demon slay | Sharp slash sound + wet splatter impact |
| Combo achieved | Ascending chime / synth stab |
| Timer at 10 sec | Heartbeat-like pulse begins underneath music |
| Timer at 5 sec | Rapid ticking replaces pulse |
| Time's Up | Large bell ring / gong |

---

## 5. Visual Design System

### 5.1 Art Direction

**Style:** Dark K-pop idol aesthetic — deep purple-black backgrounds, neon red/purple accents, hexagonal UI geometry, Oswald typography, drop-shadow glow on all interactive elements.

**Demons:** Demon heads are stylized villain archetypes: dark idol energy, dramatic hair silhouettes, sharp makeup aesthetics, neon accents on dark backgrounds.
