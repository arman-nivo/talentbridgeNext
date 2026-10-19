"use client";

import { ArrowDown, CalendarCheck, PiggyBank, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/components/booking/booking-provider";

const TIERS = {
  mid: { label: "Mid-level", us: 110_000, tb: 45_000 },
  senior: { label: "Senior", us: 160_000, tb: 65_000 },
  lead: { label: "Lead / Architect", us: 210_000, tb: 85_000 },
} as const;

type TierKey = keyof typeof TIERS;

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const compact = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 });

function RangeField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  display,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-3">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </label>
        <span className="font-display text-xl font-bold text-accent">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-subtle">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function RoiCalculator({ detailed = false }: { detailed?: boolean }) {
  const { openBooking } = useBooking();
  const [size, setSize] = useState(8);
  const [tier, setTier] = useState<TierKey>("senior");
  const [months, setMonths] = useState(24);

  const rates = TIERS[tier];
  const usAnnual = size * rates.us;
  const tbAnnual = size * rates.tb;
  const savingsAnnual = usAnnual - tbAnnual;
  const pct = Math.round((savingsAnnual / usAnnual) * 100);
  const contractSavings = Math.round((savingsAnnual * months) / 12);
  const extraEngineers = Math.floor(savingsAnnual / rates.tb);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Inputs */}
      <div className="glass rounded-3xl p-6 sm:p-8 lg:col-span-3">
        <div className="space-y-8">
          <RangeField
            id="team-size"
            label="Engineers / talent roles needed"
            value={size}
            min={2}
            max={50}
            display={`${size} professionals`}
            onChange={setSize}
          />

          <fieldset>
            <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Average talent tier</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(Object.keys(TIERS) as TierKey[]).map((key) => {
                const active = key === tier;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTier(key)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-accent bg-accent/10 shadow-[0_0_0_4px_var(--glow)]"
                        : "border-line bg-surface-solid hover:border-accent/40"
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${active ? "text-accent" : "text-fg"}`}>{TIERS[key].label}</span>
                    <span className="mt-0.5 block text-xs text-subtle">{compact(TIERS[key].tb)}/yr per engineer</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {detailed ? (
            <RangeField
              id="contract-months"
              label="Engagement length"
              value={months}
              min={6}
              max={48}
              step={6}
              display={`${months} months`}
              onChange={setMonths}
            />
          ) : null}

          {/* Comparison bars */}
          <div className="space-y-4 border-t border-line pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Annual cost comparison</p>
            {[
              { label: "US in-house team", value: usAnnual, cls: "bg-slate-400 dark:bg-slate-500", text: "text-muted" },
              { label: "TalentBridge team", value: tbAnnual, cls: "bg-brand", text: "text-accent" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-muted">{bar.label}</span>
                  <span className={`font-semibold tabular-nums ${bar.text}`}>{usd(bar.value)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-surface-strong">
                  <div
                    className={`h-full rounded-full ${bar.cls} transition-[width] duration-500 ease-out`}
                    style={{ width: `${(bar.value / usAnnual) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="relative overflow-hidden rounded-3xl bg-brand p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80">
            <PiggyBank className="h-4 w-4" /> Estimated annual savings
          </span>
          <p className="mt-3 font-display text-4xl font-bold tabular-nums sm:text-5xl" aria-live="polite">
            {usd(savingsAnnual)}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white/90">
            <ArrowDown className="h-4 w-4" /> {pct}% lower than US in-house cost
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-5">
            <Users className="h-5 w-5 text-subtle" />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-subtle">Est. US cost</p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums text-muted line-through decoration-rose-500/60">{compact(usAnnual)}</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <Users className="h-5 w-5 text-accent" />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-subtle">TalentBridge cost</p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums text-fg">{compact(tbAnnual)}</p>
          </div>
        </div>

        {detailed ? (
          <div className="glass rounded-2xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Savings over {months} months</p>
            <p className="mt-1 font-display text-2xl font-bold tabular-nums text-accent-3">{usd(contractSavings)}</p>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted">
              <UserPlus className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Annual savings could fund about <b className="text-fg">{extraEngineers}</b> additional {TIERS[tier].label.toLowerCase()} engineers.
            </p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={openBooking}
          className="flex items-center justify-center gap-2 rounded-2xl border border-line-strong bg-surface-solid px-6 py-4 text-sm font-bold text-fg transition hover:border-accent/60 hover:text-accent"
        >
          <CalendarCheck className="h-4 w-4" /> Request a tailored rate card
        </button>
        <p className="text-center text-[11px] leading-relaxed text-subtle">
          Estimates use average US market salaries and fully-loaded TalentBridge rates, including benefits, equipment and account management.
        </p>
      </div>
    </div>
  );
}
