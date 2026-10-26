import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="py-24 lg:py-36">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 max-w-[18ch] text-h1 text-ink">We couldn&apos;t find that page.</h1>
      <p className="mt-6 max-w-md text-lead text-muted">
        The link may be out of date. Try the homepage or get in touch with our team.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/contact" variant="outline" arrow={false}>
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
