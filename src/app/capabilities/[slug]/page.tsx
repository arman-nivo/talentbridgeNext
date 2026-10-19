import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, ChevronDown } from "lucide-react";
import { CAPABILITIES, getCapability, TESTIMONIALS } from "@/lib/data";
import { BookingButton } from "@/components/booking/booking-provider";
import { CapabilityCard, CtaBanner, TestimonialCard } from "@/components/sections/shared";
import { Carousel } from "@/components/sliders/carousel";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function generateStaticParams() {
  return CAPABILITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/capabilities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};
  return { title: capability.shortTitle, description: capability.summary };
}

// Testimonials most relevant to each pillar.
const RELATED_TESTIMONIAL: Record<string, number> = {
  "talent-recruitment": 0,
  "employee-optimization": 2,
  "retention-analytics": 1,
  "team-collaboration": 2,
  "workforce-planning": 3,
};

export default async function CapabilityPage({ params }: PageProps<"/capabilities/[slug]">) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  const { icon: Icon, tone } = capability;
  const index = CAPABILITIES.findIndex((c) => c.slug === slug);
  const prev = CAPABILITIES[(index - 1 + CAPABILITIES.length) % CAPABILITIES.length];
  const next = CAPABILITIES[(index + 1) % CAPABILITIES.length];
  const others = CAPABILITIES.filter((c) => c.slug !== slug);
  const testimonial = TESTIMONIALS[RELATED_TESTIMONIAL[slug] ?? 0];

  return (
    <>
      <PageHero
        eyebrow={`Pillar ${capability.number}`}
        title={capability.title}
        description={capability.description}
        image={capability.image}
        imageAlt={capability.title}
        breadcrumb={[{ href: "/capabilities", label: "Capabilities" }, { label: capability.shortTitle }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BookingButton className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:scale-[1.02]">
            <CalendarCheck className="h-4 w-4" /> Book a strategy call
          </BookingButton>
          <span className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${tone.border} ${tone.bg} ${tone.text}`}>
            <Icon className="h-4 w-4" /> {capability.tagline}
          </span>
        </div>
      </PageHero>

      {/* Metrics */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {capability.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="glass glass-hover relative overflow-hidden rounded-3xl p-7">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.gradient}`} />
                <p className={`relative font-display text-4xl font-bold ${tone.text}`}>{m.value}</p>
                <p className="relative mt-2 text-sm text-muted">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What's included" title={`Inside ${capability.shortTitle.toLowerCase()}`} />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {capability.features.map((f, i) => {
              const FIcon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 2) * 0.08}>
                  <div className="glass glass-hover group flex h-full gap-5 rounded-3xl p-7">
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${tone.border} ${tone.bg} ${tone.text} transition-transform group-hover:scale-110`}>
                      <FIcon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-fg">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process + gallery */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading align="left" eyebrow="The process" title="How we deliver it" />
            <ol className="relative mt-10 space-y-8 border-l border-line-strong pl-8">
              {capability.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="relative">
                    <span className={`absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full border-4 border-bg font-mono text-xs font-bold text-white ${tone.solid}`}>
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg font-bold text-fg">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <Carousel label={`${capability.shortTitle} gallery`} autoplay delay={4000} showArrows={false}>
              {capability.gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line-strong">
                  <Image src={src} alt={`${capability.shortTitle} photo ${i + 1}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 right-5 font-display text-lg font-semibold text-white">
                    {capability.highlights[i] ?? capability.tagline}
                  </p>
                </div>
              ))}
            </Carousel>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {capability.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-xs font-medium text-fg">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" /> {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Testimonial + FAQ */}
      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <TestimonialCard t={testimonial} />
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow="FAQ" title="Common questions" />
            <div className="mt-8 space-y-3">
              {capability.faqs.map((f) => (
                <details key={f.q} className="group glass rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-fg">
                    {f.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-subtle transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other pillars slider */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="left" eyebrow="Keep exploring" title="Other capabilities" />
          <Reveal className="mt-10">
            <Carousel label="Other capabilities" slideClassName="basis-[88%] sm:basis-1/2 lg:basis-1/3">
              {others.map((c) => (
                <CapabilityCard key={c.slug} capability={c} />
              ))}
            </Carousel>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <Link href={`/capabilities/${prev.slug}`} className="glass glass-hover group flex items-center gap-4 rounded-2xl p-5">
              <ArrowLeft className="h-5 w-5 text-subtle transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-xs text-subtle">Previous pillar</span>
                <span className="font-semibold text-fg">{prev.shortTitle}</span>
              </span>
            </Link>
            <Link href={`/capabilities/${next.slug}`} className="glass glass-hover group flex items-center justify-end gap-4 rounded-2xl p-5 text-right">
              <span>
                <span className="block text-xs text-subtle">Next pillar</span>
                <span className="font-semibold text-fg">{next.shortTitle}</span>
              </span>
              <ArrowRight className="h-5 w-5 text-subtle transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner title={`Ready to put ${capability.shortTitle.toLowerCase()} to work?`} />
    </>
  );
}
