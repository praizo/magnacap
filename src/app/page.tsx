import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdvantageSection } from "@/components/advantage-section";
import { ClienteleSlider } from "@/components/clientele-grid";
import { PartnerMarquee } from "@/components/partner-marquee";
import { ServiceCards } from "@/components/service-cards";
import { AppleIcon, PlayIcon } from "@/components/lily";
import { SectionHeading, resolvePublicImage } from "@/components/sections";
import { ArrowIcon, ButtonLink, Container, Label } from "@/components/ui";
import { partnerLogos } from "@/content/partner-logos";
import { partners } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const heroImage = resolvePublicImage("/hero/business-discussion.jpg");

  return (
    <>
      {/* Hero: full-bleed slate-toned photograph, copy low-left */}
      <section aria-labelledby="hero-title" className="home-hero">
        {heroImage && (
          <Image src={heroImage} alt="" fill preload sizes="100vw" className="hero-media" />
        )}
        <div className="hero-copy">
          <p className="hero-badge">
            <span aria-hidden="true" className="hero-badge-dot" />
            Brokerage | Trading | Investment advisory
          </p>
          <h1 id="hero-title" className="hero-title">
            Smarter trades,
            <br />
            <span>superior returns.</span>
          </h1>
          <p className="hero-sub">
            Best-in-class trading and brokerage across fixed income, equities, money market,
            commodities and FX, with expert advisors to help you unlock value from your portfolio.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="hero-cta button-link">
              Speak to a broker
              <ArrowIcon className="size-5" />
            </Link>
            <Link href="/lily" className="hero-app button-link">
              <AppleIcon />
              <span aria-hidden="true" className="h-5 w-px bg-current opacity-30" />
              <PlayIcon />
              Download LILY
            </Link>
          </div>
        </div>
      </section>

      {/* Firm statement: two-tone statement left, who we serve as a card slider right */}
      <section aria-labelledby="firm-title">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-24">
          <div>
            <Label className="text-muted">About MagnaCap</Label>
            <h2 id="firm-title" className="firm-title mbs-5">
              MagnaCap Limited is a SEC-licensed brokerage and{" "}
              <span className="text-quiet">investment advisory company.</span>
            </h2>
            <p className="mbs-6 max-w-[46ch] text-lead text-muted">
              Known for dependability, accountability and quality of service, we deploy innovative
              strategies to ensure that our clients get maximum value.
            </p>
            <ButtonLink href="/about" variant="text" className="mbs-8 text-base">
              Learn more
              <span className="sr-only"> about MagnaCap</span>
            </ButtonLink>
          </div>
          <div className="min-w-0">
            <Label as="h3" className="text-muted">Who we serve</Label>
            <p className="mbs-3 text-h3 text-ink">A diverse buy and sell side clientele.</p>
            <div className="mbs-7">
              <ClienteleSlider perView={2} />
            </div>
          </div>
        </Container>
      </section>

      {/* Services: bento of four lines, each with its own tint and art panel */}
      <section aria-labelledby="lines-title">
        <Container className="py-16 lg:py-24">
          <SectionHeading
            id="lines-title"
            eyebrow="Our services"
            title="Financial solutions for corporate and retail clients."
            quiet="Across trading, brokerage and investment advisory."
          />
          <div className="mt-10 lg:mt-12">
            <ServiceCards />
          </div>
        </Container>
      </section>

      {/* The MagnaCap advantage: a typographic wall of the five advantages */}
      <section aria-labelledby="advantage-title" className="on-dark bg-slate-deep text-on-slate">
        <Container className="py-16 lg:py-28">
          <AdvantageSection />
        </Container>
      </section>

      {/* Partners: one marquee row after the MagnaCap advantage */}
      <section aria-labelledby="partners-title">
        <Container className="py-16 lg:py-24">
          <SectionHeading
            id="partners-title"
            align="center"
            eyebrow="Our partners"
            title="Trusted across the market."
            quiet="Exchanges, banks and brokers."
            className="mbe-10 lg:mbe-12"
          />
          <PartnerMarquee
            label="Our partners"
            partners={[...partners.marketInfrastructure, ...partners.institutions].map((name) => ({
              name,
              ...partnerLogos[name],
            }))}
          />
        </Container>
      </section>
    </>
  );
}
