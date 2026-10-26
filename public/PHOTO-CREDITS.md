# Hero photography

Stock photos sourced from Pexels on 26 October 2026 under the
[Pexels License](https://www.pexels.com/license/). These are illustrative stock
models and locations, not MagnaCap employees, customers, or offices.

| Page | Local file | Photographer / source |
| --- | --- | --- |
| Home | `/hero/business-discussion.jpg` | [August de Richelieu](https://www.pexels.com/photo/businessman-in-a-suit-4427617/) |
| About | `/pages/about-team-colour.jpg` | [Monstera Production](https://www.pexels.com/photo/focused-diverse-colleagues-analyzing-project-together-in-office-6238186/) |
| Services | `/pages/services.jpg` | [Mikhail Nilov](https://www.pexels.com/photo/business-people-in-a-business-meeting-9301312/) |
| Brokerage | `/pages/services-brokerage.jpg` | [Pexels photo 935949](https://www.pexels.com/photo/935949/) |
| Investment advisory | `/pages/services-investment-advisory.jpg` | [Christina Morillo](https://www.pexels.com/photo/photography-of-women-talking-to-each-other-1181717/) |
| Careers | `/pages/careers-portrait.webp` | [Christina Morillo](https://www.pexels.com/photo/two-women-holding-laptop-1181273/) |
| Insights | `/pages/insights-portrait.webp` | [Kaboompics](https://www.pexels.com/photo/a-woman-holding-a-paper-thinking-7876450/) |
| Contact | `/pages/client-support.jpg` | [Antoni Shkraba](https://www.pexels.com/photo/woman-in-brown-blazer-wearing-black-headset-5467576/) |

Downloaded from `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`
at 2400px wide, then JPEG-compressed locally, except the current insights photo:
downloaded at 1600px wide, cropped to 4:5 with the analyst and reports retained,
and saved as a 1440 × 1800 WebP. Its panel keeps that portrait ratio on all screens. Next.js supplies
responsive optimized images. The existing homepage image is retained separately.

The Careers photo was re-downloaded at 4000 × 2670 without the CDN's automatic
compression, then cropped to 2000 × 2500 and saved as a quality-90 WebP. Matching
the desktop panel's 4:5 shape avoids enlarging a short landscape image to fill it.

Art direction: preserve the existing full-width homepage photograph, slate scrim,
and rounded inner-page media panels. Use real workplace photography featuring
Black people, with a formal business discussion for the homepage, collaboration
for team/service pages, an analyst portrait for insights, and a headset portrait
for contact. LILY retains its product screenshots.
