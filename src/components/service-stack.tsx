"use client";

import { Children, type ReactNode } from "react";
import ScrollStack, { ScrollStackItem } from "./react-bits/scroll-stack";
import "./service-stack.css";

/**
 * Services as a React Bits ScrollStack. Cards share one height that always
 * fits the viewport (see service-stack.css), so a pinned card is never cut off;
 * native scrolling is kept and buried cards only shrink and dim slightly.
 */
export function ServiceStack({ children }: { children: ReactNode }) {
  return (
    <ScrollStack
      className="service-stack"
      useWindowScroll
      smoothScroll={false}
      itemDistance={48}
      itemStackDistance={20}
      stackPosition={112}
      itemScale={0.02}
      baseScale={0.94}
      dimAmount={0.05}
      holdDistance={96}
    >
      {Children.map(children, (child) => child && <ScrollStackItem itemClassName="stack-card-shell">{child}</ScrollStackItem>)}
    </ScrollStack>
  );
}
