"use client";

import { useId, useState, type FormEvent } from "react";
import { contact, mailto } from "@/content/site";
import { ArrowIcon, cx } from "./ui";

/**
 * Career application. When NEXT_PUBLIC_CAREERS_ENDPOINT is set, the form POSTs
 * multipart data (including the CV file) there and only confirms on a 2xx
 * response. Without it, the form composes an email instead; mailto: links
 * can't carry files, so the CV field is hidden and the visitor is asked to
 * attach their CV in their email app.
 */
const endpoint = process.env.NEXT_PUBLIC_CAREERS_ENDPOINT;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "handed-off" }
  | { kind: "error" };

const fieldClass =
  "mt-2 block w-full rounded-control border border-line-strong bg-paper px-4 py-3 text-ink placeholder:text-muted/70 focus-visible:border-slate focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate";

export function CareersForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    if (!endpoint) {
      const data = Object.fromEntries(formData) as Record<string, string>;
      const body = [
        data.note,
        "",
        `— ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        data.linkedin ? `LinkedIn: ${data.linkedin}` : null,
        "",
        "[Please attach your CV and cover letter before sending.]",
      ]
        .filter((line) => line !== null)
        .join("\n");
      window.location.href = mailto(`Career application: ${data.firstName} ${data.lastName}`, body);
      setStatus({ kind: "handed-off" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: formData });
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
        <p className="text-h3 text-ink">Application received.</p>
        <p className="mt-3 text-muted">Thank you for your interest in MagnaCap.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink">
            Email
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="text-sm font-medium text-ink">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-linkedin`} className="text-sm font-medium text-ink">
            LinkedIn profile <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-linkedin`} name="linkedin" type="url" placeholder="https://" className={fieldClass} />
        </div>
        {endpoint && (
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-cv`} className="text-sm font-medium text-ink">
              CV <span className="font-normal text-muted">(PDF or Word)</span>
            </label>
            <input
              id={`${id}-cv`}
              name="cv"
              type="file"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className={cx(fieldClass, "file:mr-4 file:rounded-control file:border-0 file:bg-mist file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-ink")}
            />
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink">
            Cover note
          </label>
          <textarea
            id={`${id}-message`}
            name="note"
            required
            rows={5}
            placeholder="Tell us about yourself and why you'd like to join MagnaCap."
            className={cx(fieldClass, "resize-y")}
          />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-ink">
        <input type="checkbox" name="consent" value="yes" required className="mt-0.5 size-4 flex-none accent-slate" />
        I agree to MagnaCap keeping my details to consider my application.
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex items-center gap-3 rounded-control bg-signal px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-signal-hover disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Submit"}
          <ArrowIcon />
        </button>
      </div>

      <div role="status" aria-live="polite">
        {status.kind === "handed-off" && (
          <p className="mt-6 text-sm text-muted">
            If your email app didn&apos;t open, send your CV and cover letter to{" "}
            <a href={`mailto:${contact.email}`} className="text-slate underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        )}
        {status.kind === "error" && (
          <p className="mt-6 rounded-control border border-signal-ink px-4 py-3 text-sm text-ink">
            Your application could not be sent. Please try again, or email it to {contact.email}.
          </p>
        )}
      </div>
    </form>
  );
}
