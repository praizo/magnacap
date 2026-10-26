import type { ReactNode } from "react";
import { clientele } from "@/content/site";
import { CardSlider } from "./card-slider";

type Client = (typeof clientele)[number];

const iconProps = {
  viewBox: "0 0 24 24",
  className: "size-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Simple line icons for each supplied client type. Decorative only. */
export const clientIcons: Record<Client, ReactNode> = {
  "Banking institutions": (
    <svg {...iconProps}><path d="M3 9.5 12 4l9 5.5M5 10v8m4.67-8v8m4.66-8v8M19 10v8M3.5 20.5h17" /></svg>
  ),
  "Pension fund administrators": (
    <svg {...iconProps}><path d="M12 3a8.5 8.5 0 0 1 8.5 8.5h-17A8.5 8.5 0 0 1 12 3Zm0 8.5v7a2 2 0 0 1-4 0" /></svg>
  ),
  "Asset managers": (
    <svg {...iconProps}><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12Z" /><path d="M15 3.8A8.5 8.5 0 0 1 20.2 9H15Z" /></svg>
  ),
  "Insurance companies": (
    <svg {...iconProps}><path d="M12 3 5 5.75v5c0 4.25 2.9 7.5 7 9.25 4.1-1.75 7-5 7-9.25v-5Z" /><path d="m9 12 2 2 4-4.5" /></svg>
  ),
  "High-net-worth individuals": (
    <svg {...iconProps}><path d="M7 4h10l4 5-9 11L3 9Zm-4 5h18M12 20 8.5 9 12 4l3.5 5Z" /></svg>
  ),
  "Retail investors": (
    <svg {...iconProps}><circle cx="12" cy="8" r="3.75" /><path d="M4.5 20.25a7.5 7.5 0 0 1 15 0" /></svg>
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

/** The six client types as tall tinted cards in a slider. */
export function ClienteleSlider({ perView = 3 }: { perView?: 2 | 3 }) {
  return (
    <CardSlider label="Client types" perView={perView}>
      {clientele.map((client, i) => (
        <div key={client} className={`clientele-tile clientele-tile-${i % 6}`}>
          <span aria-hidden="true" className="clientele-tile-icon">{clientIcons[client]}</span>
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
