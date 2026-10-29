"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { contact, mailto } from "@/content/site";
import { cx } from "./ui";

/**
 * When NEXT_PUBLIC_CONTACT_ENDPOINT is set, the form POSTs JSON there and only
 * reports success on a 2xx response. Without it, the form composes an email in
 * the visitor's mail app — nothing is claimed as "sent".
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "handed-off" }
  | { kind: "error"; message: string };

const fieldClass =
  "mt-2 block w-full rounded-control border border-line-strong bg-paper px-4 py-3 text-ink placeholder:text-muted/70 focus-visible:border-slate focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate aria-invalid:border-signal-ink";

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const emailRef = useRef<HTMLInputElement>(null);

  // Prefill the email handed over from the home hero (/contact?email=…).
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (email && emailRef.current && !emailRef.current.value) emailRef.current.value = email;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!endpoint) {
      const body = [
        data.message,
        "",
        `— ${data.name}`,
        data.organisation && `Organisation: ${data.organisation}`,
        `Email: ${data.email}`,
        data.phone && `Phone: ${data.phone}`,
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = mailto("Website enquiry", body);
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
      setStatus({
        kind: "error",
        message: `Your message could not be sent. Please email us at ${contact.email} or call us instead.`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-describedby={endpoint ? `${id}-note` : undefined}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink">
            Full name
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-org`} className="text-sm font-medium text-ink">
            Organisation <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-org`} name="organisation" autoComplete="organization" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink">
            Email
          </label>
          <input ref={emailRef} id={`${id}-email`} name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="text-sm font-medium text-ink">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink">
            Message
          </label>
          <textarea id={`${id}-message`} name="message" required rows={6} className={cx(fieldClass, "resize-y")} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex items-center gap-3 rounded-control bg-signal px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-signal-hover disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Submit"}
        </button>
        {endpoint && (
          <p id={`${id}-note`} className="text-sm text-muted">
            We use your details only to respond to your enquiry.
          </p>
        )}
      </div>

      <div role="status" aria-live="polite" className="mt-6">
        {status.kind === "sent" && (
          <p className="rounded-control bg-mist px-4 py-3 text-ink">
            Thank you — your message has been sent. We&apos;ll reply as soon as we can.
          </p>
        )}
        {status.kind === "handed-off" && (
          <p className="text-sm text-muted">
            If your email app didn&apos;t open, write to us at{" "}
            <a href={`mailto:${contact.email}`} className="text-slate underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        )}
        {status.kind === "error" && (
          <p className="rounded-control border border-signal-ink px-4 py-3 text-ink">{status.message}</p>
        )}
      </div>
    </form>
  );
}
