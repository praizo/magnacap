import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-site px-(--gutter)", className)}>
      {children}
    </div>
  );
}

/** Small uppercase monospace label used for eyebrows, indices and metadata. */
export function Label({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h2" | "h3" | "dt";
}) {
  return (
    <Tag
      className={cx(
        "font-mono text-label font-medium uppercase tracking-(--text-label--letter-spacing)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** New-tab attributes for links that leave the site (anything not root-relative). */
export function externalLinkProps(href: string) {
  return href.startsWith("/") ? {} : ({ target: "_blank", rel: "noopener noreferrer" } as const);
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cx("size-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

type ButtonVariant = "primary" | "outline" | "outline-dark" | "text";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "rounded-control bg-signal text-ink px-5 py-3.5 font-semibold hover:bg-signal-hover",
  outline:
    "rounded-control border border-line-strong bg-paper text-ink px-5 py-3.5 hover:border-slate",
  "outline-dark":
    "rounded-control border border-on-slate-line text-on-slate px-5 py-3.5 hover:border-on-slate",
  text: "text-slate font-semibold underline-offset-4 decoration-1 hover:underline py-1",
};

/**
 * Link styled as a button. Internal routes use next/link; mailto:, tel: and
 * external URLs render a plain anchor.
 */
export function ButtonLink({
  href,
  variant = "primary",
  arrow = true,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const classes = cx(
    "button-link group inline-flex items-center gap-3 text-[0.9375rem] font-medium leading-none transition-colors duration-200",
    buttonStyles[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}

/** Two-digit index, e.g. 01, used for ruled lists. */
export function indexLabel(i: number) {
  return String(i + 1).padStart(2, "0");
}
