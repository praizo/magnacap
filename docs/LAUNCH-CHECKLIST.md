# Launch checklist — verification and missing assets

The rendered site carries no internal notes. Everything that still needs confirmation or supply is tracked here.

## Claims shown on the site that need client confirmation

| Claim (as shown) | Where | Source | Action |
| --- | --- | --- | --- |
| "Licensed by the Securities and Exchange Commission" | Hero, footer, About, home statement ("SEC-licensed") | content.md | Confirm the registration category and number, and the exact approved wording. |
| RC 1322472 | Hero, footer, logo | Supplied logo | Confirm against the CAC record. |
| Partner list (24 names) | Home | content.md ("Some of our Partners") | Confirm each relationship and permission to list it. Clarify "FBNM Bank", "UBA GIS", "FSDH", "ContiCap" and "Afrinvest WA". |
| Custodial services | Services | content.md | Custody normally requires separate SEC registration. Confirm MagnaCap's registration, or name the custodian. |
| "LILY app" as MagnaCap's own app | Home, LILY | content.md ("our … app") | The App Store and Google Play list the publisher as **LILY FINTECH LIMITED**. Confirm the relationship and the approved wording. |
| Proprietary trading wording | Home, Services | content.md | Confirm the wording, and whether a conflicts-of-interest statement is required. |
| Risk warning | Footer, Services, LILY | Added (not supplied) | Compliance to approve or replace. |

## Edits to supplied content (for client review)

- **Mission:** "dedicated workforce" became "a dedicated workforce".
- **Vision:** wording kept as supplied ("financial market company").
- **Advisory list:** the two supplied lists were merged into one: planning, portfolio reconstruction, stock recommendations and research.
- **Marketing language removed:** "superior returns", "best-in-class", "unparalleled" and "ensuring robust portfolio growth", because they imply guaranteed performance.
- **Market venues shown** are only those named in the supplied instrument text: FMDQ OTC, NGX (the "Nigerian stock exchange" in the source), NASD OTC and AFEX OTC.

## Assets

- [x] Logo: the official PNG lockup from the old site (`public/brand/magnacap-logo.png`).
- [ ] Logo masters: a vector (SVG) master and a white version for dark backgrounds are still needed.
- [x] Shield mark from the old site (`public/brand/magnacap-shield.png`). It is also used for the favicon and Apple touch icon.
- [x] LILY screens from lily.ng (`public/lily/portfolio.png`, `public/lily/home.png`). Both show sample balances. The Home screen is cropped above its "Up to 15% p/a" tiles. Confirm permission to reuse them.
- [ ] Higher-resolution LILY screenshots. `home.png` is only 360px wide.
- [ ] **Brand colour:** the logo navy is about `#2e3d5c`, but the supplied primary is `#4e4f6f`. Confirm which is primary.
- [ ] SEC logo, if permitted. Not shown at present.
- [x] Partner logos: 20 official files are in `public/partners/`. Sources, sizes and confidence for each are in `docs/partner-logos-manifest.json`. They come from each partner's own website, or Wikimedia Commons where the site blocked automated access. On the site they are shown in greyscale, switching to colour on hover. The Stanbic IBTC file exists only in white, so it is inverted to show on light backgrounds.
- [ ] **Partner logo permission:** get written permission from each partner to display its logo before launch.
- [ ] **Partners still shown as names, not logos:**
  - FBNM Bank: possibly FBNQuest Merchant Bank, which may have been renamed Quest Merchant Bank. Confirm the entity and which logo to use.
  - ContiCap: not identified. Provide the full legal name or website.
  - UBA GIS: only the UBA group logo was found, and it is low resolution. Ask UBA or the client for the right file.
  - Zenith UK: only the generic Zenith mark exists, which would duplicate Zenith.
- [ ] **Low-quality partner files to replace:**
  - FSDH: 160px JPEG.
  - Keystone: the file includes a tagline box.
  - Polaris: square JPEG with no transparency.
  - Ask these partners for official vector logos.
- [ ] Authentic photography (office, team, Lagos). The old site's stock and AI images were not reused.

## Functionality and legal

- [ ] Contact form backend: set `NEXT_PUBLIC_CONTACT_ENDPOINT`. Without it, the form opens the visitor's email app.
- [ ] Report publishing: decide whether reports will be published on `/insights`. At present, visitors request them by email.
- [ ] Careers mailbox: confirm `info@magnacap.org` is the right address.
- [ ] Contact details: confirm the phone numbers and the address.
- [ ] Legal pages: privacy policy (NDPA 2023), terms of use and a complaints procedure.
- [ ] Analytics and cookie consent, if required.

## About page team

- [ ] Replace the eight placeholder entries in `src/content/team.ts` with real names and roles.
- [ ] Add a square headshot (at least 600px) for each person to `public/team/` and set `photo`.
- [ ] Add photos for the inner-page headers: `public/pages/{about,services,insights,careers,contact}.jpg`.
