import type { Metadata } from "next";
import { Building2, CalendarCheck, Clock, Mail, MapPin, MessageSquareText } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { BookingButton } from "@/components/booking/booking-provider";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to TalentBridge US-BD workforce strategists. Receive candidate profiles within 48 hours.",
};

const OFFICES = [
  { icon: MapPin, title: "US headquarters", text: CONTACT.usHq, cls: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10", map: CONTACT.usHq },
  { icon: Building2, title: "Dhaka delivery center", text: CONTACT.dhaka, cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10", map: CONTACT.dhaka },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-pattern noise-mask" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Get started today</span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl">
            Ready to scale your <span className="text-gradient">high-output global team?</span>
          </h1>
          <p className="mt-5 leading-relaxed text-muted">
            Speak with our US-based workforce strategists to audit your hiring velocity, project payroll savings and receive candidate
            profiles within 48 hours.
          </p>

          <div className="mt-8 space-y-3">
            {OFFICES.map(({ icon: Icon, title, text, cls }) => (
              <div key={title} className="glass flex items-center gap-4 rounded-2xl p-4">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cls}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-fg">{title}</h2>
                  <p className="text-sm text-muted">{text}</p>
                </div>
              </div>
            ))}
            <a href={`mailto:${CONTACT.email}`} className="glass glass-hover flex items-center gap-4 rounded-2xl p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-fg">Enterprise inquiries</h2>
                <p className="break-all text-sm text-muted">{CONTACT.email}</p>
              </div>
            </a>
            <div className="glass flex items-center gap-4 rounded-2xl p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-fg">Response time</h2>
                <p className="text-sm text-muted">Within 24 hours, Monday to Friday</p>
              </div>
            </div>
          </div>

          <BookingButton className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-line-strong bg-surface-solid px-6 py-4 text-sm font-bold text-fg transition hover:border-accent/60 hover:text-accent">
            <CalendarCheck className="h-4 w-4" /> Prefer a call? Book a time slot
          </BookingButton>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="glass relative rounded-[2rem] p-6 shadow-2xl sm:p-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-blue-600/20">
                <MessageSquareText className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-fg">Schedule a strategy consultation</h2>
                <p className="text-sm text-subtle">Tell us about your team. We&apos;ll take it from there.</p>
              </div>
            </div>
            <ContactForm source="Contact page" />
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        {OFFICES.map((o) => (
          <Reveal key={o.title}>
            <div className="glass overflow-hidden rounded-[2rem]">
              <iframe
                title={`Map of ${o.title}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(o.map)}&output=embed`}
                className="h-64 w-full border-0 grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="flex items-center gap-2 px-5 py-4 text-sm font-semibold text-fg">
                <o.icon className="h-4 w-4 text-accent" /> {o.title}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
