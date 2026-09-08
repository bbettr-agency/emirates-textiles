"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

/**
 * Native enquiry form (no GHL) — styled for a light surface, like a trade order
 * slip. Validates client-side and shows a success state. Submission is not yet
 * wired to a backend — connect to the Bbettr webhook on approval.
 */
const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", required: false },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true, inputMode: "email" as const },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false, inputMode: "tel" as const },
];

const inputCls =
  "w-full rounded-btn border border-hair-strong bg-paper px-4 py-3 text-ink placeholder-ink-muted/60 outline-none transition-colors focus:border-navy";

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !email) {
      setError("Please add your name and email so we can reply.");
      return;
    }
    setError(null);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 border border-hair bg-paper p-8" role="status" aria-live="polite">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy-deep">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-ink">Thank you — enquiry received.</h3>
        <p className="text-sm leading-relaxed text-ink-2">
          Our team will be in touch shortly about colours, widths and availability. For anything
          urgent, WhatsApp or call us directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-hair bg-paper/70 p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <p className="tech text-ink-muted">Quick enquiry</p>
        <p className="tech-code text-ink-muted">* required</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-2">
              {f.label} {f.required ? <span className="text-gold">*</span> : null}
            </span>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              inputMode={"inputMode" in f ? f.inputMode : undefined}
              className={inputCls}
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-2">
          What are you looking for?
        </span>
        <textarea name="message" rows={4} placeholder="Fabric, colours, widths, quantities…" className={`${inputCls} resize-y`} />
      </label>

      {error ? (
        <p className="mt-3 text-sm font-medium text-[#B02C2E]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        data-cta="enquiry-submit"
        className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-btn bg-navy px-6 text-[0.95rem] font-semibold text-white shadow-cta transition-[transform,background-color] duration-200 ease-emirates hover:-translate-y-0.5 hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
      >
        Send enquiry
        <span aria-hidden="true">→</span>
      </button>
      <p className="mt-3 tech-code text-ink-muted">We reply within one business day · no obligation.</p>
    </form>
  );
}
