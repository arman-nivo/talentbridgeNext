import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-24">
      <div className="pointer-events-none absolute inset-0 grid-pattern noise-mask" />
      <div className="relative text-center">
        <Compass className="mx-auto h-14 w-14 animate-spin-slow text-accent" />
        <p className="mt-6 font-display text-8xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-fg">This bridge doesn&apos;t lead anywhere</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for has moved or never existed.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
