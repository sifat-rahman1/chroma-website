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
      "Interfaces that feel inevitable. We research, prototype, and design products users intuitively understand — and love to return to.",
    deliverables: [
      "UX Research",
      "Wireframes",
      "High-Fidelity UI",
      "Interactive Prototypes",
      "Usability Testing",
    ],
    stat: "92% user satisfaction",
  },
  {
    index: "02",
    title: "Brand Strategy",
    blurb:
      "Positioning, personality, and identity. We build brands with a point of view that cut through the noise and stay memorable.",
    deliverables: [
      "Brand Audit",
      "Positioning",
      "Naming",
      "Visual Identity",
      "Brand Guidelines",
    ],
    stat: "40+ brands launched",
  },
  {
    index: "03",
    title: "Front-End Engineering",
    blurb:
      "Design is only half the battle. We ship pixel-perfect, high-performance code with fluid motion and accessibility baked in.",
    deliverables: [
      "React / Next.js",
      "Motion & Interaction",
      "Performance (CLS < 0.1)",
      "Web Accessibility",
      "CMS Integration",
    ],
    stat: "100 Lighthouse avg.",
  },
  {
    index: "04",
    title: "Design Systems",
    blurb:
      "Scalable component libraries that keep multi-product teams fast, consistent, and free to ship without breaking brand.",
    deliverables: [
      "Token Architecture",
      "Component Library",
      "Documentation",
      "Governance",
      "Team Enablement",
    ],
    stat: "10x faster shipping",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute left-0 top-1/3 size-96 rounded-full bg-acid/5 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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
              Everything you need,
              <br />
              <span className="text-gradient">under one roof.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-foreground-muted">
            No hand-offs, no finger-pointing. One senior team owns the product
            from first sketch to shipped code.
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
                          {service.stat}
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
