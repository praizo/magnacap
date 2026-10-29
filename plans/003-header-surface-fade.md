# 003 — Fade the floating header surface with opacity, not an animated blur

- **Status**: DONE — feel check pending
- **Commit**: e9b9d16
- **Severity**: MEDIUM
- **Category**: Performance
- **Depends on**: 001 (uses `--ease-out`, `--duration-fast`)
- **Estimated scope**: 2 files (`site-header.tsx` class string, `globals.css` header rules)

## Problem

On desktop inner pages the header starts flat. Once the page scrolls, `data-floating="true"` turns on a frosted surface. The transition animates `backdrop-filter` from `none` to `blur(24px) saturate(1.5)` over 300ms:

```tsx
/* src/components/site-header.tsx:86-88 — current */
<div
  data-floating={floating}
  className="site-header-panel pointer-events-auto relative z-10 flex h-16 w-full items-center gap-8 rounded-panel border ps-4 pe-2.5 transition-[background-color,border-color,backdrop-filter] duration-300 lg:ps-5"
>
```

```css
/* src/app/globals.css:131-152 — current */
.site-header-panel {
  --menu-surface: oklch(0.881 0.006 297);
  background-color: transparent;
  border-color: transparent;
}
@media (max-width: 63.99rem) {
  .site-header-panel {
    background-color: var(--menu-surface);
    border-color: color-mix(in oklch, var(--color-line) 70%, transparent);
    -webkit-backdrop-filter: blur(24px) saturate(1.5);
    backdrop-filter: blur(24px) saturate(1.5);
  }
}
.site-header-panel[data-floating="true"] {
  background-color: var(--menu-surface);
  border-color: color-mix(in oklch, var(--color-line) 70%, transparent);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  backdrop-filter: blur(24px) saturate(1.5);
}
```

Each frame of that transition re-blurs the page behind the header at a changing radius. The radius is above the 20px guideline and especially costly in Safari, and it runs every time the scroll crosses the threshold.

## Target

The surface (background and blur) moves to a `::before` layer that always has its final blur. Only that layer's `opacity` animates. The border stays on the element, as a cheap color transition.

```css
.site-header-panel {
  --menu-surface: oklch(0.881 0.006 297);
  border-color: transparent;
}
/* The frosted surface is a layer whose opacity fades; animating the blur itself would re-blur every frame. */
.site-header-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: var(--menu-surface);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  backdrop-filter: blur(24px) saturate(1.5);
  opacity: 0;
  pointer-events: none;
}
/* Below lg the bar always floats, as it does on the landing page; only desktop
   inner pages start flat and float on scroll. */
@media (max-width: 63.99rem) {
  .site-header-panel {
    border-color: color-mix(in oklch, var(--color-line) 70%, transparent);
  }
  .site-header-panel::before {
    opacity: 1;
  }
}
.site-header-panel[data-floating="true"] {
  border-color: color-mix(in oklch, var(--color-line) 70%, transparent);
}
.site-header-panel[data-floating="true"]::before {
  opacity: 1;
}
@media (prefers-reduced-motion: no-preference) {
  .site-header-panel {
    transition: border-color var(--duration-fast) var(--ease-out);
  }
  .site-header-panel::before {
    transition: opacity var(--duration-fast) var(--ease-out);
  }
}
```

The class string in `site-header.tsx` loses `transition-[background-color,border-color,backdrop-filter] duration-300`. Keep `relative`: the `::before` is positioned against it. Use `isolate` (Tailwind `isolation: isolate`) so `z-index: -1` stays inside the panel and doesn't drop behind the page.

## Repo conventions to follow

- The existing rule says the floating surface must live in explicit CSS, not utilities (comment at `globals.css:130`: "the floating surface must not depend on utility generation"). Keep it in `globals.css`.
- Motion is gated in `@media (prefers-reduced-motion: no-preference)` blocks. Exemplar: `globals.css:1358`.

## Steps

1. `src/components/site-header.tsx:88`: in the `className` string, delete `transition-[background-color,border-color,backdrop-filter] duration-300` and add `isolate` after `relative`.
2. `src/app/globals.css:131-152`: replace the three `.site-header-panel` rules with the target CSS. Keep the existing comment above the first rule and the "Below lg" comment.

## Boundaries

- Do NOT change the scroll logic that sets `floating` in `site-header.tsx`.
- Do NOT change the surface colour, blur radius, or saturation values.
- Do NOT touch the mobile navigation (`.mobile-navigation`, `.mobile-menu*`).
- Check that the header's children (logo, nav, CTA, mobile toggle) still sit above the `::before`. With `isolate` on the panel and `z-index: -1` on the pseudo they will. If anything disappears behind it, STOP and report.

## Verification

- **Mechanical**: `npm run lint`, `npx tsc --noEmit` pass.
- **Feel check**: at 1440px on `/about`, scroll down slowly past the top, then back up:
  - The frosted panel fades in over about 200ms, and the blur looks fully formed from the first visible frame. It never visibly sharpens or softens.
  - In DevTools Performance, scrolling across the threshold shows no long paint frames from the header.
  - At 390px the bar is frosted at all times, as before.
  - On `/`, the header looks exactly as before.
- **Done when**: no `backdrop-filter` value is transitioned anywhere in the header.
