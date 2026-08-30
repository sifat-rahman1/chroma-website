"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BRANDS = [
  "AWWWARDS",
  "DRIBBBLE",
  "BEHANCE",
  "TECHCRUNCH",
  "PRODUCT HUNT",
  "FORBES",
  "WIRED",
  "DEZEEN",
];

function Row() {
  return (
    <>
      {BRANDS.map((brand) => (
        <span
          key={brand}
          className="flex shrink-0 items-center gap-10 font-display text-lg font-semibold tracking-wide text-foreground-subtle transition-colors duration-300 hover:text-foreground"
        >
          {brand}
          <span className="text-acid/50">✦</span>
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") setPaused(true);
    };

    const handleFocusIn = () => setPaused(true);
    const handleFocusOut = () => setPaused(false);

    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
      className="relative mt-16 border-t border-line py-6"
      aria-label="Featured in"
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ animationPlayState: paused ? "paused" : "running" } as React.CSSProperties}
    >
      <span className="sr-only">Featured in</span>
      <div className="pointer-events-none absolute inset-x-0 -top-3 z-10 flex justify-center">
        <span className="rounded-full border border-line bg-background px-4 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-subtle">
          Featured In
        </span>
      </div>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10" style={{ animationPlayState: paused ? "paused" : "running" } as React.CSSProperties}>
          <Row />
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10" aria-hidden style={{ animationPlayState: paused ? "paused" : "running" } as React.CSSProperties}>
          <Row />
        </div>
      </div>
    </motion.div>
  );
}