"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export default function ThemeToggle({ compact, className }: ThemeToggleProps) {
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

  if (!mounted) {
    return <div className={cn(compact ? "w-9 h-9" : "w-[140px] h-[38px]", className)} />;
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to night mode"}
      title={isDark ? "Switch to light mode" : "Switch to night mode"}
      className={cn(
        "relative inline-flex items-center shrink-0 cursor-pointer select-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        compact
          ? "w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800"
          : "w-[140px] h-[38px] px-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800",
        className
      )}
    >
      {/* Sliding Knob */}
      <span
        className={cn(
          "absolute top-[3px] left-[3px] w-[30px] h-[30px] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out shadow-sm z-10",
          isDark ? "translate-x-[102px] bg-purple-600 text-white" : "translate-x-0 bg-white text-purple-700"
        )}
      >
        {isDark ? (
          <Moon className="size-4" />
        ) : (
          <Sun className="size-4" />
        )}
      </span>

      {/* Label Text inside the pill container */}
      {!compact && (
        <span
          className={cn(
            "w-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 pointer-events-none z-0",
            isDark ? "pr-7 text-right text-purple-200" : "pl-7 text-left text-purple-900"
          )}
        >
          {isDark ? "Night mode" : "Light mode"}
        </span>
      )}
    </button>
  );
}