import type { Metadata } from "next";
import { PageHeader } from "@/components/sections";
import { ButtonLink, Container, Label, cx } from "@/components/ui";
import { contact, mailto, values } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "MagnaCap is looking to add fresh talent to its team. Send your CV and cover letter.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        image={{ src: "/pages/careers.jpg", alt: "The MagnaCap team collaborating in the office." }}
        title="We're looking to add fresh talent"
        quiet="to our team."
        lead={<p>Send us your CV and cover letter.</p>}
      >
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <ButtonLink href={mailto("Career application")}>Email your application</ButtonLink>
          <a
            href={`mailto:${contact.email}`}
            className="font-mono text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {contact.email}
          </a>
        </div>
      </PageHeader>

      <section aria-labelledby="values-title">
        <Container className="py-16 lg:py-24">
          <Label as="h2" className="text-muted">
            <span id="values-title">What we value</span>
          </Label>
          <ul className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, i) => (
              <li
                key={value}
                className={cx(
                  "border-b border-line py-7 text-h3 font-medium text-ink lg:border-b-0 lg:border-l lg:px-6 lg:py-10",
                  i === 0 && "lg:border-l-0 lg:pl-0",
                )}
              >
                {value}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
