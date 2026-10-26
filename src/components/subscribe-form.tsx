"use client";

import { useId, useState, type FormEvent } from "react";
import { contact, mailto, riskWarning } from "@/content/site";
import { ArrowIcon } from "./ui";

/**
 * Market-report subscription. When NEXT_PUBLIC_SUBSCRIBE_ENDPOINT is set, the
 * form POSTs JSON there and only confirms on a 2xx response. Without it, the
 * form composes an email to MagnaCap and never claims the visitor was added.
 */
const endpoint = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "handed-off" }
  | { kind: "error" };

const fieldClass =
  "mt-2 block w-full rounded-control border border-line-strong bg-paper px-4 py-3 text-ink placeholder:text-muted/70 focus-visible:border-slate focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate";

export function SubscribeForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!endpoint) {
      window.location.href = mailto(
        "Subscribe to market reports",
        `Please add me to the MagnaCap market reports mailing list.\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}`,
      );
      setStatus({ kind: "handed-off" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error" });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="py-6">
        <p className="text-h3 text-ink">You&apos;re subscribed.</p>
        <p className="mt-3 text-muted">Our next report will arrive in your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-describedby={`${id}-disclaimer`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first`} className="text-sm font-medium text-ink">
            First name
          </label>
          <input id={`${id}-first`} name="firstName" required autoComplete="given-name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-last`} className="text-sm font-medium text-ink">
            Last name
          </label>
          <input id={`${id}-last`} name="lastName" required autoComplete="family-name" className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink">
            Email
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-0.5 size-4 flex-none accent-slate"
        />
        I agree to receive market reports from MagnaCap by email. I can unsubscribe at any time.
      </label>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-control bg-signal px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-signal-hover disabled:opacity-60"
      >
        {status.kind === "sending" ? "Subscribing…" : "Subscribe"}
        <ArrowIcon />
      </button>

      <div role="status" aria-live="polite">
        {status.kind === "handed-off" && (
          <p className="mt-4 text-sm text-muted">
            Your email app should open with your request ready to send. If it didn&apos;t, write to{" "}
            <a href={`mailto:${contact.email}`} className="text-slate underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        )}
        {status.kind === "error" && (
          <p className="mt-4 rounded-control border border-signal-ink px-4 py-3 text-sm text-ink">
            We couldn&apos;t subscribe you just now. Please try again, or email {contact.email}.
          </p>
        )}
      </div>

      <p id={`${id}-disclaimer`} className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        We use your details only to send MagnaCap&apos;s reports and never share them with third parties. Our
        reports are for information only and do not constitute investment advice or an offer to buy or sell any
        security. {riskWarning}
      </p>
    </form>
  );
}
