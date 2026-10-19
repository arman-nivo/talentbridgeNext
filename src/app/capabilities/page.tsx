import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { CAPABILITIES, IMAGES } from "@/lib/data";
import { BookingButton } from "@/components/booking/booking-provider";
import { CapabilityCard, CtaBanner, DashboardMock, TRUST_BADGES } from "@/components/sections/shared";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Five pillars of cross-border workforce intelligence: recruitment, optimisation, retention, collaboration and predictive planning.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Workforce intelligence, <span className="text-gradient">end to end</span>
          </>
        }
        description="Five integrated pillars that take you from first hire to a high-performing, long-tenured cross-border team."
        image={IMAGES.groupWorkshop}
        imageAlt="Team workshop with sticky notes"
        breadcrumb={[{ label: "Capabilities" }]}
      >
        <BookingButton className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:scale-[1.02]">
          <CalendarCheck className="h-4 w-4" /> Talk to a strategist
        </BookingButton>
      </PageHero>

      {/* Pillar cards */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.08}>
                <CapabilityCard capability={c} withImage />
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-brand p-8 text-white">
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 animate-spin-slow rounded-full border-[32px] border-white/10" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Not sure where to start?</p>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-snug">Get a free workforce audit for your team</h3>
                  <p className="mt-3 text-sm text-white/85">We review hiring velocity, team structure and retention risk, then recommend the right mix of pillars.</p>
                </div>
                <BookingButton className="relative mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-900 transition hover:scale-[1.02]">
                  Book my audit <ArrowRight className="h-4 w-4" />
                </BookingButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Alternating deep-dive rows */}
      <section className="border-t border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Deep dive" title="How each pillar works for you" />
          <div className="mt-16 space-y-20">
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              const flip = i % 2 === 1;
              return (
                <div key={c.slug} className="grid items-center gap-10 lg:grid-cols-2">
                  <Reveal className={flip ? "lg:order-2" : ""}>
                    <div className="group relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-line-strong">
                      <Image src={c.image} alt={c.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
                      <div className="absolute bottom-5 left-5 flex gap-2">
                        {c.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="rounded-2xl border border-white/20 bg-black/40 px-4 py-2.5 text-white backdrop-blur-md">
                            <p className="font-display text-lg font-bold">{m.value}</p>
                            <p className="text-[11px] text-white/75">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${c.tone.border} ${c.tone.bg} ${c.tone.text}`}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-sm text-subtle">Pillar {c.number}</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold text-fg sm:text-3xl">{c.title}</h3>
                    <p className="mt-2 font-medium text-accent">{c.tagline}</p>
                    <p className="mt-4 leading-relaxed text-muted">{c.description}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {c.features.slice(0, 4).map((f) => {
                        const FIcon = f.icon;
                        return (
                          <div key={f.title} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3.5">
                            <FIcon className={`mt-0.5 h-5 w-5 shrink-0 ${c.tone.text}`} />
                            <span className="text-sm font-medium text-fg">{f.title}</span>
                          </div>
                        );
                      })}
                    </div>
                    <Link
                      href={`/capabilities/${c.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition hover:border-accent/60 hover:text-accent"
                    >
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Included with every engagement"
              title="The TalentBridge client portal"
              description="Every pillar reports into one secure console, so leadership sees hiring, delivery and retention in a single view."
            />
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              {TRUST_BADGES.map(({ icon: BIcon, label, cls }) => (
                <span key={label} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-medium text-fg">
                  <BIcon className={`h-4 w-4 ${cls}`} /> {label}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <DashboardMock />
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
