import Image from "next/image";
import type { PartnerLogoData } from "@/content/partner-logos";
import { cx } from "./ui";

export type Partner = PartnerLogoData & { name: string };

/**
 * Optical sizing: give every logo roughly the same visual area, so square
 * marks don't tower over long wordmarks. Returns a display height in px.
 */
export function opticalHeight(width: number, height: number, area = 5200, min = 22, max = 52) {
  const aspect = width / height;
  return Math.round(Math.min(max, Math.max(min, Math.sqrt(area / aspect))));
}

export function PartnerMark({ partner, area }: { partner: Partner; area?: number }) {
  if (!partner.logo) {
    return (
      <span className="whitespace-nowrap text-lg font-medium tracking-[-0.01em] text-muted">
        {partner.name}
      </span>
    );
  }
  const h = opticalHeight(partner.logo.width, partner.logo.height, area);
  return (
    <Image
      src={partner.logo}
      alt={partner.name}
      sizes={`${Math.round((h * partner.logo.width) / partner.logo.height)}px`}
      style={{ blockSize: h, inlineSize: "auto" }}
      className={cx(
        "max-w-[min(11rem,100%)] object-contain",
        // White-only file: invert for the light row, then rotate the hue back so the brand blue survives.
        partner.invert && "invert hue-rotate-180",
      )}
    />
  );
}

/**
 * Continuous single-row logo marquee. Pauses on hover and keyboard focus, and
 * becomes a static wrapped list when reduced motion is preferred.
 */
export function PartnerMarquee({ partners, label }: { partners: Partner[]; label: string }) {
  const list = (hidden: boolean) => (
    <ul
      aria-label={hidden ? undefined : label}
      aria-hidden={hidden || undefined}
      className={cx(
        "flex items-center",
        hidden ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6",
      )}
    >
      {partners.map((partner) => (
        <li key={partner.name} className="flex h-20 shrink-0 items-center px-7 sm:px-9">
          <PartnerMark partner={partner} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group/marquee overflow-clip [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
      <div className="flex w-max animate-[marquee_80s_linear_infinite] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
