# 002 — Make the instrument tab panel swap fast and keyboard-safe

- **Status**: DONE — feel check pending
- **Commit**: e9b9d16
- **Severity**: HIGH
- **Category**: Purpose & frequency / Interruptibility
- **Depends on**: 001 (uses `--ease-out`, `--duration-fast`)
- **Estimated scope**: 1 file (`src/app/globals.css`), 1 rule

## Problem

The instrument tabs follow the ARIA tabs pattern, so Arrow Left/Right moves between tabs. The panel remounts on each change (`key={selected}`):

```tsx
/* src/components/instrument-tabs.tsx:58 — current */
<div key={selected} role="tabpanel" ... className="instrument-panel">
```

Each remount replays a 420ms keyframe that starts fully transparent and 1.75rem low:

```css
/* src/app/globals.css:1405 — current (after plan 001 the curve reads var(--ease-reveal)) */
  /* Instrument tab panel cross-fades when the tab changes (it remounts per tab). */
  .instrument-panel {
    animation: rise 420ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }
```

Arrowing through tabs quickly restarts the animation from `opacity: 0` on every keypress, so the panel flickers and never settles. 420ms is also over the 300ms UI budget, and keyboard-driven content should feel almost instant.

## Target

A short opacity-only fade. With no movement, a restart can only dip briefly, never jump.

```css
  /* Instrument tab panel fades when the tab changes (it remounts per tab). Opacity only, so arrowing through tabs never jumps. */
  .instrument-panel {
    animation: fade var(--duration-fast) var(--ease-out) both;
  }
```

`@keyframes fade` already exists at `src/app/globals.css:1341` (`from { opacity: 0 } to { opacity: 1 }`).

## Repo conventions to follow

- The rule stays inside the existing `@media (prefers-reduced-motion: no-preference)` block that begins at line 1358.
- Keyframes are reused, not duplicated. `fade` is already defined.

## Steps

1. In `src/app/globals.css`, replace the `.instrument-panel` animation rule and its comment (around line 1405) with the target above.

## Boundaries

- Do NOT edit `instrument-tabs.tsx`. Keep the `key={selected}` remount.
- Do NOT change the tab button transitions (lines ~1312–1319).
- Do NOT touch the `.instrument-tabs` entry in the scroll-reveal list. That is the wrapper's scroll reveal, a separate element.

## Verification

- **Mechanical**: `npm run lint` passes.
- **Feel check**: on `/services/brokerage` (or wherever `InstrumentTabs` renders: `grep -rn InstrumentTabs src/app`), focus a tab and hold Arrow Right:
  - Content changes read as near-instant, with no vertical slide.
  - At 10% playback in DevTools > Animations, the fade lasts 200ms with no translate.
- **Done when**: the panel animation is `fade 200ms` with no movement.
