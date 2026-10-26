import type { ReactNode } from "react";
import { clientele } from "@/content/site";
import { CardSlider } from "./card-slider";

type Client = (typeof clientele)[number];

/** Small orange motif per client type, set at the top of the card. Decorative only. */
const clientArt: Record<Client, ReactNode> = {
  "Banking institutions": (
    <>
      <rect x="18" y="62" width="18" height="58" rx="4" opacity="0.35" />
      <rect x="46" y="40" width="18" height="80" rx="4" opacity="0.6" />
      <rect x="74" y="18" width="18" height="102" rx="4" />
    </>
  ),
  "Pension fund administrators": (
    <>
      <path d="M10 70a50 50 0 0 1 100 0Z" opacity="0.35" />
      <path d="M32 70a28 28 0 0 1 56 0Z" />
      <rect x="57" y="70" width="6" height="40" rx="3" opacity="0.6" />
    </>
  ),
  "Asset managers": (
    <>
      <path d="M60 60V12a48 48 0 1 1-48 48Z" opacity="0.35" />
      <path d="M68 52V8a44 44 0 0 1 44 44Z" />
    </>
  ),
  "Insurance companies": (
    <>
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.35" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.6" />
      <circle cx="60" cy="60" r="12" />
    </>
  ),
  "High-net-worth individuals": (
    <>
      <path d="M60 8 112 60 60 112 8 60Z" opacity="0.35" />
      <path d="M60 32 88 60 60 88 32 60Z" />
    </>
  ),
  "Retail investors": (
    <>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={24 + col * 36}
            cy={24 + row * 36}
            r={row === 2 && col === 2 ? 14 : 8}
            opacity={row === 2 && col === 2 ? 1 : 0.35 + (row + col) * 0.1}
          />
        )),
      )}
    </>
  ),
};

const kinds: Record<Client, "Institutional" | "Individual"> = {
  "Banking institutions": "Institutional",
  "Pension fund administrators": "Institutional",
  "Asset managers": "Institutional",
  "Insurance companies": "Institutional",
  "High-net-worth individuals": "Individual",
  "Retail investors": "Individual",
};

/** The six client types as tall black cards with an orange motif, in a slider. */
export function ClienteleSlider({ perView = 3 }: { perView?: 2 | 3 }) {
  return (
    <CardSlider label="Client types" perView={perView}>
      {clientele.map((client) => (
        <div key={client} className="clientele-tile">
          <svg aria-hidden="true" viewBox="0 0 120 120" className="clientele-tile-art" fill="currentColor">
            {clientArt[client]}
          </svg>
          <span className="clientele-tile-kind">{kinds[client]}</span>
          <span className="clientele-tile-name">{client}</span>
        </div>
      ))}
    </CardSlider>
  );
}

/** Who we serve, reimagined for About (after afrinvest.com's "Leading the Charge"):
 * copy left, a slider of tall tinted cards right, one per client type. */
export function ClienteleRow() {
  return (
    <div className="clientele-row-wrap">
      <div className="clientele-row-intro">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Who we serve</p>
        <h2 id="clients-title" className="mt-4 text-h2 text-ink">A diverse buy and sell side clientele.</h2>
        <p className="mt-4 text-lead text-muted">
          From banking institutions and PFAs to high-net-worth and retail investors, we execute
          and advise across the market.
        </p>
      </div>
      <ClienteleSlider />
    </div>
  );
}
