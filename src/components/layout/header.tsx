"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useBooking } from "@/components/booking/booking-provider";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  // Store the path the menu was opened on; navigating closes it automatically.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "border-b border-line bg-bg/75 shadow-sm backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-line bg-surface p-1 backdrop-blur-md xl:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line-strong bg-surface-strong"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden px-2 text-xs font-semibold uppercase tracking-wider text-muted transition hover:text-fg 2xl:block"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={openBooking}
            className="group relative hidden overflow-hidden rounded-xl p-[1.5px] md:block"
          >
            <span className="absolute inset-0 bg-brand animate-gradient bg-[length:200%_200%]" />
            <span className="relative flex items-center gap-2 whitespace-nowrap rounded-[10px] bg-bg px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-fg transition group-hover:bg-transparent group-hover:text-white">
              <CalendarCheck className="h-4 w-4" />
              Strategy call
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-fg xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl xl:hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-3">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/contact", label: "Contact" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                    (link.href === "/" ? pathname === "/" : isActive(link.href))
                      ? "bg-surface-strong text-fg"
                      : "text-muted hover:bg-surface hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpenOn(null);
                  openBooking();
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white"
              >
                <CalendarCheck className="h-4 w-4" /> Schedule strategy call
              </button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
