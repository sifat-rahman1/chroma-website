"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/sections/marquee";
import { cn } from "@/lib/utils";

const lineVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.1 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function FloatingCard({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("absolute hidden lg:block", className)}
    >
      <div className="animate-float rounded-2xl border border-line bg-card p-4 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {children}
      </div>
    </motion.div>
  );
}

function Counter({ value: endValue, suffix = "", className, ...props }: { value: number; suffix?: string; className?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1800;
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * endValue));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <span ref={ref} className={cn("font-display font-bold", className)} {...props}>
      {value.toLocaleString()}{suffix}
    </span>
  );
}

function ShimmerText({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-gradient-shimmer animate-shimmer inline-block", className)} {...props}>
      {children}
    </span>
  );
}

function LineReveal({ children, index, className, ...props }: { children: React.ReactNode; index: number; className?: string }) {
  return (
    <motion.span
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className={cn("line-clamp-reveal inline-block", className)}
      {...props}
    >
      {children}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-grid-lines absolute inset-0 gpu-accelerated" aria-hidden="true" />

      <div className="absolute -left-40 -top-40 size-[560px] rounded-full bg-gradient-to-br from-amber-100/40 via-purple-100/30 to-transparent dark:from-purple-900/20 dark:via-violet-950/10 dark:to-transparent blur-[120px] gpu-accelerated" aria-hidden="true" />

      <div className="absolute -right-1/4 top-1/3 size-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--acid)_0%,transparent_70%)] opacity-15 hero-orb blur-[140px] animate-orb-pulse-2 animate-orb-drift-2 gpu-accelerated" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent)_0%,transparent_70%)] opacity-10 hero-orb blur-[180px] animate-orb-pulse-1 gpu-accelerated" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col px-5 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-white/80 border border-purple-100 text-purple-950 shadow-sm backdrop-blur-md dark:bg-purple-950/60 dark:border-purple-800/60 dark:text-purple-200 dark:shadow-inner mb-8"
          >
            Intent-Driven Design Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.2 }}
            className="font-display text-[clamp(2.9rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-foreground"
          >
            <LineReveal index={0} className="block">
              We Craft{" "}
            </LineReveal>
            <LineReveal index={1} className="block">
              <ShimmerText>Digital Experiences</ShimmerText>{" "}
            </LineReveal>
            <LineReveal index={2} className="block">
              That{" "}
            </LineReveal>
            <LineReveal index={3} className="block">
              <span className="relative inline-block">
                Drive Growth.
                <motion.span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[0.18em] w-full rounded-full bg-acid/60 blur-[2px]"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </LineReveal>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg"
          >
            Full-service UI/UX design, brand identity, and front-end
            engineering studio. We turn ambitious ideas into products people
            love — and revenue graphs that climb.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <a href="#contact">
                Book a Strategy Call
                <ArrowUpRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#work">
                Explore Works
                <ArrowDown />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-[0.2em] text-foreground-subtle"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-acid" />
              <Counter value={250} suffix="+ Projects Shipped" className="text-foreground" />
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-foreground/25 sm:block" />
            <span>12 years of experience</span>
            <span className="hidden h-1 w-1 rounded-full bg-foreground/25 sm:block" />
            <span>4 Continents</span>
          </motion.div>
        </div>

        <FloatingCard className="right-[4%] top-[26%]" delay={0.9}>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent/20 text-accent">
              <TrendingUp className="size-5" />
            </span>
            <div>
              <p className="font-display text-xl font-bold text-foreground">
                <Counter value={140} suffix="%" className="text-foreground" />
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground-subtle">
                Avg. Conversion Lift
              </p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="left-[4%] top-[48%]" delay={1.1}>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-acid/15 text-acid">
              <Award className="size-5" />
            </span>
            <div>
              <p className="font-display text-xl font-bold text-foreground">
                <Counter value={35} suffix="+" className="text-foreground" />
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground-subtle">
                Design Awards
              </p>
            </div>
          </div>
        </FloatingCard>
      </div>

      <Marquee />
    </section>
  );
}