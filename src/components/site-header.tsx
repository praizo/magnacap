"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { contact, headerNavigation } from "@/content/site";
import { cx, externalLinkProps } from "./ui";

export function SiteHeader({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);
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
  // A solid shared surface keeps the landing-menu appearance identical over every page.
  const floating = isHome || scrolled || open;

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const header = menuRef.current?.closest("header");
        const controls = Array.from(header?.querySelectorAll<HTMLElement>(
          ".site-header-panel a, .mobile-navigation summary, .mobile-navigation a",
        ) ?? []).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === "Escape") {
        if (menuRef.current) menuRef.current.open = false;
        menuRef.current?.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches && menuRef.current) menuRef.current.open = false;
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
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
        data-floating={floating}
        className="site-header-panel pointer-events-auto relative isolate z-10 flex h-16 w-full items-center gap-8 rounded-panel border ps-4 pe-2.5 lg:ps-5"
      >
        <Link
          href="/"
          className="shrink-0"
          aria-label="MagnaCap home"
          onClick={closeMenu}
        >
          {logo}
        </Link>

        <nav aria-label="Main" className="hidden flex-1 self-stretch lg:block">
          <ul className="flex h-full items-center gap-1">
            {headerNavigation.map((item) =>
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
      </div>

      {/* Native disclosure works before hydration, with the sheet behind the floating bar. */}
      <details
        ref={menuRef}
        className="mobile-navigation lg:hidden"
        onToggle={(event) => {
          if (event.target === event.currentTarget) setOpen(event.currentTarget.open);
        }}
      >
        <summary className="mobile-menu-toggle" aria-controls={menuId}>
          <span className="mobile-menu-closed-label">Menu</span>
          <span className="mobile-menu-open-label">Close</span>
          <span className="mobile-menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </summary>
        <div id={menuId} className="mobile-menu on-dark">
          <nav aria-label="Main mobile" className="mobile-menu-body">
            <p className="mobile-menu-eyebrow">Explore MagnaCap</p>
            <ul className="mobile-menu-links">
              {headerNavigation.map((item) => (
                <li key={item.href}>
                  {"children" in item ? (
                    <details className="mobile-services">
                      <summary className="mobile-menu-link" data-active={isActive(item.href)}>
                        <span>{item.label}</span>
                        <span className="mobile-services-icon" aria-hidden="true" />
                      </summary>
                      <ul className="mobile-services-links">
                        <li>
                          <Link href={item.href} onClick={closeMenu} className="mobile-service-overview">
                            All services <MenuArrow />
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMenu}
                              aria-current={pathname === child.href ? "page" : undefined}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      {...externalLinkProps(item.href)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={closeMenu}
                      className="mobile-menu-link"
                    >
                      <span>{item.label}</span>
                      <MenuArrow external={item.href.startsWith("https://")} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu-footer">
            <Link href="/contact" onClick={closeMenu} className="mobile-menu-cta">
              Get started <MenuArrow />
            </Link>
            <div className="mobile-menu-contact">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phones[0].tel}`} className="tabular">
                {contact.phones[0].display}
              </a>
            </div>
          </div>
        </div>
      </details>
    </header>
  );
}

function MenuArrow({ external = false }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mobile-menu-arrow" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d={external ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

type NavItemWithChildren = Extract<(typeof headerNavigation)[number], { children: unknown }>;

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
      <div id={panelId} hidden={!open} className="nav-dropdown absolute inset-s-0 top-full pt-2">
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
