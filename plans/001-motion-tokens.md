# 001 — Consolidate easing and duration into shared motion tokens

- **Status**: DONE — feel check pending
- **Commit**: e9b9d16
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (`src/app/globals.css`), ~15 small edits

## Problem

There are no motion tokens. The same two curves are hand-typed throughout `src/app/globals.css`:

- `cubic-bezier(0.2, 0.7, 0.2, 1)` (the "reveal" curve) at lines 711, 1067, 1361, 1373, 1378, 1397, 1407, 1411.
- `cubic-bezier(0.22, 1, 0.36, 1)` at lines 1500, 1501, and as a scoped variable:

```css
/* src/app/globals.css:1514 — current */
.mobile-navigation {
  --menu-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --menu-duration: 320ms;
  --menu-feedback: 140ms;
  --menu-inset: max(var(--gutter), clamp(1.5rem, 5vw, 3rem));
}
```

Plans 002–006 rely on global tokens, so they must exist first.

## Target

A global, unlayered `:root` block of motion tokens. Every existing hand-typed curve now reads from a token. **This plan must cause no visible change.**

```css
/* Motion tokens. UI response curve, the slower reveal curve, and the duration scale. */
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-reveal: cubic-bezier(0.2, 0.7, 0.2, 1);
  --duration-press: 160ms;
  --duration-fast: 200ms;
  --duration-base: 240ms;
}
```

`--ease-out` deliberately replaces `cubic-bezier(0.22, 1, 0.36, 1)`. The two curves are perceptually identical.

## Repo conventions to follow

- Global custom properties live in an unlayered `:root` block. Exemplar: the gutter block at `src/app/globals.css:164` (`:root { --gutter: 1rem; }`). Put the new block **immediately above** the `/* Gutter system ... */` comment at line 163.
- Do NOT put these in the `@theme` block. Tailwind v4's `@theme` namespace `--ease-*` would rewrite Tailwind utilities.
- Comments are short, one line, sentence case.

## Steps

1. Insert the `:root` motion-token block above `/* Gutter system shared by Container and full-bleed split fields. */`.
2. Replace every literal `cubic-bezier(0.2, 0.7, 0.2, 1)` in `src/app/globals.css` with `var(--ease-reveal)`. There are 8 occurrences. Change only the curve, not the durations.
3. Replace both literal `cubic-bezier(0.22, 1, 0.36, 1)` at lines 1500–1501 with `var(--ease-out)`.
4. In `.mobile-navigation` (line 1514), change `--menu-ease: cubic-bezier(0.22, 1, 0.36, 1);` to `--menu-ease: var(--ease-out);`. Keep the other three variables.
5. Line 1029–1031 (`.card-slider-dot span`): change `ease-out` to `var(--ease-out)` in both transitions.
6. Lines 1316–1318 and 1321 (`.instrument-tab`, `.service-nav-link`, `.advisory-toggle::after`): change `ease-out` to `var(--ease-out)`.
7. Lines 419 and 424–425 (`.service-row`, `a.button-link, button`): change `ease-out` to `var(--ease-out)`, and `160ms` to `var(--duration-press)` on the `scale` transition.

## Boundaries

- Do NOT change any duration value except the `160ms` → `var(--duration-press)` swap in step 7 (same value).
- Do NOT touch `transition: ... ease` rules (hover color changes, e.g. lines 1049, 1147). `ease` is correct for color.
- Do NOT touch `.tsx` files, `service-stack.css`, or `react-bits/`.
- Do NOT touch the GSAP `ease: "power2.out"` in `advantage-section.tsx`.
- If a cited line doesn't match, STOP and report.

## Verification

- **Mechanical**: `grep -c "cubic-bezier" src/app/globals.css` returns 3 (only the token definitions). `npm run lint` and `npx tsc --noEmit` pass.
- **Feel check**: load `/`, `/services`, open the mobile menu at 390px width. Nothing should look or feel different.
- **Done when**: every motion curve in `globals.css` reads from a `--ease-*` token.
