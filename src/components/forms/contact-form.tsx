"use client";

import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { GROWTH_GOALS } from "@/lib/contact-schema";
import { Honeypot, InputField, SelectField, TextareaField } from "./fields";
import { useInquirySubmit } from "./use-inquiry-submit";

export function ContactForm({ source = "Contact page", compact = false }: { source?: string; compact?: boolean }) {
  const { status, error, fieldErrors, submit, reset } = useInquirySubmit("contact");

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
          <CircleCheck className="h-8 w-8" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-fg">Message received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for reaching out. A TalentBridge client representative will contact you within 24 hours. Check your inbox for a confirmation.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent/50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="relative space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void submit(e.currentTarget, { source });
      }}
    >
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Full name" name="name" placeholder="e.g. Sarah Jenkins" required autoComplete="name" error={fieldErrors.name} />
        <InputField label="Work email" name="email" type="email" placeholder="sarah@company.com" required autoComplete="email" error={fieldErrors.email} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Company name" name="company" placeholder="Acme Software Inc." autoComplete="organization" error={fieldErrors.company} />
        <SelectField label="Team growth goal" name="goal" options={GROWTH_GOALS} required error={fieldErrors.goal} />
      </div>
      <TextareaField
        label="How can we help you grow?"
        name="message"
        rows={compact ? 3 : 5}
        placeholder="Tell us about your project requirements or hiring timeline..."
        error={fieldErrors.message}
      />

      {error ? (
        <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
        {status === "submitting" ? "Sending…" : "Submit consultation request"}
      </button>
      <p className="text-center text-xs text-subtle">We reply within 24 hours. No spam, ever.</p>
    </form>
  );
}
