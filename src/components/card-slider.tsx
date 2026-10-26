"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowIcon, cx } from "./ui";

/**
 * Horizontal card slider: native scroll-snap (so swipe and trackpad work),
 * previous/next buttons that move one card and loop at either end, and
 * clickable position dots. Smooth scrolling is skipped for reduced motion.
 */
export function CardSlider({
  label,
  perView = 3,
  children,
}: {
  label: string;
  /** Cards visible at once on wide screens. */
  perView?: 2 | 3;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);
  // Stopping positions, not cards: with three cards visible, six cards give four stops.
  const [stops, setStops] = useState(count);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0") : 1;
    setIndex(Math.round(track.scrollLeft / step));
    setStops(Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / step) + 1));
  }, []);

  useEffect(() => {
    update();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  // Loops: past the last stop returns to the first, before the first goes to the last.
  const go = (target: number) => {
    const track = trackRef.current;
    const stop = ((target % stops) + stops) % stops;
    const card = track?.children[stop] as HTMLElement | undefined;
    if (!track || !card) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div className={cx("card-slider", perView === 2 && "card-slider-2")} role="region" aria-roledescription="carousel" aria-label={label}>
      <ul ref={trackRef} className="card-slider-track" onScroll={update}>
        {Children.map(children, (child, i) => (
          <li aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>{child}</li>
        ))}
      </ul>
      <div className="card-slider-controls">
        <div className="flex items-center">
          {Array.from({ length: stops }, (_, i) => (
            <button
              key={i}
              type="button"
              className="card-slider-dot"
              aria-label={`Go to position ${i + 1} of ${stops}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className="card-slider-button" onClick={() => go(index - 1)} aria-label="Previous">
            <ArrowIcon className="rotate-180" />
          </button>
          <button type="button" className="card-slider-button" onClick={() => go(index + 1)} aria-label="Next">
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
