# MagnaCap website — design direction (revision 2)

## Research basis

The Refero Design skill is the methodology. The live Refero MCP (styles, screens and flows) was **not connected**. The evidence for this revision is:

- live captures of mercury.com and ramp.com: nine viewport segments each, taken on 2026-10-23
- the skill's bundled craft references
- earlier captures of Evercore, Goldman Sachs, Rothschild & Co, Jane Street, Coronation, Stanbic IBTC Capital, Meristem and Cowrywise

No other reference research was performed.

## Why revision 1 failed

| Trait | Adopted in revision 1? | In the render? |
| --- | --- | --- |
| Ramp: CTA-only accent | Yes | Yes |
| Ramp: small monospace metadata labels | Yes | Yes |
| Ramp: medium-weight, sentence-case display type | No — 600-weight UPPERCASE | — |
| Ramp: two-tone (ink + grey) headline hierarchy | No | — |
| Ramp: product artefacts at scale on a dot-grid hero canvas | Shrunk into a small 8-chip panel | Read as a wireframe |
| Ramp: connected-systems diagram | No | — |
| Ramp: hairline logo-wall cells | No — chip clouds in rounded cards | — |
| Mercury: whole-canvas dark/light section shifts | Approximated as rounded boxes | Boxes, not canvases |
| Mercury: hairline list beside large media | No — card grids | About 30 filled cards on the homepage |

## Locked direction

**Primary: Ramp.** It provides the canvas, type, structure and the product-at-scale hero.

Mercury was rejected as the primary because its signature is cinematic photography, and MagnaCap has no authentic photography to support it. Mercury is borrowed for two details only:

1. a single full-bleed dark canvas section per page
2. a hairline feature list beside large product media (LILY)

### Five visual commitments

1. **Type:** one grotesk (Instrument Sans) at weight 500, sentence case, with a very large hero (`text-display`, up to 104px). Hierarchy comes from two-tone headlines: ink first, then `quiet` grey for the continuation. There is no bold and no uppercase display type. Monospace appears only in small metadata.
2. **Hero:** a full-width dot-grid canvas holding the intermediation diagram. Supplied client types sit on one side, the MagnaCap shield (authentic logo asset) in the centre, and the supplied markets on the other, joined by dashed connectors. It carries no data, prices or charts.
3. **Structure:** hairlines and cell grids, not filled cards. Each section has its own layout:
   - services → hairline table
   - advantages → dark five-column row
   - LILY → product canvas
   - partners → hairline cell wall
   - closing → centred statement
4. **Accent:** orange appears only on primary CTAs and the two connector nodes of the MagnaCap diagram.
5. **Imagery:** real assets only. These are the MagnaCap logo and shield (from magnacap.org) and two LILY screens (from lily.ng), shown large and cropped to bleed off the canvas. There are no empty frames and no stock or AI imagery.

## Tokens

See `src/app/globals.css`.

- **Brand colours:** slate `#4e4f6f` and orange `#f68f44` are client-supplied.
- **Orange contrast:** `#f68f44` is 2.35:1 on white, so it is never used as text on light surfaces.
- **`quiet` (`#868799`):** 3.54:1 on white, so it is only used at heading sizes (24px and above).
- **Shape:** 6px controls and 12–16px canvases. No shadows.

## Content rules

- Every statement traces to content.md, the supplied logo (RC number) or lily.ng (store links). Unsupported additions were removed in this revision.
- Verification tasks and missing assets live in `docs/LAUNCH-CHECKLIST.md`. The rendered pages carry no internal notes.
- **Contact form:** without `NEXT_PUBLIC_CONTACT_ENDPOINT`, it opens a pre-filled email and never claims to have sent anything. With the endpoint set, it confirms only on a 2xx response.

## Revision 3 — brand presence and hierarchy

This revision supersedes the revision 2 hero and single-dark-section restrictions.
The user requested a less bland site, with `content.md` retained as the content guide.

### Reference lock and decisions

Build target: the existing MagnaCap identity, supplied shield, slate/orange palette,
Instrument Sans typography, and authentic LILY screens. Refero live research was
attempted but unavailable because the subscription is inactive. This pass uses the
existing reference record above, captured local UI, and Refero's typography,
copywriting, and anti-generic-design guidance. Good CSS was added during the pass
and used for the new CSS implementation.

| Decision | Evidence / role | Purpose |
| --- | --- | --- |
| Retain “Unlocking value for you” and service categories | content.md | Respect the supplied messaging |
| Slate hero with a large decorative shield | Existing brand asset and colour roles | Make the first viewport recognisably MagnaCap |
| Group headline, service line, description and actions | Refero copy/hierarchy guidance | Create one reading sequence |
| Move intermediation diagram to About | Supplied About clientele content | Put detailed explanation after the introduction |
| Separate licensing and LILY strip | content.md home content | Keep reassurance and app discovery easy to find |
| Numbered service rows on a light tinted field | Existing hairline structure | Strengthen scanning and section rhythm |
| Subtle shield on inner headers; shorter closing supporting text | Existing brand and typography guidance | Carry the identity through shared components |
| Fluid hero sizing, logical CSS properties, clipped decoration, press feedback | Good CSS foundations, layout and interaction | Improve responsive and input behaviour |

The shield geometry is decorative artwork derived from the logo, not a replacement
for the authentic header logo. The small licensing shield is a generic icon, not an
SEC logo. Authentic SEC/partner logo assets are still absent from `public/`.
No fabricated performance figures, market prices, or return claims were added.

Validation: desktop homepage and About header; mobile homepage and Services header;
mobile menu open and route navigation. Lint and production build pass. Dev preview
required a restart with its generated Turbopack cache cleared to show fresh CSS.

## Revision 4 — light hero, partner logos, LILY panel

**References.** The user supplied brex.com and daylit.com as hero references, and both were captured live. They share:

- a light field
- a large left-aligned headline, a grey subline, one primary CTA and a secondary text link
- product imagery bleeding off the right and bottom edges
- a logo wall directly under the hero

**Hero.** Built on the good-css content grid, with an added `middle` line:

- **Copy** (`content-start / middle`): SEC licence badge, headline, CTAs and a LILY link.
- **Stage** (`middle / full-width-end`): a dot grid, the brand shield artwork and one authentic LILY phone.

The Revision 3 slate hero, its footnote and the separate trust strip were folded into this.

**Partners.** Moved directly under the hero. FMDQ, NGX and AFEX are featured in hairline cells, followed by a marquee of the other 21 partners:

- **Logos:** official files are shown in greyscale and switch to colour on hover; each is sized optically.
- **Pausing:** the row pauses on hover or focus, and has a visible pause button (WCAG 2.2.2).
- **Reduced motion:** the marquee becomes a static, wrapped logo wall.

**LILY.** Split canvas: copy with Invest, Save and Trade rows on the light field, and both authentic screens on a deep-slate panel. Fixed in passing: the aspect-ratio crop needs `min-block-size: 0` when the wrapper uses `overflow: clip`; without it, the "Up to 15% p/a" tiles showed.

**Firm statement.** The empty left column now carries the supplied "Who we serve" list.

## Revision 5 — photographic hero

The user supplied Afrinvest and a fintech hero as concept references ("same concept, not an exact copy") and asked for a Magnific stock photograph, which overrides the earlier "no stock imagery" rule for the home hero only.

- **Hero:** a full-bleed photo (`public/hero/hero.jpg`) under a slate-tinted scrim, so it reads as MagnaCap rather than a raw stock frame. The copy is anchored low on the left:
  - a glass badge with an orange dot ("Brokerage | Trading | Investment advisory", from content.md)
  - a two-tone headline, "Smarter trades, / superior returns.", with the second line in `on-slate-quiet`
  - a subline from content.md
  - an orange "Speak to a broker" CTA and a glass "Download LILY" button with store glyphs
- **Fallback:** the slate field behind the photo keeps the copy legible if the image is missing.
- **Shapes:** controls use the brand's 12px panel radius, not pills.
- **Header (home only):** a sticky frosted bar with 12px corners floating over the hero. Inner pages keep the hairline bar.
- **Removed:** the brex-style slab scene (`hero-scene.tsx`) and the email form.
