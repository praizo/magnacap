import type { Metadata } from "next";
import { PageHeader } from "@/components/sections";
import { ButtonLink, Container, Label, cx } from "@/components/ui";
import { mailto, reportTypes } from "@/content/site";

export const metadata: Metadata = {
  title: "Market insights",
  description:
    "MagnaCap's market, macroeconomic, company and sector-specific reports for clients.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Market insights"
        image={{ src: "/pages/insights.jpg", alt: "A MagnaCap analyst reviewing market data." }}
        title="Stay sharp with our reports"
        quiet="and keep abreast of key market news."
        lead={
          <p>
            Our team delivers timely market insight, economic forecasts and sector-specific
            reports to support our clients&apos; decisions.
          </p>
        }
      />

      <section aria-labelledby="publish-title">
        <Container className="py-16 lg:py-24">
          <Label as="h2" className="text-muted">
            <span id="publish-title">What we publish</span>
          </Label>
          <ul className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {reportTypes.map((report, i) => (
              <li
                key={report}
                className={cx(
                  "border-b border-line py-8 text-h3 font-medium text-ink lg:border-b-0 lg:border-l lg:px-6 lg:py-12",
                  i === 0 && "lg:border-l-0 lg:pl-0",
                )}
              >
                {report}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="request-title" className="border-t border-line bg-mist">
        <Container className="grid gap-8 py-20 lg:grid-cols-12 lg:items-end lg:py-24">
          <div className="lg:col-span-8">
            <h2 id="request-title" className="text-h2 text-ink">
              Reports are circulated periodically to clients.
            </h2>
            <p className="mt-5 max-w-[36rem] text-lead text-muted">
              Contact us to receive MagnaCap&apos;s market reports.
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <ButtonLink href={mailto("Market reports")}>Request our reports</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
