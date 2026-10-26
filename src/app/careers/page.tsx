import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { CareersForm } from "@/components/careers-form";
import { SectionHeading } from "@/components/sections";
import { ButtonLink, Container, Label } from "@/components/ui";
import { values } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "MagnaCap is looking to add fresh talent to its team. Apply with your CV and cover letter.",
  alternates: { canonical: "/careers" },
};

const iconProps = { viewBox: "0 0 24 24", className: "size-5", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** What each value means for the people who work here (the About page covers what it means for clients). */
const valueInPractice: Record<(typeof values)[number], { body: string; icon: ReactNode }> = {
  Integrity: {
    body: "We do what we say, and we protect our clients' confidence in every dealing.",
    icon: <svg {...iconProps}><path d="M12 3.25 4.75 6v5.5c0 4.25 3 7.75 7.25 9.25 4.25-1.5 7.25-5 7.25-9.25V6L12 3.25Z" /><path d="m9 12 2.25 2.25L15.5 10" /></svg>,
  },
  Excellence: {
    body: "We hold ourselves to fast, precise execution and keep raising the bar.",
    icon: <svg {...iconProps}><path d="m12 3.5 2.6 5.3 5.85.85-4.23 4.12 1 5.83L12 16.85 6.78 19.6l1-5.83L3.55 9.65l5.85-.85L12 3.5Z" /></svg>,
  },
  "Client centricity": {
    body: "Every desk starts from what our clients need, not what's easiest for us.",
    icon: <svg {...iconProps}><circle cx="12" cy="9" r="3.25" /><path d="M5.75 19.25c.9-3 3.4-4.75 6.25-4.75s5.35 1.75 6.25 4.75" /></svg>,
  },
  Accountability: {
    body: "We own our decisions and their outcomes, as individuals and as a team.",
    icon: <svg {...iconProps}><circle cx="12" cy="12" r="8.25" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>,
  },
  Competence: {
    body: "We invest in expertise, so you keep learning from people who know the markets.",
    icon: <svg {...iconProps}><path d="M3.75 19.25h16.5" /><path d="m5.75 15 4-4 3 3 5.5-6.25" /><path d="M14.75 7.75h3.5v3.5" /></svg>,
  },
};

export default function CareersPage() {
  return (
    <>
      <section aria-labelledby="careers-title">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
          <div className="lg:col-span-6">
            <Label className="text-muted">Careers</Label>
            <h1 id="careers-title" className="mt-5 max-w-[16ch] text-h1 text-ink">
              We&apos;re looking for fresh talent.{" "}
              <span className="text-quiet">Build your career in Nigeria&apos;s markets.</span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-lead text-muted">
              Join the team behind MagnaCap&apos;s brokerage, advisory and research desks. Send us your CV and
              cover letter.
            </p>
            <div className="mt-10">
              <ButtonLink href="#apply">Apply now</ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-mist lg:col-span-6 lg:aspect-[4/5]">
            <Image
              src="/pages/careers-portrait.webp"
              alt="Two Black women sharing ideas while working on their laptops."
              fill
              preload
              sizes="(min-width: 80rem) 36rem, (min-width: 64rem) 45vw, calc(100vw - 2rem)"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* What we value: icon cards on white (same icon tile as About's vision and mission) */}
      <section aria-labelledby="values-title" className="border-t border-line">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading id="values-title" eyebrow="What we value" title="How we work." className="lg:col-span-7" />
            <p className="max-w-[30rem] text-lead text-muted lg:col-span-5">
              Five values shape how we trade, advise and treat each other. We hire people who share them.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <li
                key={value}
                className="rounded-panel border border-line bg-paper p-6 transition-colors hover:border-line-strong"
              >
                <span className="grid size-11 place-items-center rounded-panel bg-slate/10 text-slate" aria-hidden="true">
                  {valueInPractice[value].icon}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em] text-ink">{value}</h3>
                <p className="mt-2 text-muted">{valueInPractice[value].body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="apply" aria-labelledby="apply-title" className="border-t border-line bg-mist">
        <Container className="py-16 lg:py-24">
          <SectionHeading id="apply-title" eyebrow="Apply" title="Send us your application." />
          <div className="mt-10 rounded-panel border border-line bg-paper p-6 sm:p-8 lg:p-10">
            <CareersForm />
          </div>
        </Container>
      </section>
    </>
  );
}
