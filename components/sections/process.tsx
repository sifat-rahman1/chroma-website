"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    index: "01",
    title: "Discovery",
    duration: "Week 1",
    description:
      "We interview 5 users and audit your analytics + flows. You get a prioritized flow map — not a 40-slide deck.",
    tags: ["5 User Interviews", "Analytics Audit", "Flow Map"],
  },
  {
    index: "02",
    title: "Strategy",
    duration: "Weeks 2–3",
    description:
      "Architecture, token naming, and success metrics locked. You approve the roadmap we burn down.",
    tags: ["Information Architecture", "Token Naming", "Roadmap"],
  },
  {
    index: "03",
    title: "Rapid Prototyping",
    duration: "Weeks 4–6",
    description:
      "High-fidelity, clickable build tested live. You watch 8 users fail — we fix it that same week.",
    tags: ["Clickable Build", "8 Live Tests", "Weekly Fix"],
  },
  {
    index: "04",
    title: "System & Handoff",
    duration: "Weeks 7–8",
    description:
      "Tokens, components, Storybook docs. Your team merges on day one — we stay for QA, then exit.",
    tags: ["Token System", "Storybook", "Merge Day One"],
  },
];

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute right-0 top-0 size-96 rounded-full bg-accent/10 blur-[160px]" />
      <div className="container-fluid relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <Badge variant="mono">03 — How We Work</Badge>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
              Brief to merge
              <br />
              <span className="text-gradient">in 8 weeks.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-foreground-muted">
            <span className="font-semibold text-foreground">You see working software every 7 days.</span> No black boxes. No surprise invoices.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 left-5 top-6 w-px origin-top bg-gradient-to-b from-accent via-accent/50 to-acid sm:left-6"
          />

          <div className="space-y-8 sm:space-y-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative pl-16 sm:pl-20"
              >
                <div className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-accent/40 bg-background font-mono text-xs text-accent btn-glow-accent transition-all duration-300 group-hover:border-acid/60 group-hover:text-acid group-hover:btn-glow-acid sm:size-12">
                  {step.index}
                </div>

                <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-card shadow-sm p-6 transition-all duration-200 ease-out hover:border-accent/20 hover:shadow-md hover:shadow-accent/5 focus-within:ring-2 focus-within:ring-purple-500 sm:p-8 will-change-transform transform-gpu">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-acid/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-muted px-3.5 py-1.5 text-xs text-foreground-muted transition-colors duration-200 hover:border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
