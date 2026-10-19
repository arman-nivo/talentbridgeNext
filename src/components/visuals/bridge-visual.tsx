"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

/* A ticking clock shared by every subscriber, updated every 30 seconds. */
let now = 0;
const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 30_000);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) window.clearInterval(timer);
  };
}

function getSnapshot() {
  // Cache the value so repeated reads within a render return the same number.
  if (!now) now = Date.now();
  return now;
}
// On the server we render a placeholder, then the real time appears on the client.
const getServerSnapshot = () => 0;

function cityTime(ts: number, timeZone: string) {
  if (!ts) return { label: "--:--", hour: 12 };
  const d = new Date(ts);
  const label = d.toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit" });
  const hour = Number(d.toLocaleString("en-US", { timeZone, hour: "numeric", hour12: false })) % 24;
  return { label, hour };
}

function statusFor(hour: number) {
  if (hour >= 9 && hour < 18) return { text: "Building", tone: "text-emerald-500", day: true };
  if (hour >= 6 && hour < 9) return { text: "Starting up", tone: "text-amber-500", day: true };
  return { text: "Offline · hand-off sent", tone: "text-subtle", day: false };
}

/** Austin <-> Dhaka bridge with live local times and an animated data arc. */
export function BridgeVisual() {
  const ts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const austin = cityTime(ts, "America/Chicago");
  const dhaka = cityTime(ts, "Asia/Dhaka");

  const cities = [
    { name: "Austin, TX", role: "Product & leadership", flag: "US", ...austin, status: statusFor(austin.hour) },
    { name: "Dhaka, BD", role: "Engineering hub", flag: "BD", ...dhaka, status: statusFor(dhaka.hour) },
  ];

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Follow-the-sun delivery</span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
          </span>
        </div>

        <svg viewBox="0 0 400 140" className="mt-4 h-auto w-full" aria-hidden="true">
          <defs>
            <linearGradient id="arc" x1="0" x2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <path d="M40 110 Q200 -20 360 110" fill="none" stroke="var(--line-strong)" strokeWidth="2" />
          <path
            d="M40 110 Q200 -20 360 110"
            fill="none"
            stroke="url(#arc)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 14"
            className="animate-dash"
          />
          <circle r="5" fill="#fff">
            <animateMotion dur="4s" repeatCount="indefinite" path="M40 110 Q200 -20 360 110" />
          </circle>
          <circle r="4" fill="#34d399" opacity="0.9">
            <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M360 110 Q200 -20 40 110" />
          </circle>
          {[40, 360].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="110" r="16" fill={i === 0 ? "#22d3ee" : "#34d399"} opacity="0.18">
                <animate attributeName="r" values="12;22;12" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy="110" r="7" fill={i === 0 ? "#22d3ee" : "#34d399"} />
            </g>
          ))}
          <text x="200" y="58" textAnchor="middle" fontSize="11" fill="var(--subtle)" fontFamily="monospace">
            +11 hrs · 24h cycle
          </text>
        </svg>

        <div className="mt-2 grid grid-cols-2 gap-3">
          {cities.map((c) => (
            <div key={c.name} className="rounded-2xl border border-line bg-surface-solid/70 p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-surface-strong px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted">{c.flag}</span>
                {c.status.day ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-400" />}
              </div>
              <p className="mt-3 font-display text-2xl font-bold tabular-nums text-fg" suppressHydrationWarning>
                {c.label}
              </p>
              <p className="text-sm font-semibold text-fg">{c.name}</p>
              <p className="text-xs text-subtle">{c.role}</p>
              <p className={`mt-2 text-xs font-semibold ${c.status.tone}`}>● {c.status.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
