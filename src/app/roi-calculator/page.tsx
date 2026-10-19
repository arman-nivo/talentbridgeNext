import type { Metadata } from "next";
import { BadgeDollarSign, Briefcase, HeartPulse, Laptop, ShieldCheck, UserCog } from "lucide-react";
import { IMAGES } from "@/lib/data";
import { RoiCalculator } from "@/components/calculator/roi-calculator";
import { CtaBanner } from "@/components/sections/shared";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Estimate how much you can save by scaling your engineering team through the TalentBridge Austin-Dhaka pipeline.",
};

const INCLUDED = [
  { icon: HeartPulse, title: "Full benefits package", text: "Competitive Dhaka benefits, health cover and paid leave are built into the rate." },
  { icon: UserCog, title: "Dedicated account team", text: "A US account manager and technical program manager for every engagement." },
  { icon: BadgeDollarSign, title: "Zero recruiting fees", text: "No upfront placement fees. You only pay once engineers start working." },
  { icon: Laptop, title: "Equipment & workspace", text: "Enterprise laptops, secure office space and redundant power and internet." },
  { icon: ShieldCheck, title: "Compliance & security", text: "SOC 2 controls, NDAs and US-law contracts with full IP assignment." },
  { icon: Briefcase, title: "Payroll & HR", text: "Local payroll, taxes, HR administration and performance reviews handled for you." },
];

export default function RoiPage() {
  return (
    <>
      <PageHero
        eyebrow="ROI calculator"
        title={
          <>
            See your savings <span className="text-gradient">before you hire</span>
          </>
        }
        description="Model team size, seniority and engagement length to estimate what a TalentBridge team costs compared with hiring in the US."
        image={IMAGES.chartsPlanning}
        imageAlt="Financial charts and planning documents"
        breadcrumb={[{ label: "ROI Calculator" }]}
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <RoiCalculator detailed />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-bg-soft/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Fully-loaded pricing"
            title="Everything included in the rate"
            description="No surprise costs. Every TalentBridge rate covers the full cost of employing and supporting your engineers."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.08}>
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

      <CtaBanner title="Want an exact proposal for your team?" text="Share your roles and timeline, and we'll send a tailored rate card within one business day." />
    </>
  );
}
