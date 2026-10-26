"use client";

import { useId } from "react";
import { mailto } from "@/content/site";
import { ArrowIcon } from "./ui";

/**
 * Market-report sign-up. No list service is connected, so submitting opens a
 * pre-filled email to MagnaCap (the same fallback as the contact form) and
 * never claims the address was added.
 */
export function NewsletterForm() {
  const id = useId();
  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get("email");
        window.location.href = mailto(
          "Subscribe to market reports",
          `Please add ${email} to the MagnaCap market reports mailing list.`,
        );
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
