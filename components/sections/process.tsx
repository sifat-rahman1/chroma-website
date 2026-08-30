"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    index: "01",
    title: "Discovery",
    duration: "Week 1",
    description:
      "We dig deep into your market, users, and goals. Stakeholder interviews, competitor teardowns, and analytics audits inform everything that follows.",
    tags: ["Stakeholder Interviews", "User Research", "Analytics Audit"],
  },
  {
    index: "02",
    title: "Strategy",
    duration: "Weeks 2–3",
    description:
      "Insights become a concrete plan: information architecture, UX strategy, success metrics, and a prioritized roadmap your team will actually use.",
    tags: ["Information Architecture", "UX Strategy", "Roadmap"],
  },
  {
    index: "03",
    title: "Rapid Prototyping",
    duration: "Weeks 4–6",
    description:
      "High-fidelity, clickable prototypes tested with real users in real time. We iterate fast and validate every decision before a line of code is written.",
    tags: ["Clickable Prototypes", "User Testing", "Fast Iteration"],
  },
  {
    index: "04",
    title: "Design System & Handoff",
    duration: "Weeks 7–8",
    description:
      "A token-based design system, documented components, and clean code handoff. Your team ships confidently — and fast — long after we leave.",
    tags: ["Design Tokens", "Component Library", "Developer Handoff"],
  },
];

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute right-0 top-0 size-96 rounded-full bg-accent/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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
              From brief to
              <br />
              <span className="text-gradient">launch in 8 weeks.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-foreground-muted">
            A battle-tested process that keeps you in the loop at every step —
            no black boxes, no surprises.
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

                <div className="rounded-2xl border border-line bg-card/60 p-6 transition-all duration-500 hover:border-accent/40 hover:bg-card sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-acid/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-muted px-3.5 py-1.5 text-xs text-foreground-muted"
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
