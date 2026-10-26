import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { BrandEmblem } from "./brand-emblem";
import { contact, mailto } from "@/content/site";
import { ButtonLink, Container, Label, cx } from "./ui";

/**
 * Two-tone heading: the key clause in ink, the continuation in a quieter grey.
 * The quiet tone is only used at heading sizes (>= 24px) for contrast.
 */
export function TwoTone({
  strong,
  quiet,
  tone = "light",
}: {
  strong: ReactNode;
  quiet?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <>
      {strong}
      {quiet && (
        <>
          {" "}
          <span className={tone === "light" ? "text-quiet" : "text-on-slate-quiet"}>{quiet}</span>
        </>
      )}
    </>
  );
}

/** True when a file exists under public/, so a page photo can be dropped in later. */
function publicFileExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Inner-page header, after risevest.com: centred two-tone title and intro, then
 * a wide rounded photograph. Until the photo exists in public/, a branded slate
 * panel with the shield geometry stands in, so the layout never shows a gap.
 */
export function PageHeader({
  eyebrow,
  title,
  quiet,
  lead,
  image,
  overlay,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  quiet?: ReactNode;
  lead?: ReactNode;
  /** Path under public/, e.g. "/pages/about.jpg". */
  image?: { src: string; alt: string };
  /** Content laid over the base of the photo (after afrinvest.com's figures panel). */
  overlay?: ReactNode;
  children?: ReactNode;
}) {
  const hasPhoto = image && publicFileExists(image.src);
  return (
    <section className="page-header">
      <Container className="pbs-12 text-center sm:pbs-16 lg:pbs-20">
        <Label className="text-muted">{eyebrow}</Label>
        <h1 className="mx-auto mt-5 max-w-[22ch] text-h1 text-ink">
          <TwoTone strong={title} quiet={quiet} />
        </h1>
        {lead && <div className="mx-auto mt-6 max-w-[42rem] text-lead text-muted">{lead}</div>}
        {children}
        <div className="page-header-media">
          {hasPhoto ? (
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 80rem) 76rem, 100vw" className="object-cover" />
          ) : (
            <div className="page-header-placeholder" aria-hidden="true">
              <BrandEmblem />
            </div>
          )}
          {overlay && <div className="page-header-overlay on-dark">{overlay}</div>}
        </div>
      </Container>
    </section>
  );
}

/** Standard section heading. */
export function SectionHeading({
  eyebrow,
  title,
  quiet,
  intro,
  id,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  quiet?: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={cx(center && "mx-auto text-center", className)}>
      {eyebrow && (
        <Label className={tone === "light" ? "text-muted" : "text-on-slate-muted"}>{eyebrow}</Label>
      )}
      <h2
        id={id}
        className={cx(
          "max-w-[24ch] text-h2",
          center && "mx-auto",
          eyebrow && "mt-5",
          tone === "light" ? "text-ink" : "text-on-slate",
        )}
      >
        <TwoTone strong={title} quiet={quiet} tone={tone} />
      </h2>
      {intro && (
        <div
          className={cx(
            "mt-5 max-w-[38rem] text-lead",
            center && "mx-auto",
            tone === "light" ? "text-muted" : "text-on-slate-muted",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}

/** Rows separated by hairlines: title on the left, body on the right. */
export function HairlineRows({
  items,
  className,
}: {
  items: ReadonlyArray<{ title: string; body?: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cx("border-b border-line", className)}>
      {items.map((item) => (
        <div
          key={item.title}
          className="grid gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
        >
          <dt className="text-xl font-medium tracking-[-0.015em] text-ink">{item.title}</dt>
          {item.body && <dd className="text-[1.0625rem] leading-relaxed text-muted md:pt-0.5">{item.body}</dd>}
        </div>
      ))}
    </dl>
  );
}

/** Closing call to action: centred statement, two actions, contact line. */
export function ClosingCta({
  title = "Speak to our team.",
  quiet = "Brokers and advisers, a call or an email away.",
}: {
  title?: string;
  quiet?: string;
}) {
  return (
    <section aria-labelledby="closing-cta" className="py-16 lg:py-24">
      <Container>
        <div className="closing-cta on-dark">
          <div className="closing-cta-emblem" aria-hidden="true"><BrandEmblem /></div>
          <h2 id="closing-cta" className="mx-auto text-h2">
            <TwoTone strong={title} quiet={quiet} tone="dark" />
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href={mailto("Enquiry")} variant="outline-dark" arrow={false}>
              Email {contact.email}
            </ButtonLink>
          </div>
          <ul className="tabular mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-sm text-on-slate-muted">
            {contact.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="hover:text-on-slate hover:underline hover:underline-offset-4">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
