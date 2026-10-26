import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BrandEmblem } from "@/components/brand-emblem";
import { ClienteleRow } from "@/components/clientele-grid";
import { PageHeader } from "@/components/sections";
import { ButtonLink, Container } from "@/components/ui";
import { ValueArt } from "@/components/value-art";
import { assetClassesTraded, clientele, contact, mission, partners, values, vision } from "@/content/site";
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

/** One line per value, each taken from content.md's MagnaCap Advantage and About text. */
const valueNotes: Record<(typeof values)[number], string> = {
  Integrity: "Our traders ensure the utmost discretion our clients deserve in all their dealings with us.",
  Excellence: "Speedy execution of mandates at the best price.",
  "Client centricity": "Two-way quotes on most instruments, helping our clients with price discovery.",
  Accountability: "Reliable and trusted by all counterparties and stakeholders.",
  Competence: "An expert team of advisors with actionable market insight and periodic reports.",
};

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
        image={{ src: "/pages/about.jpg", alt: "The MagnaCap team at work in Lagos." }}
        title="Dependable, accountable,"
        quiet="and focused on quality of service."
        lead={
          <p>
            MagnaCap Limited is an SEC-licensed financial brokerage and investment advisory
            company. We deploy innovative strategies so that our clients get maximum value.
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
              Our core values guide every mandate we take on and every relationship we keep.
            </p>
          </div>
          <ul className="values-grid">
            {values.map((value, i) => (
              <li key={value}>
                <div className="values-art"><ValueArt index={i} /></div>
                <h3 className="mt-5 text-h3 text-ink">{value}</h3>
                <p className="mt-2 max-w-[36ch] text-muted">{valueNotes[value]}</p>
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

      {/* Contact us: image left, details right (risevest.com) */}
      <section aria-labelledby="about-contact-title">
        <Container className="grid items-center gap-10 pbe-20 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16 lg:pbe-28">
          <div className="about-contact-media" aria-hidden="true">
            <Image src="/brand/magnacap-shield.png" alt="" width={240} height={240} className="h-auto w-2/5" />
          </div>
          <div>
            <h2 id="about-contact-title" className="text-h2 font-semibold text-ink">Contact us</h2>
            <address className="mt-6 space-y-4 text-lead not-italic text-muted">
              <p>Address: {contact.address.lines.join(", ")}.</p>
              <p>
                Phone:{" "}
                {contact.phones.map((phone, i) => (
                  <span key={phone.tel}>
                    {i > 0 && ", "}
                    <a href={`tel:${phone.tel}`} className="tabular whitespace-nowrap text-ink underline underline-offset-4">{phone.display}</a>
                  </span>
                ))}
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-4">{contact.email}</a>
              </p>
            </address>
            <ButtonLink href="/contact" className="mt-8">Speak to our team</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
