import type { Metadata } from "next";
import Image from "next/image";
import { CheckList } from "@/components/check-list";
import { SectionHeading } from "@/components/sections";
import { SubscribeForm } from "@/components/subscribe-form";
import { ButtonLink, Container, Label } from "@/components/ui";
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
      <section aria-labelledby="insights-title">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
          <div className="lg:col-span-6">
            <Label className="text-muted">Market insights</Label>
            <h1 id="insights-title" className="mt-5 max-w-[16ch] text-h1 text-ink">
              Stay sharp with our reports.{" "}
              <span className="text-quiet">Delivered to your inbox.</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-lead text-muted">
              Subscribe for timely market insight, economic forecasts and sector analysis from our team.
            </p>
            <div className="mt-8 text-ink">
              <CheckList items={reportTypes} />
            </div>
            <div className="mt-10">
              <ButtonLink href="#subscribe">Subscribe now</ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-clip rounded-panel bg-mist lg:col-span-6">
            <Image
              src="/pages/insights-portrait.webp"
              alt="A financial analyst reviewing printed reports beside market charts."
              fill
              preload
              sizes="(min-width: 80rem) 36rem, (min-width: 64rem) 45vw, calc(100vw - 2rem)"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section id="subscribe" aria-labelledby="subscribe-title" className="border-t border-line bg-mist">
        <Container className="py-16 lg:py-24">
          <SectionHeading
            id="subscribe-title"
            eyebrow="Subscribe"
            title="Get our reports by email."
            intro={<p>Free for clients and prospective clients. {company.secLicence}.</p>}
          />
          <div className="mt-10 max-w-2xl rounded-panel border border-line bg-paper p-6 sm:p-8 lg:p-10">
            <SubscribeForm />
          </div>
        </Container>
      </section>
    </>
  );
}
