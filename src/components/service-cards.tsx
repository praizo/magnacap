import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, cx } from "./ui";

type Service = {
  key: "brokerage" | "advisory" | "custody" | "trading";
  title: string;
  kind: string;
  body: string;
  href: string;
  cta: string;
  art: ReactNode;
};

/*
 * Illustrations are flat geometric drawings in the brand palette. They are
 * decorative only and carry no data, prices or performance.
 */

/** Brokerage: two opposing arrows meeting at a MagnaCap node (buyer ⇄ seller). */
export const BrokerageArt = (
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" fill="none">
    <path d="M-20 110h250l-34-34m34 34-34 34" stroke="var(--svc-art-a)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M420 200H170l34-34m-34 34 34 34" stroke="var(--svc-art-b)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="166" y="121" width="68" height="68" rx="14" fill="var(--color-signal)" transform="rotate(45 200 155)" />
    <circle cx="200" cy="155" r="10" fill="var(--color-slate-deep)" />
  </svg>
);

/** Advisory: a portfolio ring split into allocations, cropped off the panel edge. */
export const AdvisoryArt = (
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" fill="none">
    <g transform="translate(250 190)" strokeWidth="64">
      <circle r="130" stroke="var(--svc-art-a)" />
      <circle r="130" stroke="var(--svc-art-b)" strokeDasharray="250 1000" transform="rotate(-90)" />
      <circle r="130" stroke="var(--color-paper)" strokeDasharray="150 1000" strokeDashoffset="-262" transform="rotate(-90)" />
    </g>
    <circle cx="250" cy="190" r="42" fill="var(--svc-art-b)" />
  </svg>
);

/** Custody and research: stacked report sheets on a secure base. */
export const CustodyArt = (
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" fill="none">
    <rect x="50" y="214" width="250" height="110" rx="18" fill="var(--svc-art-b)" />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${84 + i * 26} ${150 - i * 44})`}>
        <rect width="170" height="120" rx="12" fill={i === 2 ? "var(--color-paper)" : "var(--svc-art-a)"} />
        {i === 2 && (
          <g fill="var(--svc-art-b)">
            <rect x="22" y="24" width="82" height="10" rx="5" />
            <rect x="22" y="48" width="126" height="8" rx="4" opacity=".45" />
            <rect x="22" y="66" width="110" height="8" rx="4" opacity=".45" />
            <rect x="22" y="84" width="118" height="8" rx="4" opacity=".45" />
          </g>
        )}
      </g>
    ))}
    <circle cx="264" cy="238" r="12" fill="var(--color-signal)" />
  </svg>
);

/** Proprietary trading: a rising route over rising columns. */
/** Custodian services: a safe with its dial, on a secure base. */
export const VaultArt = (
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" fill="none">
    <rect x="80" y="70" width="220" height="200" rx="22" fill="var(--svc-art-b)" />
    <rect x="102" y="92" width="176" height="156" rx="14" fill="var(--svc-art-a)" />
    <circle cx="190" cy="170" r="44" fill="var(--svc-art-b)" />
    <circle cx="190" cy="170" r="30" stroke="var(--color-paper)" strokeWidth="6" />
    <path d="M190 140v20M220 170h-20M190 200v-20M160 170h20" stroke="var(--color-paper)" strokeWidth="6" strokeLinecap="round" />
    <rect x="262" y="140" width="10" height="60" rx="5" fill="var(--color-signal)" />
    <rect x="60" y="262" width="260" height="40" rx="14" fill="var(--svc-art-b)" />
  </svg>
);

export const TradingArt = (
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" fill="none">
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={70 + i * 80} y={230 - i * 46} width="56" height={120 + i * 46} rx="10" fill="var(--svc-art-a)" />
    ))}
    <path d="M40 220 140 150l60 40 130-120" stroke="var(--color-signal)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m290 64 44 2-2 44" stroke="var(--color-signal)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const services: Service[] = [
  {
    key: "brokerage",
    title: "Brokerage",
    kind: "Client service",
    body: "We act as intermediary between buyers and sellers, executing buy-side and sell-side mandates with competitive pricing, efficient execution and confidentiality.",
    href: "/services/brokerage",
    cta: "Brokerage services",
    art: BrokerageArt,
  },
  {
    key: "advisory",
    title: "Investment advisory",
    kind: "Client service",
    body: "Our team helps corporates and individuals plan their investments and maximise value from their portfolios.",
    href: "/services/investment-advisory",
    cta: "Advisory services",
    art: AdvisoryArt,
  },
  {
    key: "custody",
    title: "Custody & research",
    kind: "Client service",
    body: "Secure safekeeping, settlement and reporting for your assets, plus market, macroeconomic and company reports to inform every decision.",
    href: "/services#custody",
    cta: "Custody and research",
    art: CustodyArt,
  },
  {
    key: "trading",
    title: "Proprietary trading",
    kind: "Own account — not a client service",
    body: "Our trading desk trades MagnaCap's own capital across bonds, money market, equities and commodities to capture market opportunities for our shareholders.",
    href: "/services#proprietary-trading",
    cta: "How our desk trades",
    art: TradingArt,
  },
];

/**
 * Bento of the four service lines: tall cards at either end, two split cards
 * stacked in the middle. Each card pairs copy with a full-bleed art panel.
 */
export function ServiceCards() {
  return (
    <ul className="svc-grid">
      {services.map((service) => (
        <li key={service.key} className={cx("svc-card", `svc-${service.key}`)}>
          <Link href={service.href} className="svc-link group">
            <span className="svc-copy">
              <span className="svc-title">{service.title}</span>
              <span className="svc-kind">{service.kind}</span>
              <span className="svc-body">{service.body}</span>
              <span className="svc-cta">
                {service.cta}
                <ArrowIcon className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </span>
            <span className="svc-art" aria-hidden="true">
              {service.art}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
