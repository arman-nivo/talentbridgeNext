"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { CalendarCheck, CircleCheck, LoaderCircle, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { TIMEZONES } from "@/lib/contact-schema";
import { Honeypot, InputField, SelectField } from "@/components/forms/fields";
import { useInquirySubmit } from "@/components/forms/use-inquiry-submit";

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

type BookingContextValue = { openBooking: () => void };

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

/** Local date as YYYY-MM-DD, offset by `days`. */
function isoDate(days = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Remember which page the modal was opened on, so it closes on navigation.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const [minDate, setMinDate] = useState("");
  const open = openedOn !== null && openedOn === pathname;
  const close = useCallback(() => setOpenedOn(null), []);

  const value: BookingContextValue = {
    openBooking: () => {
      setMinDate(isoDate(1));
      setOpenedOn(pathname);
    },
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open ? <BookingModal key="booking" minDate={minDate} onClose={close} /> : null}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}

function BookingModal({ minDate, onClose }: { minDate: string; onClose: () => void }) {
  const { status, error, fieldErrors, submit } = useInquirySubmit("booking");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLInputElement>("input:not([tabindex='-1'])")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close booking dialog"
        className="absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-line-strong bg-surface-solid p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-subtle transition hover:bg-surface-strong hover:text-fg"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
              <CircleCheck className="h-8 w-8" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-fg">You&apos;re booked in!</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              We&apos;ve emailed you a confirmation. A workforce strategist will send a calendar invite within one business day.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-cyan-500/20">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <h3 id="booking-title" className="font-display text-xl font-bold text-fg">
                Book an executive strategy call
              </h3>
              <p className="mt-1 text-sm text-muted">30 minutes with our US-Bangladesh workforce architects.</p>
            </div>

            <form
              className="relative mt-6 space-y-4"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                void submit(e.currentTarget);
              }}
            >
              <Honeypot />
              <InputField label="Your name" name="name" placeholder="John Doe" required autoComplete="name" error={fieldErrors.name} />
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Work email" name="email" type="email" placeholder="john@company.com" required autoComplete="email" error={fieldErrors.email} />
                <InputField label="Company" name="company" placeholder="Acme Inc." autoComplete="organization" error={fieldErrors.company} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Date" name="date" type="date" min={minDate} defaultValue={minDate} required error={fieldErrors.date} />
                <SelectField label="Time" name="time" options={TIME_SLOTS} defaultValue="10:00 AM" required error={fieldErrors.time} />
              </div>
              <SelectField label="Timezone" name="timezone" options={TIMEZONES} required error={fieldErrors.timezone} />

              {error ? (
                <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-300">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "submitting" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {status === "submitting" ? "Booking…" : "Confirm booking"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Any button on the site that should open the booking dialog. */
export function BookingButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={openBooking} className={className}>
      {children}
    </button>
  );
}
