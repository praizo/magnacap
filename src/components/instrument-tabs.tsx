"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "./ui";

type Instrument = { name: string; body: string; venues: readonly string[]; icon: ReactNode };

/**
 * Instruments as tabs: one large detail panel instead of a card grid.
 * Follows the ARIA tabs pattern (arrow keys, Home and End move between tabs).
 */
export function InstrumentTabs({ items }: { items: readonly Instrument[] }) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[selected];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = items.length - 1;
    const next =
      event.key === "ArrowRight" ? (selected === last ? 0 : selected + 1)
      : event.key === "ArrowLeft" ? (selected === 0 ? last : selected - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="instrument-tabs">
      <div role="tablist" aria-label="The instruments we cover" className="instrument-tablist" onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <button
            key={item.name}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === selected}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            className={cx("instrument-tab", i === selected && "is-selected")}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div key={selected} role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${selected}`} className="instrument-panel">
        <span className="instrument-icon" aria-hidden="true">{current.icon}</span>
        <div>
          <h4 className="text-h3 text-ink">{current.name}</h4>
          <p className="mt-3 max-w-[56ch] text-lead text-muted">{current.body}</p>
          {current.venues.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Venues">
              {current.venues.map((venue) => (
                <li key={venue} className="instrument-venue">{venue}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
