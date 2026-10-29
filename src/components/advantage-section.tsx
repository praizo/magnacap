"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { advantages } from "@/content/site";
import { advantageStep } from "@/lib/advantage-scroll";
import { Label, cx } from "./ui";

type Advantage = (typeof advantages)[number]["title"];

/** One photograph per advantage; they crossfade as the active line changes. */
const photos: Record<Advantage, { src: string; alt: string; position?: string }> = {
  "Efficient trading": {
    src: "/advantages/execution.webp",
    alt: "A Black professional working intently at a laptop.",
  },
  "Confidentiality and anonymity": {
    src: "/advantages/discretion.webp",
    alt: "Two women in a private one-to-one conversation by a window.",
  },
  "Strong reputation": {
    src: "/advantages/reputation.webp",
    alt: "Business professionals exchanging a handshake.",
  },
  "Price discovery": {
    src: "/advantages/price-discovery.webp",
    alt: "A trading screen showing market quotes and a price chart.",
  },
  "Market insight": {
    src: "/advantages/insight.webp",
    alt: "A Black professional reviewing a printed report beside a laptop.",
    position: "center top",
  },
};

/** ScrollTrigger owns measurement, pinning and settling; React changes only at a step. */
export function AdvantageSection() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<((index: number) => void) | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    let disposed = false;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    // Touch layouts and very short viewports get the readable static list. Reduced motion keeps the
    // slider (Windows reports it whenever animation effects are off) but drops the animated snap.
    media.add({ enhanced: "(min-width: 64rem) and (min-height: 36rem)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (!context.conditions?.enhanced) return;
      const reduce = Boolean(context.conditions.reduce);
      root.dataset.enhanced = "true";
      let selected = 0;
      const last = advantages.length - 1;
      const update = (progress: number, force = false) => {
        const next = advantageStep(progress, selected, advantages.length, force);
        if (next !== selected || force) {
          selected = next;
          setActive(next);
        }
      };
      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: "top 112px",
        end: () => `+=${Math.max(320, window.innerHeight * 0.48) * last}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: reduce
          ? undefined
          : {
              snapTo: 1 / last,
              directional: false,
              inertia: false,
              delay: 0.16,
              duration: { min: 0.18, max: 0.32 },
              ease: "power2.out",
            },
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress, true),
      });
      selectRef.current = (index) => {
        trigger.getTween(true)?.kill();
        const destination = trigger.start + (index / last) * (trigger.end - trigger.start);
        window.scrollTo({
          top: Math.min(trigger.end - 1, Math.max(trigger.start + 1, destination)),
          behavior: "instant",
        });
        ScrollTrigger.update();
      };
      void document.fonts.ready.then(() => {
        if (!disposed && root.dataset.enhanced) trigger.refresh();
      });
      return () => {
        selectRef.current = null;
        delete root.dataset.enhanced;
      };
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="advantage-experience">
      <div ref={stageRef} className="advantage-stage">
        <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <Label as="h2" className="text-on-slate-muted">
              <span id="advantage-title">The MagnaCap advantage</span>
            </Label>
            <ul className="advantage-original-list mbs-8">
              {advantages.map((item, i) => {
                const photo = photos[item.title];
                return (
                  <li key={item.title}>
                    <div className="advantage-mobile-image relative mbe-5 aspect-16/10 overflow-clip rounded-panel bg-slate">
                      <Image src={photo.src} alt={photo.alt} fill unoptimized className="object-cover" style={{ objectPosition: photo.position }} />
                    </div>
                    <h3>
                      <span className="advantage-static-title advantage-line">{item.title}.</span>
                      <button
                        type="button"
                        className={cx("advantage-select advantage-line text-start", i === active ? "text-signal" : "text-on-slate-quiet")}
                        aria-current={i === active ? "step" : undefined}
                        aria-describedby={`advantage-summary-${i}`}
                        onClick={() => selectRef.current?.(i)}
                      >
                        {item.title}.
                      </button>
                    </h3>
                    <p id={`advantage-summary-${i}`} className="advantage-summary mbs-2 max-w-[40ch] text-lead text-on-slate-muted">{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="advantage-visual lg:col-span-5" aria-hidden="true">
            <div className="advantage-frame relative aspect-4/3 overflow-clip rounded-panel bg-slate">
              {advantages.map((item, i) => {
                const photo = photos[item.title];
                return <Image key={item.title} src={photo.src} alt="" fill unoptimized className={cx("advantage-photo object-cover", i === active && "is-active")} style={{ objectPosition: photo.position }} />;
              })}
            </div>
            <div className="mbs-6 grid border-t border-on-slate-line pbs-5">
              {advantages.map((item, i) => (
                <div key={item.title} className={cx("advantage-note col-start-1 row-start-1", i === active && "is-active")}>
                  <p className="tabular font-mono text-xs uppercase tracking-[0.08em] text-signal">{item.title}</p>
                  <p className="mbs-3 text-h3 text-on-slate">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
