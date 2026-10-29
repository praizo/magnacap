import type { ReactNode } from "react";
import { SectionHeading } from "@/components/sections";
import { Container } from "./ui";

export type BandItem = {
  name: string;
  body: string;
  icon?: ReactNode;
  /** Pinned to the foot of the column, e.g. where the instrument trades. */
  foot?: ReactNode;
};

/** A service's offerings side by side on a full-width slate band, split by hairlines. */
export function ServiceBand({
  id,
  eyebrow,
  title,
  quiet,
  items,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  quiet: string;
  items: readonly BandItem[];
  /** Shown under the columns. */
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="service-band on-dark">
      <Container className="py-20 lg:py-28">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} quiet={quiet} tone="dark" />
        <ul className="service-band-columns" data-count={items.length}>
          {items.map((item) => (
            <li key={item.name}>
              {item.icon && <span className="service-band-icon" aria-hidden="true">{item.icon}</span>}
              <h3 className="text-h3 text-on-slate">{item.name}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-slate-muted">{item.body}</p>
              {item.foot && <div className="service-band-foot">{item.foot}</div>}
            </li>
          ))}
        </ul>
        {children}
      </Container>
    </section>
  );
}
