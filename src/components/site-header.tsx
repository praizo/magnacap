"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { navigation } from "@/content/site";
import { cx, externalLinkProps } from "./ui";

export function SiteHeader({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const isHome = pathname === "/";

  // Inner pages start with a flat bar and only float (frosted panel) once the
  // page scrolls; home always floats over the hero photograph.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Over the home hero the white glass reads as soft grey against the dark
  // photo. Once scrolled (any page) the bar carries that grey itself, so it
  // keeps the landing-page look over white sections too.
  const look = scrolled || open ? "glass" : isHome ? "hero" : "flat";

  // The menu panel starts at the header's current bottom edge rather than a fixed offset.
  const toggleMenu = () => {
    if (!open) setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    setOpen((value) => !value);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      ref={headerRef}
      className={cx(
        "pointer-events-none sticky top-0 z-40 h-24 px-(--gutter) pbs-4 lg:px-[clamp(1rem,5vw,4.5rem)]",
        // Home: overlay the full-bleed hero photograph; elsewhere the bar keeps its own space.
        isHome && "-mbe-24",
      )}
    >
      <a
        href="#main"
        className="fixed left-4 top-3 z-50 -translate-y-24 bg-ink px-4 py-2 text-sm text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      {/* Logo and nav grouped left, one CTA right. Flat at the top of inner pages, a floating frosted panel otherwise. */}
      <div
        className={cx(
          "pointer-events-auto flex h-16 w-full items-center gap-8 rounded-panel border ps-4 pe-2.5 transition-[background-color,border-color,backdrop-filter] duration-300 lg:ps-5",
          look === "hero" && "border-line/70 bg-paper/80 backdrop-blur-xl backdrop-saturate-150",
          look === "glass" && "border-line/70 bg-[oklch(0.94_0.004_286/0.85)] backdrop-blur-xl backdrop-saturate-150",
          look === "flat" && "border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          className="shrink-0"
          aria-label="MagnaCap home"
          onClick={() => setOpen(false)}
        >
          {logo}
        </Link>

        <nav aria-label="Main" className="hidden flex-1 self-stretch lg:block">
          <ul className="flex h-full items-center gap-1">
            {navigation.filter((item) => item.href !== "/contact").map((item) =>
              "children" in item ? (
                <NavDropdown key={item.href} item={item} active={isActive(item.href)} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...externalLinkProps(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "flex h-10 items-center rounded-control px-3 text-[0.9375rem] transition-colors focus-visible:-outline-offset-4",
                      isActive(item.href) ? "bg-signal text-ink" : "text-muted hover:bg-signal hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link
          href="/contact"
          aria-current={isActive("/contact") ? "page" : undefined}
          className="button-link hidden h-11 items-center rounded-[0.625rem] bg-signal px-4 text-sm font-medium text-ink hover:bg-signal-hover lg:inline-flex"
        >
          Get started
        </Link>

        <button
          type="button"
          className="ms-auto inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 7h14M3 13h14" />
            )}
          </svg>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        style={{ insetBlockStart: menuTop }}
        className="fixed inset-x-0 bottom-0 overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Main mobile" className="px-(--gutter) pb-10">
          <ul>
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  {...externalLinkProps(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cx(
                    "flex items-center justify-between py-5 text-2xl tracking-[-0.02em]",
                    isActive(item.href) ? "text-ink" : "text-muted",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden="true" className="size-2 bg-signal" />
                  )}
                </Link>
                {"children" in item && (
                  <ul className="-mt-2 pb-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setOpen(false)} className="block py-2 ps-4 text-lg text-muted hover:text-signal-ink">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

type NavItemWithChildren = Extract<(typeof navigation)[number], { children: unknown }>;

/**
 * Desktop nav item with a dropdown: the label links to the page, the chevron
 * button toggles the panel. Opens on hover for pointers; Escape or leaving the
 * item (mouse or focus) closes it.
 */
function NavDropdown({ item, active }: { item: NavItemWithChildren; active: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const itemRef = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={itemRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      onBlur={(event) => {
        if (!itemRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <div className={cx("flex h-10 items-center rounded-control transition-colors", active || open ? "bg-signal text-ink" : "text-muted hover:bg-signal hover:text-ink")}>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className="flex h-full items-center ps-3 pe-1 text-[0.9375rem] focus-visible:-outline-offset-4"
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${item.label} menu`}
          onClick={() => setOpen((value) => !value)}
          className="grid h-full place-items-center pe-2.5 ps-0.5 focus-visible:-outline-offset-4"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className={cx("size-3.5 transition-transform", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>
      </div>
      <div id={panelId} hidden={!open} className="absolute start-0 top-full pt-2">
        <ul className="w-64 rounded-panel border border-line bg-paper p-1.5">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className="block rounded-control px-3 py-2.5 text-[0.9375rem] text-ink hover:bg-signal hover:text-ink"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
