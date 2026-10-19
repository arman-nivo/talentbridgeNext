import Link from "next/link";
import { ArrowRight, CalendarCheck, ClipboardList, Handshake, Rocket, SearchCheck, Star } from "lucide-react";
import { CAPABILITIES, IMAGES, TESTIMONIALS } from "@/lib/data";
import { BookingButton } from "@/components/booking/booking-provider";
import { RoiCalculator } from "@/components/calculator/roi-calculator";
import { Carousel } from "@/components/sliders/carousel";
import { HeroSlider, type HeroSlide } from "@/components/sliders/hero-slider";
import { Reveal } from "@/components/ui/reveal";
import { RotatingWords } from "@/components/ui/rotating-words";
import { SectionHeading } from "@/components/ui/section-heading";
import { BridgeVisual } from "@/components/visuals/bridge-visual";
import {
  CapabilityCard,
  CtaBanner,
  DashboardMock,
  LogoMarquee,
  StatsBand,
  TestimonialCard,
  TRUST_BADGES,
} from "@/components/sections/shared";

const HERO_SLIDES: HeroSlide[] = [
  { image: IMAGES.teamLaptops, alt: "Engineering team collaborating on laptops", eyebrow: "Talent recruitment", title: "Top 1% engineers, vetted and ready in under 14 days" },
  { image: IMAGES.analyticsDash, alt: "Analytics dashboard on a laptop", eyebrow: "Employee optimization", title: "Real-time sprint and KPI insight across both hubs" },
  { image: IMAGES.diverseTeam, alt: "Diverse team smiling around a laptop", eyebrow: "Retention analytics", title: "Predictive models that keep your best people engaged" },
  { image: IMAGES.videoCall, alt: "Video call between distributed teammates", eyebrow: "Team collaboration", title: "One team across Austin and Dhaka, shipping around the clock" },
];

const STEPS = [
  { icon: ClipboardList, title: "Discovery", text: "We map your roles, stack, culture and growth goals in a 30-minute strategy call." },
  { icon: SearchCheck, title: "Shortlist in 48h", text: "Receive pre-vetted profiles with code samples, interview notes and video intros." },
  { icon: Handshake, title: "You choose", text: "Interview finalists and pick your team. We handle contracts, payroll and equipment." },
  { icon: Rocket, title: "Deploy & optimise", text: "Engineers onboard in days, with analytics and retention support from day one." },
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-pattern noise-mask" />
        <div className="pointer-events-none absolute left-1/4 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[110px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-accent shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Austin, TX · Silicon Valley · Dhaka talent bridge
            </div>

            <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-[4.2rem]">
              Scale your US team with{" "}
              <span className="block">
                <RotatingWords words={["elite engineers", "AI specialists", "data teams", "cloud experts", "product designers"]} />
              </span>
              <span className="text-muted"> from Bangladesh.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We connect fast-scaling US companies with the top 1% of tech talent in Bangladesh, backed by smart onboarding,
              data-driven optimisation and predictive retention analytics.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/capabilities"
                className="group flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:scale-[1.02] hover:shadow-blue-600/40"
              >
                Explore workforce solutions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <BookingButton className="glass flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-fg transition hover:border-accent/50">
                <CalendarCheck className="h-4 w-4 text-accent" /> Book consultation
              </BookingButton>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["MV", "AT", "PR", "JE"].map((i, n) => (
                  <span
                    key={i}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg text-xs font-bold text-white ${
                      ["bg-cyan-500", "bg-blue-600", "bg-indigo-500", "bg-emerald-500"][n]
                    }`}
                  >
                    {i}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <span className="ml-1 font-semibold text-fg">4.9/5</span>
                </div>
                <p className="text-subtle">Rated by 120+ US engineering leaders</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <HeroSlider slides={HERO_SLIDES} />
          </Reveal>
        </div>

        <div className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsBand />
          <p className="mt-14 text-center text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
            Trusted by high-growth teams across North America
          </p>
          <div className="mt-6">
            <LogoMarquee />
          </div>
        </div>
      </section>

      {/* ------------------------------ CAPABILITIES SLIDER ------------------------------ */}
      <section className="relative border-t border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="End-to-end workforce intelligence"
              title={
                <>
                  5 core pillars of <span className="text-gradient">modern team optimisation</span>
                </>
              }
              description="From talent acquisition to predictive attrition prevention, we combine human leadership with SaaS workforce modules."
            />
            <Link href="/capabilities" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
              View all capabilities <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <Reveal className="mt-12">
            <Carousel label="Capabilities" slideClassName="basis-[88%] sm:basis-1/2 lg:basis-1/3" autoplay delay={4500}>
              {CAPABILITIES.map((c) => (
                <CapabilityCard key={c.slug} capability={c} withImage />
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ DASHBOARD SPOTLIGHT ------------------------------ */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-indigo-500/15 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              eyebrow="SaaS feature spotlight"
              title="One console for performance, pipeline and retention"
              description="Our client portal gives US engineering leads and HR executives real-time oversight. Track sprint velocity, candidate pipeline health and employee sentiment in one place."
            />
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              {TRUST_BADGES.map(({ icon: Icon, label, cls }) => (
                <span key={label} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-medium text-fg">
                  <Icon className={`h-4 w-4 ${cls}`} /> {label}
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/capabilities/employee-optimization"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                See how optimisation works <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-indigo-500/20 blur-2xl" />
            <div className="relative lg:rotate-1 lg:transition-transform lg:duration-500 lg:hover:rotate-0">
              <DashboardMock />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ HOW IT WORKS ------------------------------ */}
      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How it works" title="From first call to shipping code in 14 days" />
          <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block" />
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1} className="relative">
                <div className="glass glass-hover h-full rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-blue-600/25">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="font-display text-5xl font-bold text-line-strong">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-fg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ BRIDGE ------------------------------ */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <BridgeVisual />
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="The US-BD model"
              title={
                <>
                  Your roadmap moves <span className="text-gradient">while you sleep</span>
                </>
              }
              description="The 11-hour time difference turns into a superpower. US teams hand off specs at end of day and return to completed sprints and deployment-ready tests."
            />
            <Reveal delay={0.1} className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "20k+", l: "STEM grads per year" },
                { v: "3 hrs", l: "Daily overlap" },
                { v: "US law", l: "Delaware / Texas contracts" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-line bg-surface p-4">
                  <p className="font-display text-xl font-bold text-fg">{s.v}</p>
                  <p className="mt-1 text-xs text-subtle">{s.l}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/us-bd-model" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Explore the cross-border advantage <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------ ROI ------------------------------ */}
      <section className="relative overflow-hidden border-t border-line bg-bg-soft/60 py-24">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Interactive executive tool"
              title="Estimate your US-BD talent ROI"
              description="Drag the slider to see how scaling software, data or operations roles through our Austin-Dhaka pipeline impacts your bottom line."
            />
            <Link href="/roi-calculator" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
              Open full calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Reveal className="mt-12">
            <RoiCalculator />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ TESTIMONIALS SLIDER ------------------------------ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Client proven results"
              title="Trusted by US engineering leaders"
              description="How founders and CTOs scale faster with TalentBridge workforce optimisation."
            />
            <Link href="/case-studies" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
              Read case studies <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Reveal className="mt-12">
            <Carousel label="Client testimonials" slideClassName="basis-full md:basis-1/2" autoplay delay={6500}>
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
