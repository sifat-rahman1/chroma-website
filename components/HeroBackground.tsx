"use client";

/**
 * HeroBackground — animated grid/gradient backdrop adapted from Uiverse.io by HarryHeywood04.
 * Sits absolutely behind the hero content with theme-aware colors for light/dark mode.
 * - Dark mode: reduced opacity (15%) — pattern stays sharp, no blur filters
 * - Light mode: default opacity, sharp geometric pattern
 */
export function HeroBackground() {
  return (
    <div
      className="hero-bg absolute inset-0 z-[-10] overflow-hidden"
      aria-hidden="true"
    />
  );
}