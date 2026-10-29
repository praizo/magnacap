"use client";

import { Children, useRef, useState, type ReactNode } from "react";

/**
 * A list that becomes a swipe carousel on phones (see .other-services), with
 * position dots under it. From 40rem up it is a plain grid and the dots hide.
 */
export function SwipeList({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  // The card whose start is nearest the scroll position; the last once the track can scroll no further.
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const list = cards();
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) return setIndex(list.length - 1);
    const starts = list.map((card) => card.offsetLeft - list[0].offsetLeft);
    const nearest = starts.reduce((best, start, i) => (Math.abs(start - track.scrollLeft) < Math.abs(starts[best] - track.scrollLeft) ? i : best), 0);
    setIndex(nearest);
  }

  function go(i: number) {
    const track = trackRef.current;
    const list = cards();
    if (!track || !list[i]) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: list[i].offsetLeft - list[0].offsetLeft, behavior: smooth ? "smooth" : "auto" });
  }

  return (
    <>
      <ul ref={trackRef} className={className} aria-label={label} onScroll={handleScroll}>
        {children}
      </ul>
      <div className="swipe-dots" aria-label={`${label}: choose a card`}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className="card-slider-dot"
            aria-label={`Show card ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </>
  );
}
