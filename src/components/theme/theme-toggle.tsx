"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type Theme } from "./theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  };

  return { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`group relative flex h-10 w-[4.25rem] items-center rounded-full border border-line bg-surface-strong p-1 transition-colors hover:border-accent/50 ${className}`}
    >
      <span
        className={`absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 ${
          isDark ? "left-[calc(100%-2.25rem)]" : "left-1"
        }`}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
      <Sun className={`ml-1.5 h-4 w-4 transition-opacity ${isDark ? "text-subtle opacity-100" : "opacity-0"}`} />
      <Moon className={`ml-auto mr-1.5 h-4 w-4 transition-opacity ${isDark ? "opacity-0" : "text-subtle opacity-100"}`} />
    </button>
  );
}
