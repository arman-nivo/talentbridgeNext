import Link from "next/link";
import { BadgeCheck, Lock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { CAPABILITIES, CONTACT } from "@/lib/data";
import { Logo } from "./logo";

const COMPANY_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/us-bd-model", label: "US-BD model" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/roi-calculator", label: "ROI calculator" },
  { href: "/contact", label: "Contact us" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-soft">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-line pb-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Enterprise workforce optimisation bridging US innovation speed with Bangladesh&apos;s elite tech talent pool.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, label: "SOC 2 Type II", cls: "text-cyan-600 dark:text-cyan-400" },
                { icon: Lock, label: "GDPR ready", cls: "text-emerald-600 dark:text-emerald-400" },
                { icon: BadgeCheck, label: "ISO 27001", cls: "text-indigo-600 dark:text-indigo-400" },
              ].map(({ icon: Icon, label, cls }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-muted">
                  <Icon className={`h-3.5 w-3.5 ${cls}`} /> {label}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-fg">Capabilities</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {CAPABILITIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/capabilities/${c.slug}`} className="transition hover:text-accent">
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-fg">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-fg">Global hubs</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  <b className="font-semibold text-fg">Austin, TX (US HQ)</b>
                  <br />
                  {CONTACT.usHq}
                </span>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  <b className="font-semibold text-fg">Dhaka delivery center</b>
                  <br />
                  {CONTACT.dhaka}
                </span>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-subtle sm:flex-row">
          <p>© 2026 TalentBridge US-BD Solutions Inc. All rights reserved.</p>
          <p>Made with care in Austin &amp; Dhaka.</p>
        </div>
      </div>
    </footer>
  );
}
