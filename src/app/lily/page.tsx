import type { Metadata } from "next";
import { LilyScreens, StoreLinks } from "@/components/lily";
import { ClosingCta, HairlineRows, SectionHeading, TwoTone } from "@/components/sections";
import { Container, Label } from "@/components/ui";
import { lily, riskWarning } from "@/content/site";

export const metadata: Metadata = {
  title: "LILY — Save, trade and invest",
  description:
    "LILY is MagnaCap's simple wealth creation app. Trade and invest in fixed income products, stocks and commodities, and automate your savings goals.",
  alternates: { canonical: "/lily" },
};

const features = [
  {
    title: "Direct market access",
    body: "Trade and invest in fixed income products, stocks and commodities.",
  },
  {
    title: "Automated savings",
    body: "Set a savings goal and automate the process.",
  },
  {
    title: "Equities trading",
    body: "Start your stock market journey with MagnaCap's equities trading service on LILY, and take control of your investments.",
  },
] as const;

export default function LilyPage() {
  return (
    <>
      <section aria-labelledby="lily-hero" className="border-b border-line">
        <Container className="pt-14 sm:pt-20 lg:pt-24">
          <Label className="text-muted">LILY app</Label>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 id="lily-hero" className="text-display text-ink lg:col-span-7">
              <TwoTone strong="Wealth creation," quiet="simplified." />
            </h1>
            <div className="lg:col-span-5 lg:pb-3">
              <p className="text-lead text-muted">
                Download LILY to make your money work for you — save, trade and invest from one
                app.
              </p>
              <StoreLinks className="mt-7" />
            </div>
          </div>
          <div className="dot-grid mt-14 overflow-hidden rounded-t-band border border-b-0 border-line px-6 pt-12 sm:px-12 lg:mt-16 lg:pt-16">
            <LilyScreens size="wide" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="features-title">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <SectionHeading id="features-title" eyebrow="What LILY does" title="One app for saving and investing." />
          </div>
          <div className="lg:col-span-7">
            <HairlineRows items={features} />
            <p className="mt-8 text-muted">
              Learn more at{" "}
              <a
                href={lily.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate underline underline-offset-4"
              >
                {lily.websiteLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
            <p className="mt-6 text-sm text-muted">{riskWarning}</p>
          </div>
        </Container>
      </section>

      <ClosingCta title="Questions about LILY?" quiet="Our team can help you get started." />
    </>
  );
}
