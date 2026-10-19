import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Target, Wrench } from "lucide-react";
import { CASE_STUDIES, IMAGES, TESTIMONIALS } from "@/lib/data";
import { CtaBanner, LogoMarquee, StatsBand, TestimonialCard } from "@/components/sections/shared";
import { Carousel } from "@/components/sliders/carousel";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How US FinTech, HealthTech and SaaS companies scale faster with TalentBridge cross-border teams.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title={
          <>
            Results from <span className="text-gradient">US engineering leaders</span>
          </>
        }
        description="Outcomes from founders, CTOs and VPs of Engineering who scaled with the TalentBridge model."
        image={IMAGES.presentation}
        imageAlt="Team presenting results in a meeting room"
        breadcrumb={[{ label: "Case Studies" }]}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsBand />
          <div className="mt-12">
            <LogoMarquee />
          </div>
        </div>
      </section>

      {/* Case study cards */}
      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Client stories" title="Challenge, solution, results" />
          <div className="mt-14 space-y-8">
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={cs.slug}>
                <article id={cs.slug} className="glass grid scroll-mt-28 overflow-hidden rounded-[2rem] lg:grid-cols-5">
                  <div className={`relative min-h-64 lg:col-span-2 ${i % 2 ? "lg:order-2" : ""}`}>
                    <Image src={cs.image} alt={`${cs.client} project`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{cs.industry}</span>
                      <h3 className="mt-3 font-display text-2xl font-bold">{cs.client}</h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-white/80">
                        <MapPin className="h-3.5 w-3.5" /> {cs.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-7 sm:p-9 lg:col-span-3">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-500">
                          <Target className="h-4 w-4" /> Challenge
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                          <Wrench className="h-4 w-4" /> Solution
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{cs.solution}</p>
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-6">
                      {cs.results.map((r) => (
                        <div key={r.label}>
                          <p className="font-display text-2xl font-bold text-accent-3">{r.value}</p>
                          <p className="mt-1 text-xs text-subtle">{r.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-line bg-surface-strong px-3 py-1 text-xs font-medium text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials slider */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="left" eyebrow="In their words" title="What our clients say" />
          <Reveal className="mt-12">
            <Carousel label="Client testimonials" slideClassName="basis-full md:basis-1/2" autoplay delay={6000}>
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      <CtaBanner title="Your team could be our next success story" />
    </>
  );
}
