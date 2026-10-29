# 005 — Animate the advisory accordion's height, both ways

- **Status**: DONE — feel check pending
- **Commit**: e9b9d16
- **Severity**: MEDIUM
- **Category**: Interruptibility / Missed opportunity
- **Depends on**: 001 (uses `--ease-out`, `--duration-base`)
- **Estimated scope**: 1 file (`src/app/globals.css`)

## Problem

The "What our advisors do" list on `/services/investment-advisory` uses native `<details>`:

```tsx
/* src/components/service-detail-page.tsx:78-84 — current */
<details className="group">
  <summary>
    {item.title}
    <span aria-hidden="true" className="advisory-toggle" />
  </summary>
  <p className="max-w-[60ch] pbe-6 text-muted">{item.body}</p>
</details>
```

Only the paragraph animates, with a keyframe:

```css
/* src/app/globals.css:1409-1412 — current */
  /* Advisory rows ease their description in when opened. */
  .advisory-list details[open] p {
    animation: rise 360ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }
```

The row's height snaps open and the rows below jump down. Closing snaps shut with no motion. Toggling quickly restarts the keyframe from zero.

## Target

Copy the pattern the mobile menu already uses for its Services disclosure: a `::details-content` block-size transition with `interpolate-size`. The paragraph gets a short opacity fade. Browsers without `::details-content` support keep today's instant open, which is acceptable.

```css
  /* Advisory rows open and close by height; the description fades in as the row opens. */
  .advisory-list details {
    interpolate-size: allow-keywords;
  }
  .advisory-list details::details-content {
    block-size: 0;
    overflow: clip;
    transition:
      block-size var(--duration-base) var(--ease-out),
      content-visibility var(--duration-base) allow-discrete;
  }
  .advisory-list details[open]::details-content {
    block-size: auto;
  }
  .advisory-list details p {
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-out);
  }
  .advisory-list details[open] p {
    opacity: 1;
  }
```

This uses `block-size`, which triggers layout. That is acceptable here: it's an occasional, user-initiated disclosure, and the repo already does it at `globals.css:1734-1740`. Do not try to fake it with transforms.

## Repo conventions to follow

Exemplar to imitate, `src/app/globals.css:1734-1740`:

```css
  .mobile-services { interpolate-size: allow-keywords; }
  .mobile-services::details-content {
    block-size: 0;
    overflow: clip;
    transition: block-size 240ms var(--menu-ease), content-visibility 240ms allow-discrete;
  }
  .mobile-services[open]::details-content { block-size: auto; }
```

## Steps

1. In `src/app/globals.css`, inside the `@media (prefers-reduced-motion: no-preference)` block starting at line 1358, replace the `.advisory-list details[open] p` rule and its comment (lines 1409–1412) with the target CSS.

## Boundaries

- Do NOT change markup in `service-detail-page.tsx`.
- Do NOT change `.advisory-toggle` (its rotate transition already works).
- The `opacity: 0` on `details p` must stay **inside** the `no-preference` block. Under reduced motion the paragraph must stay visible.

## Verification

- **Mechanical**: `npm run lint` passes.
- **Feel check**: on `/services/investment-advisory`, in Chrome:
  - Opening a row grows it smoothly over about 240ms, and the rows below slide down rather than jump.
  - Closing shrinks it over the same 240ms. The text stays visible until the row is mostly closed, then clips.
  - Click a row open and closed rapidly. The height reverses from where it is and never restarts from zero.
  - With reduced motion emulated, rows open instantly and the text is fully visible.
  - In Safari, if `::details-content` isn't supported, rows still open and close instantly and the text is visible.
- **Done when**: rows open and close with height motion, and no keyframe remains on the advisory paragraph.
