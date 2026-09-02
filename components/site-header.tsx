"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div
        className={cn(
          "container-fluid flex items-center justify-between gap-4 transition-all duration-300",
          scrolled
            ? "mt-3 h-14 rounded-full border border-black/5 dark:border-white/10 bg-background/70 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl glass-surface"
            : "mt-0 h-20 border-b border-transparent"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-foreground-muted transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:text-accent"
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <a href="#contact">
              Get Fixed-Price Plan
              <ArrowUpRight />
            </a>
          </Button>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open navigation menu"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-card text-foreground transition-colors duration-200 ease-out hover:border-acid/50 hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent className="flex flex-col border-line bg-background/95 backdrop-blur-xl">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="mt-12 flex flex-col gap-1">
                  <span className="px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-subtle">
                    Menu
                  </span>
                  {NAV_LINKS.map((link, i) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 text-2xl font-semibold text-foreground transition-colors hover:bg-white/5 hover:text-acid"
                    >
                      <span>0{i + 1}</span>
                      <span className="font-display tracking-tight">
                        {link.label}
                      </span>
                      <ArrowUpRight className="size-5 text-foreground-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" />
                    </a>
                  ))}
                </div>

                <div className="mt-auto space-y-4 border-t border-line pt-6">
                  <ThemeToggle />
                  <Button asChild className="w-full" size="lg">
                    <a href="#contact" onClick={() => setOpen(false)}>
                      Get Fixed-Price Plan
                      <ArrowUpRight />
                    </a>
                  </Button>
                  <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-subtle">
                    New York • Remote
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}