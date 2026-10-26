"use client";

import { useEffect, useState } from "react";
import { cx } from "./ui";

/**
 * Sticky in-page menu for the Services page. Highlights the section currently
 * in view, including panels that overlap in the sticky service stack.
 */
export function ServiceNav({ items }: { items: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const panels = items.map((item) => document.getElementById(item.id));
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const panel of panels) {
        if (!panel) continue;
        const inset = Number.parseFloat(getComputedStyle(panel).insetBlockStart) || 0;
        if (panel.getBoundingClientRect().top <= Math.max(window.innerHeight * 0.3, inset + 64)) {
          current = panel.id;
        }
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    panels.forEach((panel) => { if (panel) observer.observe(panel); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className="service-nav">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">On this page</p>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cx("service-nav-link", active === item.id && "is-active")}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
