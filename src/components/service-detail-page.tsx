import type { Metadata } from "next";
import Link from "next/link";
import { CheckList } from "@/components/check-list";
import { instrumentIcons } from "@/components/instrument-icons";
import { InstrumentTabs } from "@/components/instrument-tabs";
import { PageHeader } from "@/components/sections";
import { ArrowIcon, Container } from "@/components/ui";
import { advisoryServices, instruments } from "@/content/site";
import { serviceHref, servicePages, services } from "@/content/services";

/** Metadata for a dedicated service page. */
export function serviceMetadata(slug: (typeof servicePages)[number]["slug"]): Metadata {
  const service = servicePages.find((item) => item.slug === slug)!;
  return {
    title: service.title,
    description: service.intro,
    alternates: { canonical: serviceHref(service.slug) },
  };
}

/** Dedicated page for one service. All copy is verbatim from content.md. */
export function ServiceDetailPage({ slug }: { slug: (typeof servicePages)[number]["slug"] }) {
  const service = servicePages.find((item) => item.slug === slug)!;
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={service.group}
        image={{ src: `/pages/services-${service.slug}.jpg`, alt: `MagnaCap ${service.title.toLowerCase()}.` }}
        title={service.title}
        lead={<p>{service.intro}</p>}
      />

      {/* Highlights: the points named in the service copy */}
      <section aria-label={`${service.title} at a glance`}>
        <Container className="py-16 lg:py-24">
          <div className="service-detail-panel">
            <p className="text-h3 leading-snug">{service.highlightsTitle}</p>
            {service.slug === "brokerage" ? (
              <ul className="flex flex-wrap content-start gap-2">
                {service.highlights.map((item) => (
                  <li key={item} className="svc-pill svc-pill-teal">{item}</li>
                ))}
              </ul>
            ) : (
              <CheckList items={service.highlights} />
            )}
          </div>
        </Container>
      </section>

      {/* Service-specific detail */}
      {service.slug === "brokerage" && (
        <section aria-labelledby="instruments-title">
          <Container className="pbe-20 lg:pbe-28">
            <h2 id="instruments-title" className="text-h2 text-ink">The instruments we cover</h2>
            <div className="mt-8">
              <InstrumentTabs items={instruments.map((item) => ({ ...item, icon: instrumentIcons[item.name] }))} />
            </div>
          </Container>
        </section>
      )}

      {service.slug === "investment-advisory" && (
        <section aria-labelledby="offerings-title" className="advisory-section">
          <Container className="py-20 lg:py-28">
            <h2 id="offerings-title" className="text-h2 text-ink">What our advisors do</h2>
            <ul className="advisory-list mt-8">
              {advisoryServices.map((item) =>
                item.body ? (
                  <li key={item.title}>
                    <details className="group">
                      <summary>
                        {item.title}
                        <span aria-hidden="true" className="advisory-toggle" />
                      </summary>
                      <p className="max-w-[60ch] pbe-6 text-muted">{item.body}</p>
                    </details>
                  </li>
                ) : (
                  <li key={item.title}>
                    <p className="advisory-static">{item.title}</p>
                  </li>
                ),
              )}
            </ul>
          </Container>
        </section>
      )}

      {/* The other services */}
      <section aria-labelledby="other-services-title" className="border-t border-line">
        <Container className="py-16 lg:py-24">
          <h2 id="other-services-title" className="text-h3 text-ink">Explore our other services</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={serviceHref(item.slug)} className="other-service-link group">
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{item.group}</span>
                  <span className="mt-6 flex items-center justify-between gap-3 text-xl font-medium tracking-[-0.015em] text-ink">
                    {item.title}
                    <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
