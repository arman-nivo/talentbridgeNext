import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  Lock,
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { CLIENT_LOGOS, STATS, type Capability, type Testimonial } from "@/lib/data";
import { BookingButton } from "@/components/booking/booking-provider";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

/* ------------------------------ Logo marquee ------------------------------ */

export function LogoMarquee() {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {logos.map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= CLIENT_LOGOS.length}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 font-display text-sm font-semibold text-muted"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-[10px] font-bold text-white">
              {name.charAt(0)}
            </span>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Stats band ------------------------------ */

export function StatsBand() {
  const colors = ["text-fg", "text-accent", "text-fg", "text-accent-3"];
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08}>
          <div className="glass glass-hover group relative h-full overflow-hidden rounded-2xl p-6 text-center">
            <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Counter
              value={s.value}
              decimals={s.decimals}
              prefix={s.prefix}
              suffix={s.suffix}
              className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${colors[i]}`}
            />
            <p className="mt-2 text-xs font-medium text-muted sm:text-sm">{s.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------ Capability card ------------------------------ */

export function CapabilityCard({ capability, withImage = false }: { capability: Capability; withImage?: boolean }) {
  const { icon: Icon, tone } = capability;
  return (
    <Link
      href={`/capabilities/${capability.slug}`}
      className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-3xl hover:-translate-y-1"
    >
      {withImage ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={capability.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          <span className="absolute right-4 top-4 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur">
            {capability.number}
          </span>
        </div>
      ) : null}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className={`relative flex flex-1 flex-col p-6 ${withImage ? "-mt-10" : ""}`}>
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${tone.border} ${tone.bg} ${tone.text} backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-lg font-bold leading-snug text-fg">{capability.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{capability.summary}</p>
        <ul className="mt-4 space-y-2 text-sm text-fg/90">
          {capability.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              {h}
            </li>
          ))}
        </ul>
        <span className={`mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold ${tone.text}`}>
          Explore {capability.shortTitle.toLowerCase()}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------ Testimonial card ------------------------------ */

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8">
      <Quote className="absolute -right-2 -top-2 h-24 w-24 text-accent/10" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {t.segment}
          </span>
          <span className="flex text-amber-400" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </span>
        </div>
        <blockquote className="mt-6 text-base leading-relaxed text-fg/90">&ldquo;{t.quote}&rdquo;</blockquote>
      </div>
      <figcaption className="relative mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
            {initials(t.name)}
          </span>
          <div>
            <p className="text-sm font-bold text-fg">{t.name}</p>
            <p className="text-xs text-subtle">
              {t.role}, {t.company}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-xl font-bold text-accent-3">{t.metric.value}</p>
          <p className="max-w-[9rem] text-[11px] leading-tight text-subtle">{t.metric.label}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/* ------------------------------ Dashboard mock ------------------------------ */

export function DashboardMock() {
  const bars = [42, 58, 51, 66, 73, 69, 84, 91];
  return (
    <div className="relative rounded-3xl border border-line-strong bg-surface-solid p-5 shadow-2xl">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono text-xs text-subtle">talentbridge-analytics v2.4</span>
        </div>
        <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">
          Live sync
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-surface-strong p-3">
          <span className="text-[10px] font-semibold uppercase text-subtle">Active engineers · Dhaka</span>
          <p className="mt-1 font-display text-xl font-bold text-fg">48 specialists</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" /> +12% this month
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface-strong p-3">
          <span className="text-[10px] font-semibold uppercase text-subtle">Avg sprint velocity</span>
          <p className="mt-1 font-display text-xl font-bold text-accent">94.8 / 100</p>
          <p className="mt-1 text-[11px] text-subtle">Top 2% benchmark</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-line bg-surface-strong p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted">Throughput · last 8 sprints</span>
          <span className="font-semibold text-accent-3">+117%</span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600/70 to-cyan-400"
              style={{ height: `${h}%`, opacity: 0.55 + i * 0.06 }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-line bg-surface-strong p-3">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="font-medium text-muted">Predictive retention score</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">96% · Low risk</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-line-strong">
          <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
        </div>
      </div>
    </div>
  );
}

export const TRUST_BADGES = [
  { icon: ShieldCheck, label: "SOC 2 Type II compliant", cls: "text-cyan-600 dark:text-cyan-400" },
  { icon: Lock, label: "US data residency", cls: "text-emerald-600 dark:text-emerald-400" },
  { icon: Zap, label: "Jira / Slack integration", cls: "text-amber-600 dark:text-amber-400" },
];

/* ------------------------------ CTA banner ------------------------------ */

export function CtaBanner({
  title = "Ready to scale your high-output global team?",
  text = "Speak with our US-based workforce strategists and receive candidate profiles within 48 hours.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-brand p-10 text-white shadow-2xl shadow-blue-600/20 sm:p-14">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-spin-slow rounded-full border-[40px] border-white/10" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-xl text-base text-white/85">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <BookingButton className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold text-slate-900 shadow-lg transition hover:scale-[1.03]">
              <CalendarCheck className="h-4 w-4" /> Book a strategy call
            </BookingButton>
            <Link
              href="/roi-calculator"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/40 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Estimate savings <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
