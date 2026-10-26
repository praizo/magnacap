import type { ReactNode } from "react";
import { socials } from "@/content/site";

type Network = (typeof socials.links)[number]["network"];

const glyphs: Record<Network, ReactNode> = {
  LinkedIn: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4Z" />,
  X: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78Zm-1.08 16.18h1.7L7.4 4.73H5.58Z" />,
  Instagram: (
    <>
      <path d="M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 7.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      <circle cx="17.1" cy="6.9" r="1.1" />
      <path d="M16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2Zm3.75 14.5a3.75 3.75 0 0 1-3.75 3.75h-9a3.75 3.75 0 0 1-3.75-3.75v-9A3.75 3.75 0 0 1 7.5 3.75h9a3.75 3.75 0 0 1 3.75 3.75Z" />
    </>
  ),
  Facebook: <path d="M13.5 21.95V14h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.54-1.5h1.65V4.62A22 22 0 0 0 14.28 4.5c-2.37 0-4 1.45-4 4.1v2.3H7.6V14h2.68v7.95A10 10 0 1 1 13.5 21.95Z" />,
  TikTok: <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.85-2.48V9.78a5.7 5.7 0 1 0 4.94 5.62V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48Z" />,
};

/** Footer social links: icon plus network name, after risevest.com. */
export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={className} aria-label={`Follow ${socials.owner}`}>
      {socials.links.map((link) => (
        <li key={link.network}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="currentColor">
              {glyphs[link.network]}
            </svg>
            {link.network}
            <span className="sr-only"> ({socials.owner}, opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
