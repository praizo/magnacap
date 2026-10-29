# 006 — Open the desktop Services dropdown from its trigger

- **Status**: DONE — feel check pending
- **Commit**: e9b9d16
- **Severity**: MEDIUM
- **Category**: Missed opportunity / Physicality & origin
- **Depends on**: 001 (uses `--ease-out`)
- **Estimated scope**: 2 files (`site-header.tsx` one className, `globals.css` one new block)

## Problem

The desktop Services dropdown toggles the `hidden` attribute, so it appears and disappears in a single frame with nothing linking it to its trigger. It is the only menu on the site without motion. The mobile menu has a full open/close.

```tsx
/* src/components/site-header.tsx:266-267 — current */
<div id={panelId} hidden={!open} className="absolute inset-s-0 top-full pt-2">
  <ul className="w-64 rounded-panel border border-line bg-paper p-1.5">
```

It opens on `mouseenter` and on click of the chevron button (`site-header.tsx:236`, `:258`), and closes on `mouseleave`, Escape and blur.

## Target

A small, fast entrance from the trigger's top-left corner, with a faster exit. Keep `hidden` (good for accessibility and for no-JS). Use `transition-behavior: allow-discrete` on `display`, plus `@starting-style`, so the panel animates both in and out of `display: none`.

```css
/* Desktop Services dropdown grows from its trigger; exit is quicker than entry. */
@media (prefers-reduced-motion: no-preference) {
  .nav-dropdown {
    transform-origin: top left;
    transition:
      opacity 100ms var(--ease-out),
      scale 100ms var(--ease-out),
      translate 100ms var(--ease-out),
      display 100ms allow-discrete;
  }
  .nav-dropdown[hidden] {
    opacity: 0;
    scale: 0.97;
    translate: 0 -4px;
  }
  .nav-dropdown:not([hidden]) {
    transition-duration: 150ms;
  }
  @starting-style {
    .nav-dropdown:not([hidden]) {
      opacity: 0;
      scale: 0.97;
      translate: 0 -4px;
    }
  }
}
```

The `[hidden]` rule is the exit target. `display: none` from the `hidden` attribute is held back for 100ms by `allow-discrete`, so the exit can play. The `:not([hidden])` duration override makes entry 150ms and exit 100ms.

Important: Tailwind preflight sets `[hidden]:where(:not([hidden="until-found"])) { display: none !important; }`. If that `!important` stops the exit from playing (the panel vanishes on close with no fade), override it in this block: `.nav-dropdown[hidden] { display: none; }` won't beat `!important`, so add `display: block !important;` to `.nav-dropdown[hidden]` together with `visibility: hidden;` and add `visibility 100ms allow-discrete` to the transition list. Then `hidden` panels still can't be seen or focused. Try the simple version first and use the override only if needed, and say which you used in your report.

## Repo conventions to follow

- Motion is gated in `@media (prefers-reduced-motion: no-preference)`.
- `@starting-style` is already used for an entrance at `src/app/globals.css` in the mobile menu block (search `@starting-style`).
- Header-related CSS sits near `.site-header-panel` at the top of `globals.css`. Put this block directly after the `.site-header-panel` rules.

## Steps

1. `src/components/site-header.tsx:266`: add `nav-dropdown` to the panel's className: `className="nav-dropdown absolute inset-s-0 top-full pt-2"`.
2. `src/app/globals.css`: add the target block after the `.site-header-panel[data-floating="true"]` rule (and after the reduced-motion transitions plan 003 adds there, if present).

## Boundaries

- Do NOT change the open/close logic, event handlers, or ARIA attributes.
- Do NOT change the `<ul>` styling.
- Do NOT add motion to the chevron (it already rotates with `transition-transform`).
- Under reduced motion the panel must show and hide instantly (no rule outside the `no-preference` block).

## Verification

- **Mechanical**: `npm run lint`, `npx tsc --noEmit` pass.
- **Feel check**: at 1440px, hover "Services" in the header:
  - The panel grows slightly from its top-left (near the trigger), not from the center, and settles within 150ms.
  - Moving the pointer away closes it faster (100ms), and it fades rather than vanishing.
  - Moving the pointer quickly on and off "Services" several times never shows a stuck half-open panel or a flicker. The transition reverses from where it is.
  - Tab to the chevron, press Enter to open and Escape to close. The links inside are not focusable while closed.
  - At 10% playback in DevTools > Animations, confirm the scale starts at 0.97, not from 0.
- **Done when**: the dropdown animates in and out from its trigger, and `hidden` panels are not reachable by keyboard.
