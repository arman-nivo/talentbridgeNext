import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  image: string;
  imageAlt: string;
  breadcrumb: { href?: string; label: string }[];
  children?: ReactNode;
};

/** Shared top banner for inner pages: breadcrumb, headline and a framed photo. */
export function PageHero({ eyebrow, title, description, image, imageAlt, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-pattern noise-mask" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[380px] w-[380px] rounded-full bg-indigo-500/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-subtle">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              {breadcrumb.map((crumb) => (
                <span key={crumb.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-muted">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
            {children ? <div className="mt-8">{children}</div> : null}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-brand opacity-30 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line-strong">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
