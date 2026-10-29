# 004 — Reduced motion: drop movement, keep fades and color feedback

- **Status**: DONE — feel check pending
- **Commit**: e9b9d16
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Depends on**: 001 (tokens); run after 002 and 003
- **Estimated scope**: 3 files (`globals.css`, `ui.tsx`, `service-cards.tsx`, `service-detail-page.tsx` — one class each)

## Problem

A blanket rule cuts every animation and transition to 0.01ms under `prefers-reduced-motion: reduce`:

```css
/* src/app/globals.css:154-161 — current */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Nearly all movement is already gated per rule with `@media (prefers-reduced-motion: no-preference)`, so the blanket rule mainly removes *color* and *opacity* feedback, such as link hovers, tab color changes and border changes. Reduced motion should mean fewer and gentler animations, not none. Opacity and color changes help comprehension and should stay.

Two movement transitions are not gated. Both are Tailwind classes on the arrow icon:

```tsx
/* src/components/ui.tsx:103 — current */
<ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
/* src/components/service-cards.tsx:142 and src/components/service-detail-page.tsx:108 — current */
<ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
```

## Target

1. The blanket rule is deleted.
2. The arrow nudges get `motion-reduce:transition-none`.
3. A reduced-motion block gives the page entrances an opacity-only fade (no translate, no stagger) and gives the mobile menu an opacity fade:

```css
/* Reduced motion keeps opacity and color feedback; it only drops movement. */
@media (prefers-reduced-motion: reduce) {
  :is(.hero-copy, .page-header .text-center) > * {
    animation: fade var(--duration-base) var(--ease-out) both;
  }
  .mobile-menu {
    transition:
      opacity var(--duration-fast) var(--ease-out),
      visibility var(--duration-fast) allow-discrete;
  }
  .mobile-navigation::details-content {
    transition: content-visibility var(--duration-fast) allow-discrete;
  }
}
```

`@keyframes fade` already exists at `src/app/globals.css:1341`.

## Repo conventions to follow

- Tailwind `motion-reduce:` variants are already used in `src/components/partner-marquee.tsx:64` (`motion-reduce:animate-none`).
- Put the new reduce block where the blanket rule was (line 154), so reduced-motion handling stays in one place near the top.

## Steps

1. `src/app/globals.css:154-161`: replace the blanket rule with the target reduce block above.
2. `src/components/ui.tsx:103`: add `motion-reduce:transition-none` to the `ArrowIcon` className.
3. `src/components/service-cards.tsx:142` and `src/components/service-detail-page.tsx:108`: add `motion-reduce:transition-none` to the `ArrowIcon` className.
4. Audit check, no edit: run `grep -nE "transition|animation" src/app/globals.css src/components/*.css` and confirm every rule that animates `translate`, `scale`, `rotate`, `transform`, `clip-path`, `inline-size` or `block-size` is inside a `prefers-reduced-motion: no-preference` block. **Exception**: the partner marquee is already handled with `motion-reduce:animate-none`. If you find an ungated movement rule, wrap it in `@media (prefers-reduced-motion: no-preference) { ... }` and note it in your report.

## Boundaries

- Do NOT remove any existing `no-preference` gating.
- Do NOT add movement of any kind to the reduce block.
- Do NOT touch the JS reduced-motion checks (`card-slider.tsx`, `advantage-section.tsx`, `react-bits/scroll-stack.tsx`). They are already correct.

## Verification

- **Mechanical**: `npm run lint`, `npx tsc --noEmit` pass. `grep -n "0.01ms" src/app/globals.css` returns nothing.
- **Feel check**: DevTools > Rendering > Emulate `prefers-reduced-motion: reduce`:
  - Reload `/about`. The header copy fades in at once over about 240ms with no upward movement or stagger.
  - Hover nav links, tabs and social icons. Color changes ease rather than snap.
  - At 390px, open and close the mobile menu. It fades with no clip-path wipe and no item slide.
  - Scroll the page. Nothing translates in.
- **Done when**: under reduce, no element moves, and color and opacity feedback still eases.
