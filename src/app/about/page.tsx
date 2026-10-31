import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BrandEmblem } from "@/components/brand-emblem";
import { ClienteleRow } from "@/components/clientele-grid";
import { PageHeader } from "@/components/sections";
import { Container } from "@/components/ui";
import { ValueArt } from "@/components/value-art";
import { assetClassesTraded, clientele, mission, partners, vision } from "@/content/site";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "MagnaCap Limited is an SEC-licensed brokerage and investment advisory company serving banking institutions, pension fund administrators, asset managers, insurance companies, high-net-worth individuals and retail investors.",
  alternates: { canonical: "/about" },
};

/** Counts derived from content.md itself; no external or performance figures. */
const facts = [
  { value: 3, label: "Business lines" },
  { value: assetClassesTraded.length, label: "Asset classes" },
  { value: clientele.length, label: "Client types" },
  { value: partners.marketInfrastructure.length + partners.institutions.length, label: "Partners" },
];

/** What drives us, in the client's own words. */
const drivers = [
  { title: "Efficient trading", body: "We ensure speedy execution of mandates at the best price." },
  { title: "Strong reputation", body: "We are reliable and trusted by all counterparties and stakeholders." },
  {
    title: "Market insight",
    body: "Our brokers provide actionable market insights to our clients, we also circulate periodic market reports.",
  },
  {
    title: "Confidentiality and anonymity",
    body: "Our traders ensure utmost discretion that our clients deserve in all their dealings with us.",
  },
  {
    title: "Price discovery",
    body: "We provide two-way quotes on most instruments, thereby helping our clients with price discovery.",
  },
];

const iconProps = { viewBox: "0 0 24 24", className: "size-5", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const purpose: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Our vision",
    body: vision,
    icon: <svg {...iconProps}><path d="M2.75 12S6 5.75 12 5.75 21.25 12 21.25 12 18 18.25 12 18.25 2.75 12 2.75 12Z" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    title: "Our mission",
    body: mission,
    icon: <svg {...iconProps}><circle cx="12" cy="12" r="8.25" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.75" fill="currentColor" /></svg>,
  },
];

const tileTints = ["oklch(0.9 0.04 283)", "oklch(0.92 0.06 60)", "oklch(0.9 0.03 250)", "oklch(0.91 0.05 40)"];

export default function AboutPage() {
  return (
    <>
      {/* Header (risevest.com) with the figures panel laid over the photo (afrinvest.com) */}
      <PageHeader
        eyebrow="About MagnaCap"
        image={{ src: "/pages/about-team-colour.jpg", alt: "A diverse team, including Black professionals, collaborating around a laptop in a bright office." }}
        title="Dependable, accountable,"
        quiet="and focused on quality of service."
        lead={
          <p>
            MagnaCap Limited is a SEC-licensed financial brokerage and investment advisory
            company. We deploy innovative strategies to maximize value for our clients.
          </p>
        }
        overlay={
          <>
            <p className="text-sm text-on-slate-muted">MagnaCap at a glance</p>
            <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <span className="tabular block text-[clamp(2.5rem,1.8rem+2.5vw,3.75rem)] font-medium leading-none tracking-[-0.04em]">
                    {fact.value}
                  </span>
                  <span className="mt-2 block text-sm">{fact.label}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />

      {/* About us: heading left, story right (risevest.com) */}
      <section aria-labelledby="about-title">
        <Container className="grid gap-8 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <h2 id="about-title" className="text-h2 font-semibold text-ink lg:col-span-4">About us</h2>
          <div className="space-y-6 text-lead text-muted lg:col-span-8">
            <p>
              MagnaCap Limited is an SEC-licensed financial brokerage and investment advisory
              company. We are known for our dependability, accountability and quality of service,
              and we deploy innovative strategies to ensure that our clients get maximum value.
            </p>
            <p>
              We facilitate and execute trades on behalf of our clients. Our execution service
              covers a wide range of asset classes, including fixed income, equities, money
              market, commodities and FX.
            </p>
            <p>
              We proudly serve a diverse buy and sell side clientele, and we also offer investment
              advisory: our team helps corporates and individuals plan and maximise value from
              their portfolios.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision and mission: icon, title, text (getequity.io) */}
      <section aria-label="Vision and mission">
        <Container className="grid gap-12 pbe-20 md:grid-cols-2 lg:pbe-28">
          {purpose.map((item) => (
            <div key={item.title}>
              <span className="grid size-11 place-items-center rounded-panel bg-slate/10 text-slate" aria-hidden="true">
                {item.icon}
              </span>
              <h2 className="mt-5 text-h3 font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 max-w-[44ch] text-lead text-muted">{item.body}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Who we serve: copy left, tinted client cards right (afrinvest.com "Leading the Charge") */}
      <section aria-labelledby="clients-title" className="overflow-clip bg-mist">
        <Container className="py-20 lg:py-28">
          <ClienteleRow />
        </Container>
      </section>

      {/* What drives us: art tile, title, description (afrinvest.com) */}
      <section aria-labelledby="values-title">
        <Container className="py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="values-title" className="text-h2 text-ink">What drives us</h2>
            <p className="mt-4 text-lead text-muted">
              Five commitments shape every mandate we take on and every relationship we keep.
            </p>
          </div>
          <ul className="values-grid">
            {drivers.map((driver, i) => (
              <li key={driver.title}>
                <div className="values-art"><ValueArt index={i} /></div>
                <h3 className="mt-5 text-h3 text-ink">{driver.title}</h3>
                <p className="mt-2 max-w-[36ch] text-muted">{driver.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Meet the team: tinted portrait tiles, name, role (risevest.com) */}
      <section aria-labelledby="team-title">
        <Container className="py-20 lg:py-28">
          <h2 id="team-title" className="text-center text-h2 text-ink">Meet the team</h2>
          <ul className="team-grid">
            {team.map((member, i) => (
              <li key={i} className="team-card">
                <div className="team-photo" style={{ background: tileTints[i % tileTints.length] }}>
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill sizes="(min-width: 64rem) 16rem, 45vw" className="object-cover" />
                  ) : (
                    <span className="team-silhouette" aria-hidden="true"><BrandEmblem /></span>
                  )}
                </div>
                <p className="mt-4 font-medium text-ink">{member.name}</p>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
