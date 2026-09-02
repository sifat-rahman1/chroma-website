"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SERVICES = [
  {
    index: "01",
    title: "UI/UX & Product Design",
    blurb:
      "Shippable UI in 14 days — we map your flows into a token-based Figma system and test with 12 users in 3 days, so engineering stops guessing and starts merging.",
    deliverables: [
      "Flow Mapping",
      "Token System (Figma)",
      "Tested Prototype",
      "Engineer Handoff",
    ],
    stat: "Finora: +140% onboarding in 14 weeks",
  },
  {
    index: "02",
    title: "Brand Strategy",
    blurb:
      "Positioning you can import — naming, token semantics, and identity rules engineered for code, so brand isn’t a PDF your team ignores.",
    deliverables: [
      "Positioning Narrative",
      "Naming Architecture",
      "Identity Tokens",
      "Usage Rules",
    ],
    stat: "Aurea: 87% recall • 200+ retailers",
  },
  {
    index: "03",
    title: "Front-End Engineering",
    blurb:
      "Next.js that scores 100 on Lighthouse — motion, accessibility, and CLS <0.1 baked in, so marketing edits without breaking production.",
    deliverables: [
      "Next.js / React",
      "Motion (Framer)",
      "CLS <0.1 • LCP 1.2s",
      "WCAG AA",
    ],
    stat: "Flux: 2.1× AOV • 1.2s LCP",
  },
  {
    index: "04",
    title: "Design Systems",
    blurb:
      "One library for 4 teams — Storybook + governance so you ship at 10× velocity without drift after we exit.",
    deliverables: [
      "Token Architecture",
      "Storybook Library",
      "Governance Docs",
      "Enablement",
    ],
    stat: "10× velocity — Pulse team",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute left-0 top-1/3 size-96 rounded-full bg-acid/5 blur-[160px]" />
      <div className="container-fluid relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <Badge variant="mono">02 — Capabilities</Badge>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
              Every capability
              <br />
              <span className="text-gradient">tied to an outcome.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-foreground-muted">
            <span className="font-semibold text-foreground">One senior team</span> owns it from token to merge. No handoff where context dies.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-4"
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="01"
          >
            {SERVICES.map((service) => (
              <motion.div
                key={service.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <AccordionItem value={service.index}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-5 sm:gap-8">
                      <span className="font-mono text-xs tracking-[0.2em] text-accent">
                        {service.index}
                      </span>
                      <div className="text-left">
                        <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-6 border-t border-line pt-5 lg:flex-row lg:items-start lg:justify-between">
                      <p className="max-w-md text-sm leading-relaxed text-foreground-muted sm:text-base">
                        {service.blurb}
                      </p>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-line bg-muted px-3.5 py-1.5 text-xs text-foreground-muted transition-colors hover:border-acid/50 hover:text-acid"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-acid/80">
                          → {service.stat}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
