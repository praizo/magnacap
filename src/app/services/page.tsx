import type { Metadata } from "next";
import Link from "next/link";
import { CheckList } from "@/components/check-list";
import { PageHeader } from "@/components/sections";
import { ServiceStack } from "@/components/service-stack";
import { ArrowIcon, Container } from "@/components/ui";
import { assetClasses } from "@/content/site";
import { serviceHref, type ServiceSlug } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "We are committed to providing unparalleled financial solutions to both corporate and retail clients. Our expertise spans trading, brokerage, and investment advisory.",
  alternates: { canonical: "/services" },
};

/* All copy on this page is verbatim from content.md. */

/** The instruments named in content.md's Trading paragraph. */
const tradedInstruments = ["FGN bonds", "Corporate bonds", "Eurobonds", "Money market instruments", "Equities", "Commodities"];

/** Each stack card links to the service's own page. */
function ReadMore({ slug, title }: { slug: ServiceSlug; title: string }) {
  return (
    <Link href={serviceHref(slug)} className="mt-auto inline-flex items-center gap-2 pt-6 font-medium hover:underline hover:underline-offset-4">
      Read more
      <span className="sr-only"> about {title}</span>
      <ArrowIcon />
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        image={{ src: "/pages/services.jpg", alt: "MagnaCap brokers on the trading desk." }}
        title="We are committed to providing unparalleled financial solutions"
        quiet="to both corporate and retail clients."
      />

      {/* Mini intro above the stack (after arm.com.ng's "Investments" lead-in) */}
      <Container className="services-intro">
        <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
          Our services
        </p>
        <h2 className="mt-5 max-w-[22ch] text-h2 text-ink">
          Our expertise spans trading, brokerage, and investment advisory.
        </h2>
        <p className="mt-5 max-w-[48ch] text-lead text-muted">
          Discover how we can help you achieve your financial goals through our comprehensive
          offerings.
        </p>
      </Container>

      {/* Equal-height cards that stack as you scroll */}
      <Container className="pbs-10 lg:pbs-14">
        <ServiceStack>
          <section id="brokerage" aria-labelledby="brokerage-title" className="stack-card">
            <div className="stack-card-copy">
              <h2 id="brokerage-title" className="text-h2 text-ink">Brokerage</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                We facilitate and execute trades for both buy-side and sell-side clients. By acting
                as intermediary, we connect buyers and sellers of sovereign bonds, corporate bonds,
                Eurobonds, commodities, equities, and money market instruments. Our clients benefit
                from competitive pricing, efficient execution, confidentiality, and our wide market
                reach.
              </p>
              <ReadMore slug="brokerage" title="Brokerage" />
            </div>
            <div className="stack-card-panel">
              <p className="font-medium text-ink">Our execution service covers the following asset classes:</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {assetClasses.map((asset) => (
                  <li key={asset} className="svc-pill bg-paper text-ink">{asset}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="advisory" aria-labelledby="advisory-title" className="stack-card stack-card-sand">
            <div className="stack-card-copy">
              <h2 id="advisory-title" className="text-h2 text-ink">Investment Advisory</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                We understand that navigating the financial markets can be complex. Our investment
                advisory service is designed to provide you with expert guidance and strategic
                insights to make informed investment decisions.
              </p>
              <ReadMore slug="investment-advisory" title="Investment Advisory" />
            </div>
            <div className="stack-card-panel">
              <p className="mb-5 font-medium text-ink">Our advisory team offers:</p>
              <CheckList items={["Customized Financial Planning", "Portfolio Management", "Stock recommendation", "Research"]} />
            </div>
          </section>

          <section id="proprietary-trading" aria-labelledby="trading-title" className="stack-card stack-card-black on-dark">
            <div className="stack-card-copy">
              <h2 id="trading-title" className="text-h2">Trading</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-on-slate-muted">
                We engage in proprietary trading to capitalize on market opportunities and deliver
                superior returns to our shareholders. Our trading desk is staffed with experienced
                professionals who employ sophisticated strategies to trade instruments, including
                FGN bonds, corporate bonds, Eurobonds, and money market instruments, equities, and
                commodities.
              </p>
            </div>
            <div className="stack-card-panel">
              <p className="text-lg font-medium leading-snug">
                By leveraging our deep market insights, we aim to maximize profits and mitigate
                risks, ensuring robust portfolio growth.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {tradedInstruments.map((item) => (
                  <li key={item} className="svc-pill svc-pill-forest">{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="custody" aria-labelledby="custody-title" className="stack-card stack-card-custody">
            <div className="stack-card-copy">
              <p className="stack-card-label">Other services</p>
              <h2 id="custody-title" className="mt-4 text-h2 text-ink">Custodian Services</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                We ensure the safety and management of your investment assets with our reliable
                custodial services. We provide secure storage, transaction settlement, and
                comprehensive reporting, giving you peace of mind and allowing you to focus on your
                investment strategy.
              </p>
            </div>
            <div className="stack-card-panel">
              <CheckList items={["Secure storage", "Transaction settlement", "Comprehensive reporting"]} />
            </div>
          </section>

          <section id="research" aria-labelledby="research-title" className="stack-card stack-card-research">
            <div className="stack-card-copy">
              <p className="stack-card-label">Other services</p>
              <h2 id="research-title" className="mt-4 text-h2 text-ink">Research</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                We provide market insight for our clients’ decision making through our market
                report, macroeconomic report, company reports and many more. Our team of experts
                deliver timely market insights, economic forecasts, and sector-specific reports,
                empowering you with the knowledge needed to navigate the financial markets
                confidently.
              </p>
            </div>
            <div className="stack-card-panel">
              <CheckList items={["Market report", "Macroeconomic report", "Company reports", "Economic forecasts", "Sector-specific reports"]} />
            </div>
          </section>
        </ServiceStack>
      </Container>

    </>
  );
}
