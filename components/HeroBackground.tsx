"use client";

/**
 * HeroBackground — animated diagonal grid backdrop adapted from Uiverse.io by HarryHeywood04.
 * Theme-aware: light #fcfbfe, dark #080511 Midnight Obsidian at 15-20% pattern opacity.
 * Includes organic ambient drift orbs with hardware-accelerated transforms.
 */
export function HeroBackground() {
  return (
    <div
      className="hero-bg absolute inset-0 z-[-10] overflow-hidden"
      aria-hidden="true"
    >
      {/* Organic ambient drift orbs — slow opacity/scale keyframes */}
      <div
        className="absolute -left-20 top-[18%] size-[420px] rounded-full bg-gradient-to-br from-violet-400/20 via-fuchsia-300/15 to-transparent dark:from-violet-600/15 dark:via-fuchsia-500/10 dark:to-transparent blur-[80px] animate-ambient-drift will-change-transform transform-gpu"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 top-[32%] size-[380px] rounded-full bg-gradient-to-br from-purple-300/15 via-violet-300/10 to-transparent dark:from-purple-700/12 dark:via-violet-600/8 dark:to-transparent blur-[70px] animate-ambient-drift-delayed will-change-transform transform-gpu"
        aria-hidden="true"
      />
    </div>
  );
}