import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/sections";
import { Container, Label } from "@/components/ui";
import { company, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact MagnaCap at 3 Birrel Avenue, Sabo, Yaba, Lagos. Call +234 802 241 2162 or email info@magnacap.org.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        image={{ src: "/pages/contact.jpg", alt: "The MagnaCap office in Sabo, Yaba, Lagos." }}
        title="Speak to our team."
        quiet="Call, email or visit us in Lagos."
      />

      <section aria-label="Contact details and form">
        <Container className="grid gap-16 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <address className="not-italic lg:col-span-4">
            <dl className="border-b border-line">
              <div className="border-t border-line py-6">
                <Label as="dt" className="text-muted">
                  Office
                </Label>
                <dd className="mt-3 text-xl tracking-[-0.01em] text-ink">
                  <a
                    href={contact.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {contact.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                </dd>
              </div>
              <div className="border-t border-line py-6">
                <Label as="dt" className="text-muted">
                  Phone
                </Label>
                <dd className="mt-3 space-y-1.5">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="tabular block font-mono text-lg text-ink underline-offset-4 hover:underline"
                    >
                      {phone.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="border-t border-line py-6">
                <Label as="dt" className="text-muted">
                  Email
                </Label>
                <dd className="mt-3">
                  <a href={`mailto:${contact.email}`} className="text-xl text-ink underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="border-t border-line py-6">
                <Label as="dt" className="text-muted">
                  Website
                </Label>
                <dd className="mt-3">
                  <a href={company.url} className="text-xl text-ink underline-offset-4 hover:underline">
                    {company.displayUrl}
                  </a>
                </dd>
              </div>
            </dl>
          </address>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-h3 text-ink">Send us a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
