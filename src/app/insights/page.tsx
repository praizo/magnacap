import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckList } from "@/components/check-list";
import { PageHeader, SectionHeading } from "@/components/sections";
import { SubscribeEmailPrefill, SubscribeForm } from "@/components/subscribe-form";
import { ButtonLink, Container } from "@/components/ui";
import { company, reportTypes } from "@/content/site";

export const metadata: Metadata = {
  title: "Market insights",
  description:
    "Subscribe to MagnaCap's market, macroeconomic, company and sector-specific reports.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Market insights"
        image={{ src: "/pages/insights-analyst.jpg", alt: "A Black professional in glasses working at a laptop beside printed reports." }}
        title="Stay sharp with our reports."
        quiet="Delivered to your inbox."
        lead={<p>Subscribe for timely market insight, economic forecasts and sector analysis from our team.</p>}
      >
        <div className="mt-8">
          <ButtonLink href="#subscribe">Subscribe now</ButtonLink>
        </div>
      </PageHeader>

      <section id="subscribe" aria-labelledby="subscribe-title" className="border-t border-line bg-mist">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="subscribe-title"
                eyebrow="Subscribe"
                title="Get our reports by email."
                intro={<p>Free for clients and prospective clients. {company.secLicence}.</p>}
              />
              <div className="mt-8 text-ink">
                <CheckList items={reportTypes} />
              </div>
            </div>
            <div className="rounded-panel border border-line bg-paper p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <SubscribeForm />
              <Suspense fallback={null}>
                <SubscribeEmailPrefill />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
