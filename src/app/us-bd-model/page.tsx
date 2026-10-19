import type { Metadata } from "next";
import Image from "next/image";
import { ClockArrowUp, FileLock2, GraduationCap, Languages, Scale, ShieldCheck, Sunrise, Sunset } from "lucide-react";
import { IMAGES, TALENT_ROLES } from "@/lib/data";
import { CtaBanner } from "@/components/sections/shared";
import { Carousel } from "@/components/sliders/carousel";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BridgeVisual } from "@/components/visuals/bridge-visual";

export const metadata: Metadata = {
  title: "US-BD Model",
  description: "Why Bangladesh talent plus US management creates a 24-hour, cost-efficient and compliant engineering model.",
};

const ADVANTAGES = [
  {
    icon: GraduationCap,
    title: "Deep technical & STEM depth",
    text: "Graduates from top universities like BUET, DU and NSU, with expertise in AI, full-stack engineering, cloud and data science.",
    image: IMAGES.classroom,
    cls: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  },
  {
    icon: ClockArrowUp,
    title: "24/7 asynchronous synergy",
    text: "The 10 to 11 hour time difference lets US teams hand off specs at end of day and return to completed sprints.",
    image: IMAGES.workLaptop,
    cls: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
  },
  {
    icon: ShieldCheck,
    title: "US compliance & IP protection",
    text: "Contracts under US jurisdiction (Delaware or Texas law), NDAs, SOC 2 readiness and strict security controls protect your IP.",
    image: IMAGES.cyber,
    cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
];

const DAY = [
  { time: "9:00 AM CT", icon: Sunrise, who: "Austin", text: "US team reviews overnight PRs, test results and demo videos from Dhaka." },
  { time: "9:00 - 11:00 AM CT", icon: Languages, who: "Overlap", text: "Joint stand-up, pairing and fast decisions during the shared window." },
  { time: "5:00 PM CT", icon: Sunset, who: "Austin", text: "US product leads post specs, priorities and feedback for the next cycle." },
  { time: "Overnight (CT)", icon: ClockArrowUp, who: "Dhaka", text: "Dhaka engineers build, test and ship. Your roadmap moves while you sleep." },
];

const COMPLIANCE = [
  { icon: Scale, title: "US-law contracts", text: "Master agreements under Delaware or Texas law." },
  { icon: FileLock2, title: "Full IP assignment", text: "All work product is assigned to you from day one." },
  { icon: ShieldCheck, title: "SOC 2 Type II", text: "Audited controls for access, devices and data." },
];

export default function UsBdModelPage() {
  return (
    <>
      <PageHero
        eyebrow="The US-BD model"
        title={
          <>
            Bangladesh talent. <span className="text-gradient">US standards.</span>
          </>
        }
        description="Bangladesh produces over 20,000 top STEM graduates every year. We bridge that talent directly into North American operating standards."
        image={IMAGES.globeNetwork}
        imageAlt="Global network visualisation over the earth"
        breadcrumb={[{ label: "US-BD Model" }]}
      />

      {/* Advantages */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {ADVANTAGES.map(({ icon: Icon, title, text, image, cls }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <article className="glass glass-hover group h-full overflow-hidden rounded-3xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
                  </div>
                  <div className="-mt-8 p-7 pt-0">
                    <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur ${cls}`}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-fg">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* A day in the bridge */}
      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading align="left" eyebrow="A day on the bridge" title="How the 24-hour cycle works" />
            <div className="mt-10 space-y-4">
              {DAY.map(({ time, icon: Icon, who, text }, i) => (
                <Reveal key={time} delay={i * 0.08}>
                  <div className="glass flex gap-4 rounded-2xl p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-fg">
                        {time}
                        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-subtle">{who}</span>
                      </p>
                      <p className="mt-1 text-sm text-muted">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <BridgeVisual />
          </Reveal>
        </div>
      </section>

      {/* Talent roles slider */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Talent you can hire"
            title="Roles we deploy every week"
            description="Swipe through the specialist profiles our Dhaka hub places with US teams."
          />
          <Reveal className="mt-12">
            <Carousel label="Talent roles" slideClassName="basis-[80%] sm:basis-1/2 lg:basis-1/3" autoplay delay={3500}>
              {TALENT_ROLES.map((role) => (
                <div key={role.title} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line-strong">
                  <Image src={role.image} alt={role.title} fill sizes="(min-width: 1024px) 33vw, 80vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${role.tone.border} bg-black/30 text-white`}>
                      Available in &lt; 14 days
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-white">{role.title}</h3>
                    <p className="mt-1 text-sm text-white/75">{role.stack}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* Compliance */}
      <section className="border-t border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Built for US enterprises" title="Compliance you can show your legal team" />
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {COMPLIANCE.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="glass glass-hover h-full rounded-3xl p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-fg">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
