import Link from "next/link";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="TalentBridge US-BD home">
      <span
        className={`relative flex items-center justify-center rounded-xl bg-brand font-display font-bold text-white shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105 group-hover:-rotate-3 ${
          small ? "h-8 w-8 text-sm" : "h-10 w-10 text-lg"
        }`}
      >
        TB
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-bg bg-emerald-400" />
      </span>
      <span>
        <span className="flex items-center gap-1.5 font-display text-lg font-bold leading-none tracking-tight text-fg">
          TalentBridge
          <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
            US-BD
          </span>
        </span>
        {small ? null : (
          <span className="mt-1 hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-subtle sm:block">
            Global Workforce Intelligence
          </span>
        )}
      </span>
    </Link>
  );
}
