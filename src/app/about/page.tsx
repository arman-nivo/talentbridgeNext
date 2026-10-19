import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Eye, HeartHandshake, Lightbulb, MapPin, ShieldCheck, Sprout } from "lucide-react";
import { CONTACT, IMAGES } from "@/lib/data";
import { CtaBanner, StatsBand } from "@/components/sections/shared";
import { Carousel } from "@/components/sliders/carousel";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About Us",
  description: "TalentBridge US-BD bridges US innovation speed with Bangladesh's elite tech talent from hubs in Austin and Dhaka.",
};

const VALUES = [
  { icon: HeartHandshake, title: "People first", text: "Engineers who feel valued do their best work and stay. Retention is a design goal, not an afterthought." },
  { icon: Eye, title: "Radical transparency", text: "Clients see the same delivery, pipeline and engagement data we do, in real time." },
  { icon: ShieldCheck, title: "Enterprise trust", text: "Security, compliance and IP protection meet the standards of US enterprises." },
  { icon: Lightbulb, title: "Data over guesswork", text: "Hiring, optimisation and retention decisions are backed by evidence, not hunches." },
];

const MILESTONES = [
  { year: "2019", title: "Founded in Austin", text: "Started with a single pilot team of five engineers for an Austin SaaS startup." },
  { year: "2021", title: "Dhaka delivery center", text: "Opened a dedicated engineering hub in Gulshan with 24/7 power and security." },
  { year: "2023", title: "Analytics platform launch", text: "Released the client portal with sprint analytics and predictive retention models." },
  { year: "2025", title: "850+ engineers deployed", text: "Serving FinTech, HealthTech and SaaS leaders across North America." },
];

const CULTURE = [
  { src: IMAGES.teamCulture, caption: "Team offsites and community events" },
  { src: IMAGES.brainstorm, caption: "Weekly knowledge-sharing guilds" },
  { src: IMAGES.openOffice, caption: "Our Dhaka engineering floor" },
  { src: IMAGES.lounge, caption: "Collaboration spaces built for focus" },
  { src: IMAGES.handsTeam, caption: "One team across two continents" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            We build <span className="text-gradient">bridges</span>, not just teams
          </>
        }
        description="TalentBridge US-BD connects the speed of US innovation with the depth of Bangladesh's engineering talent, with people, process and data working together."
        image={IMAGES.officeInterior}
        imageAlt="Modern office interior"
        breadcrumb={[{ label: "About" }]}
      />

      {/* Mission */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="glass relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10">
              <Compass className="h-10 w-10 text-accent" />
              <h2 className="mt-5 font-display text-2xl font-bold text-fg">Our mission</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Give every fast-growing US company access to world-class engineering talent, and give every talented engineer in Bangladesh a
                career on the global stage.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10">
              <Sprout className="h-10 w-10 text-accent-3" />
              <h2 className="mt-5 font-display text-2xl font-bold text-fg">Our vision</h2>
              <p className="mt-3 leading-relaxed text-muted">
                A world where your birthplace no longer limits what you can build, and where distributed teams outperform co-located ones.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsBand />
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What we believe" title="Our values" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="glass glass-hover h-full rounded-3xl p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-blue-600/20">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-fg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our journey" title="From one pilot team to 850+ engineers" />
          <div className="relative mt-16 grid gap-6 md:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-[1.15rem] hidden h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 md:block" />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.1} className="relative">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-bg bg-brand">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="mt-5 font-display text-3xl font-bold text-gradient">{m.year}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-fg">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture slider */}
      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="left" eyebrow="Life at TalentBridge" title="Culture that keeps great people" />
          <Reveal className="mt-12">
            <Carousel label="Culture gallery" slideClassName="basis-[85%] md:basis-1/2 lg:basis-[40%]" autoplay delay={3800}>
              {CULTURE.map((c) => (
                <figure key={c.src} className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line-strong">
                  <Image src={c.src} alt={c.caption} fill sizes="(min-width: 1024px) 40vw, 85vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-5 left-5 right-5 font-display text-lg font-semibold text-white">{c.caption}</figcaption>
                </figure>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* Hubs */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Global hubs" title="Two cities, one team" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              { city: "Austin, Texas", tag: "US headquarters", address: CONTACT.usHq, image: IMAGES.skyline, text: "Leadership, client success, account management and technical program management." },
              { city: "Dhaka, Bangladesh", tag: "Engineering delivery center", address: CONTACT.dhaka, image: IMAGES.coworking, text: "Engineering, QA, data science, people partners and our talent acquisition team." },
            ].map((hub, i) => (
              <Reveal key={hub.city} delay={i * 0.08}>
                <article className="glass glass-hover group h-full overflow-hidden rounded-[2rem]">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={hub.image} alt={`${hub.city} office`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{hub.tag}</span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl font-bold text-fg">{hub.city}</h3>
                    <p className="mt-2 text-sm text-muted">{hub.text}</p>
                    <p className="mt-4 flex items-start gap-2 text-sm text-subtle">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {hub.address}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
