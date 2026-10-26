"use client";

import { usePathname, useRouter } from "next/navigation";
import { useId } from "react";
import { prefillEvent } from "./subscribe-form";
import { ArrowIcon } from "./ui";

/**
 * Footer market-report sign-up. It only collects the email, then hands over to
 * the full subscribe form on /insights (name, consent, disclaimer) with the
 * address prefilled, so every subscriber signs up through the same form.
 */
export function NewsletterForm() {
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        const email = String(new FormData(event.currentTarget).get("email") ?? "");
        // Elsewhere the subscribe form reads ?email= when it mounts; on /insights
        // it is already mounted, so hand the address over with an event instead.
        if (pathname === "/insights") {
          window.dispatchEvent(new CustomEvent(prefillEvent, { detail: email }));
          document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(`/insights?${new URLSearchParams({ email })}#subscribe`);
        }
      }}
    >
      <label htmlFor={id} className="sr-only">
        Your email address
      </label>
      <input id={id} name="email" type="email" required autoComplete="email" placeholder="Enter your email address" />
      <button type="submit">
        Subscribe
        <ArrowIcon />
      </button>
    </form>
  );
}
