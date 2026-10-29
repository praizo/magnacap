import type { Metadata } from "next";
import Link from "next/link";
import { instrumentIcons } from "@/components/instrument-icons";
import { ServiceBand } from "@/components/service-band";
import { serviceCardArt } from "@/components/service-card-art";
import { PageHeader, SectionHeading } from "@/components/sections";
import { ArrowIcon, ButtonLink, Container } from "@/components/ui";
import { SwipeList } from "@/components/swipe-list";
import { VenueMarks } from "@/components/venue-marks";
import { advisoryServices, instruments } from "@/content/site";
import { serviceHref, servicePages, services } from "@/content/services";
import "./service-detail.css";

/** Metadata for a dedicated service page. */
export function serviceMetadata(slug: (typeof servicePages)[number]["slug"]): Metadata {
  const service = servicePages.find((item) => item.slug === slug)!;
  return {
    title: service.title,
    description: service.intro,
    alternates: { canonical: serviceHref(service.slug) },
  };
}

/** Advisory offerings with a description of their own; the rest are listed under the band. */
const describedOfferings = advisoryServices.filter((item) => item.body);
const otherOfferings = advisoryServices.filter((item) => !item.body);

/** Dedicated page for one service. All copy is verbatim from content.md. */
export function ServiceDetailPage({ slug }: { slug: (typeof servicePages)[number]["slug"] }) {
  const service = servicePages.find((item) => item.slug === slug)!;
  const others = services.filter((item) => item.slug !== service.slug);
  const brokerage = service.slug === "brokerage";
  // The header carries the first sentence; the rest of the introduction opens the page.
  const [lead, ...rest] = service.intro.split(/(?<=\.)\s+/);

  return (
    <>
      <PageHeader
        eyebrow={service.group}
        image={{
          src: `/pages/services-${service.slug}.jpg`,
          alt: brokerage
            ? "A Black professional discussing ideas with a colleague in a shared workspace."
            : "A Black woman and a colleague in conversation beside an office window.",
        }}
        title={service.title}
        lead={<p>{lead}</p>}
      />

      {/* The rest of the introduction beside the service's highlights. */}
      <section aria-labelledby="highlights-title">
        <Container className="grid gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <SectionHeading
            id="highlights-title"
            eyebrow={brokerage ? "Asset classes" : "What we offer"}
            title={brokerage ? "Our execution service" : "Our advisory team"}
            quiet={brokerage ? "covers the following asset classes." : "offers the following."}
            intro={<p>{rest.join(" ")}</p>}
          />
          <ul className="flex flex-wrap content-start gap-2 lg:pt-12">
            {service.highlights.map((item) => (
              <li key={item} className="svc-pill svc-pill-teal">{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Everything the service covers, side by side on the slate band. */}
      {brokerage ? (
        <ServiceBand
          id="instruments-title"
          eyebrow="Instruments"
          title="The instruments"
          quiet="we cover."
          items={instruments.map((item) => ({
            name: item.name,
            body: item.body,
            icon: instrumentIcons[item.name],
            foot: <VenueMarks name={item.name} venues={item.venues} />,
          }))}
        />
      ) : (
        <ServiceBand
          id="offerings-title"
          eyebrow="Advisory"
          title="What our"
          quiet="advisors do."
          items={describedOfferings.map((item) => ({ name: item.title, body: item.body! }))}
        >
          <p className="service-band-also">
            <span className="text-on-slate-muted">Also from our advisors:</span>{" "}
            {otherOfferings.map((item, i) => (
              <span key={item.title}>
                {i > 0 && " and "}
                {item.title === "Research" ? (
                  <Link href="/insights" className="underline decoration-signal underline-offset-4 hover:text-signal">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </span>
            ))}
            .
          </p>
        </ServiceBand>
      )}

      {/* The other services, each with its overview illustration and opening line. */}
      <section aria-labelledby="other-services-title" className="border-t border-line">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="other-services-title" eyebrow="Our services" title="Explore our" quiet="other services." />
            <ButtonLink href="/services" variant="text">View all services</ButtonLink>
          </div>
          <SwipeList className="other-services" label="Other services">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={serviceHref(item.slug)} className="other-service group" data-service={item.slug}>
                  <span className="other-service-art" aria-hidden="true">{serviceCardArt[item.slug]}</span>
                  <span className="other-service-body">
                    <span className="flex items-center justify-between gap-3 text-xl font-medium tracking-[-0.015em] text-ink">
                      {item.title}
                      <ArrowIcon className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </span>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-muted">{item.intro.split(/(?<=\.)\s+/)[0]}</span>
                  </span>
                </Link>
              </li>
            ))}
          </SwipeList>
        </Container>
      </section>
    </>
  );
}
