# Checkpoint 06 — 2026-04-28 — Camera Permission Screen

## What was built
Full Camera Permission screen implemented and styled.

## Key decisions
- Background: `demon slayer 3 background 1.png` — dark purple pagoda scene with "CAMERA ACCESS" title and ninja image baked in
- Panel removed — content floats directly over background art (same philosophy as level select)
- Right-side floating content: WHY DO WE NEED IT title (white), 3 bullets, ALLOW CAMERA button, privacy note
- ALLOW CAMERA button: hexagonal clip-path matching PLAY button style, `#ff1070` pink/red glow on parent wrapper (will-change: filter pattern)
- Caption: "Your camera powers the hunt." overlaid at bottom of ninja image area
- Bottom privacy bar: same octagonal purple style as level select tip bar
- `text-align: left` on `.cp-content` to align title with bullet icons

## CSS values (final)
- `.cp-content`: `right: 20%`, `top: 55%`, `width: min(380px, 36%)`
- `.cp-image-caption`: `left: 31%`, `bottom: 23%`
- `.cp-bar`: `bottom: 11%`
- `.cp-allow-wrap`: `margin-top: 5rem`

## Records of Resistance
- Panel approach rejected — user wanted no panel, just floating text over background
- Multiple position iterations for privacy bar, caption, content area
- Glow on ALLOW CAMERA button initially clipped (same fix as PLAY button: filter on parent wrapper)
- `<br />` for line break caused alignment issues — fixed with flex column span

## Files changed
- `src/components/screens/CameraPermission.jsx` — full rewrite (no panel)
- `src/components/screens/screens.css` — all `.cp-*` classes added
- `src/assets/images/demon slayer 3 background 1.png` — new background image
