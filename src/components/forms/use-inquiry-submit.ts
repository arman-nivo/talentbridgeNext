"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type ApiResponse = { ok: boolean; error?: string; fieldErrors?: Record<string, string> };

/** Posts a form's values to /api/contact and tracks status and field errors. */
export function useInquirySubmit(type: "contact" | "booking") {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(form: HTMLFormElement, extra: Record<string, string> = {}) {
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...extra, type }),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as ApiResponse;
      if (!res.ok || !data.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return false;
      }
      setStatus("success");
      form.reset();
      return true;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setError(null);
    setFieldErrors({});
  }

  return { status, error, fieldErrors, submit, reset };
}
