import type { ReactNode } from "react";
import { instruments } from "@/content/site";

const iconProps = { viewBox: "0 0 24 24", className: "size-6", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Line icons for the four instrument groups. Decorative only. */
export const instrumentIcons: Record<(typeof instruments)[number]["name"], ReactNode> = {
  Bonds: <svg {...iconProps}><path d="M6 3.75h9l3 3v13.5H6Z" /><path d="M9 10.5h6M9 13.5h6M9 16.5h4" /></svg>,
  "Money market instruments": <svg {...iconProps}><ellipse cx="12" cy="7" rx="7" ry="3" /><path d="M5 7v5c0 1.66 3.13 3 7 3s7-1.34 7-3V7M5 12v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" /></svg>,
  Equities: <svg {...iconProps}><path d="M3.75 20.25h16.5M6 16.5l4-5 3 3 5-6.5" /><path d="M14.5 8h3.5v3.5" /></svg>,
  Commodities: <svg {...iconProps}><path d="M12 20.25V9.75M12 9.75c0-3 2-5.25 5.25-6-.25 3.25-2.25 5.5-5.25 6Zm0 0C12 6.75 10 4.5 6.75 3.75 7 7 9 9.25 12 9.75Zm0 5.25c0-2.5 1.75-4.5 4.5-5-.25 2.75-2 4.5-4.5 5Zm0 0c0-2.5-1.75-4.5-4.5-5 .25 2.75 2 4.5 4.5 5Z" /></svg>,
};
