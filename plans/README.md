# Animation plans

Written by `improve-animations` at commit `e9b9d16`. Each plan is self-contained. Execute them in the order below.

| # | Plan | Severity | Depends on | Status |
| --- | --- | --- | --- | --- |
| 001 | [Motion tokens](001-motion-tokens.md) | LOW | — | DONE (feel check pending) |
| 002 | [Instrument panel swap](002-instrument-panel-swap.md) | HIGH | 001 | DONE (feel check pending) |
| 003 | [Header surface fade](003-header-surface-fade.md) | MEDIUM | 001 | DONE (feel check pending) |
| 004 | [Reduced motion, gentler](004-reduced-motion-gentler.md) | MEDIUM | 001, after 002–003 | DONE (feel check pending) |
| 005 | [Advisory accordion height](005-advisory-accordion-height.md) | MEDIUM | 001 | DONE (feel check pending) |
| 006 | [Services dropdown entrance](006-services-dropdown-entrance.md) | MEDIUM | 001 | DONE (feel check pending) |

## Order

001 runs first because every other plan reads its tokens. 004 runs after 002 and 003 because it audits all reduced-motion gating, including what those plans add.

## Not yet planned (from the audit)

- Inner-page header entrance trimmed to ~500ms (`globals.css:1375-1392`).
- Hover art durations 400ms → 260ms and de-stacking `.svc-card` hover (`globals.css:711`, `:1067`).
- Carousel dots animate `inline-size` (`globals.css:1029`).
- Form success-state entrances; intermediation diagram connector draw.
