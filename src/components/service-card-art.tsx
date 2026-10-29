import type { ReactNode } from "react";
import type { ServiceSlug } from "@/content/services";

/*
 * Compact versions of the /services illustrations, drawn for the 16:10 cards
 * that link between services. Each motif is centred inside a 28px safe area of
 * a 320 × 200 frame (the panel draws the dot grid), so nothing is cropped at any width.
 * Colours come from the card's --svc-art-a / --svc-art-b; decorative only.
 */

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" fill="none">
      <g className="card-art-motif">{children}</g>
    </svg>
  );
}

/** Brokerage: buyer and seller arrows meeting at the MagnaCap node. */
const brokerage = (
  <Frame>
    <path d="M48 80h170l-22-22m22 22-22 22" stroke="var(--svc-art-a)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M272 124H102l22-22m-22 22 22 22" stroke="var(--svc-art-b)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="138" y="80" width="44" height="44" rx="10" fill="var(--color-signal)" transform="rotate(45 160 102)" />
    <circle cx="160" cy="102" r="7" fill="var(--color-slate-deep)" />
  </Frame>
);

/** Investment advisory: a whole portfolio ring split into allocations. */
const advisory = (
  <Frame>
    <g transform="translate(160 100)" strokeWidth="30">
      <circle r="56" stroke="var(--svc-art-a)" />
      <circle r="56" stroke="var(--svc-art-b)" strokeDasharray="140 400" transform="rotate(-90)" />
      <circle r="56" stroke="var(--color-paper)" strokeDasharray="80 400" strokeDashoffset="-148" transform="rotate(-90)" />
    </g>
    <circle cx="160" cy="100" r="14" fill="var(--svc-art-b)" />
  </Frame>
);

/** Trading: a rising route over rising columns, arrowhead inside the frame. */
const trading = (
  <Frame>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={76 + i * 46} y={136 - i * 22} width="30" height={36 + i * 22} rx="6" fill="var(--svc-art-a)" />
    ))}
    <path d="M60 128 116 92l34 22 84-70" stroke="var(--color-signal)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m206 44 30-1-1 30" stroke="var(--color-signal)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);

/** Custodian services: a padlock keeping two stacks of holdings, all on one base. */
const custody = (
  <Frame>
    <rect x="48" y="150" width="224" height="14" rx="7" fill="var(--svc-art-b)" />
    {[0, 1, 2].map((i) => (
      <rect key={`l${i}`} x={60 + (i % 2) * 5} y={135 - i * 16} width="52" height="15" rx="7.5" fill="var(--svc-art-a)" />
    ))}
    {[0, 1].map((i) => (
      <rect key={`r${i}`} x={208 + (i % 2) * 5} y={135 - i * 16} width="52" height="15" rx="7.5" fill="var(--svc-art-a)" />
    ))}
    <path d="M140 92V76a20 20 0 0 1 40 0v16" stroke="var(--svc-art-b)" strokeWidth="12" strokeLinecap="round" />
    <rect x="122" y="88" width="76" height="62" rx="12" fill="var(--svc-art-b)" />
    <circle cx="160" cy="113" r="8" fill="var(--color-signal)" />
    <rect x="156.5" y="116" width="7" height="17" rx="3.5" fill="var(--color-signal)" />
  </Frame>
);

/** Research: stacked report sheets, the top one with its lines. */
const research = (
  <Frame>
    <rect x="92" y="132" width="136" height="36" rx="10" fill="var(--svc-art-b)" />
    <rect x="98" y="88" width="104" height="66" rx="8" fill="var(--svc-art-a)" opacity=".7" />
    <rect x="110" y="64" width="104" height="66" rx="8" fill="var(--svc-art-a)" />
    <g transform="translate(122 36)">
      <rect width="104" height="70" rx="8" fill="var(--color-paper)" />
      <rect x="14" y="14" width="48" height="7" rx="3.5" fill="var(--svc-art-b)" />
      <rect x="14" y="30" width="76" height="5" rx="2.5" fill="var(--svc-art-b)" opacity=".4" />
      <rect x="14" y="42" width="66" height="5" rx="2.5" fill="var(--svc-art-b)" opacity=".4" />
      <rect x="14" y="54" width="72" height="5" rx="2.5" fill="var(--svc-art-b)" opacity=".4" />
    </g>
    <circle cx="214" cy="118" r="8" fill="var(--color-signal)" />
  </Frame>
);

export const serviceCardArt: Record<ServiceSlug, ReactNode> = {
  brokerage,
  "investment-advisory": advisory,
  trading,
  "custodian-services": custody,
  research,
};
