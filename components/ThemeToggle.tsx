"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme toggle switch — adapted from Uiverse.io by satyamchaudharydev ("shy-earwig-18").
 * A single checkbox controls a sliding sun/moon switch. Checking/unchecking adds or
 * removes the `.dark` class on <html> and persists the preference to localStorage.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextState = !isDark;
    setIsDark(nextState);

    if (nextState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // SSR guard: return null until mounted to prevent hydration mismatch.
  if (!mounted) return null;

  return (
    <label
      className={cn("theme-switch", className)}
      aria-label="Toggle Light and Dark Theme"
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        aria-label="Toggle Light and Dark Theme"
      />
      <span className="theme-slider" />
    </label>
  );
}