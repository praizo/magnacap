import type { ReactNode } from "react";
import Image from "next/image";
import { lily } from "@/content/site";
import homeScreen from "../../public/lily/home.png";
import portfolioScreen from "../../public/lily/portfolio.png";
import { ButtonLink, cx } from "./ui";

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cx("size-5 shrink-0", className)} fill="currentColor">
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.54 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.3-3.5zM14.2 6.13c.6-.74 1.01-1.75.9-2.77-.87.04-1.93.58-2.55 1.31-.56.64-1.05 1.68-.92 2.67.97.08 1.97-.49 2.57-1.21z" />
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cx("size-5 shrink-0", className)} fill="currentColor">
      <path d="M4.2 2.6a1.4 1.4 0 0 0-.5 1.1v16.6c0 .45.19.84.5 1.1l9.3-9.4-9.3-9.4zm10.4 8.3 2.6-2.6L6.6 2.2c-.3-.17-.6-.22-.9-.17l8.9 8.87zm0 2.2-8.9 8.87c.3.05.6 0 .9-.17l10.6-6.1-2.6-2.6zm3.8-3.9-2.8 2.8 2.8 2.8 2.4-1.4c.9-.5.9-1.8 0-2.3l-2.4-1.9z" />
    </svg>
  );
}

/** Official store links for the LILY app. Opens in a new tab. */
export function StoreLinks({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <div className={cx("flex flex-wrap gap-3", className)}>
      <ButtonLink href={lily.appStore} {...external}>
        Download on the App Store
        <span className="sr-only"> (opens in a new tab)</span>
      </ButtonLink>
      <ButtonLink
        href={lily.googlePlay}
        variant={tone === "dark" ? "outline-dark" : "outline"}
        {...external}
      >
        Get it on Google Play
        <span className="sr-only"> (opens in a new tab)</span>
      </ButtonLink>
    </div>
  );
}

function Device({
  children,
  frame,
  className,
}: {
  children: ReactNode;
  frame: "ink" | "slate";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "overflow-clip rounded-[1.75rem] border-[6px] bg-paper",
        frame === "ink" ? "border-ink" : "border-slate",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Two authentic LILY screens from lily.ng, cropped to their upper portion and
 * set to bleed off the bottom of their canvas. Crops end on clean boundaries:
 * the portfolio screen below its balance card, the wallet screen above its
 * first card (and its promotional rate tiles). Phones show the portfolio only.
 */
export function LilyScreens({
  size = "default",
  frame = "ink",
  className,
}: {
  /** "feature" fills a dedicated media panel. */
  size?: "default" | "wide" | "feature";
  /** Use "slate" on dark panels so the device edge stays visible. */
  frame?: "ink" | "slate";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative mx-auto flex w-full items-end justify-center",
        { default: "max-w-[34rem]", wide: "max-w-[40rem]", feature: "max-w-[34rem] lg:max-w-none" }[size],
        className,
      )}
    >
      <Device frame={frame} className="hidden w-[46%] translate-x-[8%] rounded-b-none border-b-0 sm:block">
        <div className="aspect-[360/405] min-h-0 overflow-clip">
          <Image
            src={homeScreen}
            alt="LILY wallet screen showing a Naira balance with Top up, Withdraw and More actions."
            sizes="(min-width: 1024px) 250px, 46vw"
            className="w-full"
          />
        </div>
      </Device>
      <Device
        frame={frame}
        className={cx(
          "relative z-10 w-[72%] rounded-b-none border-b-0",
          size === "feature" ? "sm:w-[64%] lg:w-[70%]" : "sm:w-[58%]",
        )}
      >
        <div className="aspect-[720/1035] min-h-0 overflow-clip">
          <Image
            src={portfolioScreen}
            alt="LILY Portfolio screen showing a portfolio balance in Naira and the split between savings and investments."
            sizes="(min-width: 1024px) 310px, (min-width: 640px) 58vw, 72vw"
            className="w-full"
          />
        </div>
      </Device>
    </div>
  );
}
