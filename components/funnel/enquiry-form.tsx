"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Native enquiry form (no GHL). Demo build: validates client-side and shows a
 * polished success state. Submission is not yet wired to a backend — connect to
 * the Bbettr webhook architecture on approval (see PROJECT_STATUS.md).
 */
const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", required: false },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true, inputMode: "email" as const },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false, inputMode: "tel" as const },
];

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
      <div
        className="flex flex-col items-start gap-4 rounded-panel border border-white/15 bg-white/5 p-8 text-white"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy-deep">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="font-display text-2xl text-white">Thank you — enquiry received.</h3>
        <p className="text-sm leading-relaxed text-white/70">
          Our team will be in touch shortly about colours, widths and availability.
          For anything urgent, WhatsApp or call us directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-panel border border-white/15 bg-white/5 p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className={cn("block", f.name === "email" || f.name === "phone" ? "" : "")}>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              {f.label} {f.required ? <span className="text-gold">*</span> : null}
            </span>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              inputMode={"inputMode" in f ? f.inputMode : undefined}
              className="w-full rounded-btn border border-white/15 bg-navy-deep/40 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-gold"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
          What are you looking for?
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Fabric, colours, widths, quantities…"
          className="w-full resize-y rounded-btn border border-white/15 bg-navy-deep/40 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-gold"
        />
      </label>

      {error ? (
        <p className="mt-3 text-sm text-[#F6B4B4]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        data-cta="enquiry-submit"
        className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-btn bg-gold px-6 text-[0.95rem] font-semibold text-navy-deep shadow-lift transition-[transform,background-color] duration-200 ease-emirates hover:-translate-y-0.5 hover:bg-[#d4ab54] focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
      >
        Send enquiry
      </button>
      <p className="mt-3 text-xs text-white/40">
        We reply within one business day. No obligation.
      </p>
    </form>
  );
}
