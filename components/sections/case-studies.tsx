"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { cn } from "@/lib/utils";

type Project = {
  index: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  deliverables?: string[];
  timeline?: string;
  team?: string[];
  beforeAfter?: {
    beforeSrc: string;
    afterSrc: string;
    beforeAlt?: string;
    afterAlt?: string;
  };
  mockup?: React.ReactNode;
  videoUrl?: string;
  figmaUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function FinoraMockup() {
  return (
    <div className="relative mx-auto w-[58%] max-w-[200px] py-4">
      <div className="absolute -inset-6 rounded-[42px] bg-accent/25 blur-3xl" />
      <div className="relative rounded-[1.8rem] border border-white/10 bg-[#0d0d13] p-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-white/10" />
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-[8px] text-foreground-subtle">Good morning</p>
            <p className="text-[11px] font-semibold text-foreground">
              Jordan Lee
            </p>
          </div>
          <div className="size-6 rounded-full bg-gradient-to-br from-accent to-acid" />
        </div>
        <div className="mt-3 rounded-2xl bg-gradient-to-br from-accent to-accent/50 p-3">
          <p className="text-[7px] uppercase tracking-[0.15em] text-white/70">
            Total balance
          </p>
          <p className="font-display text-lg font-bold text-white">
            $48,290.40
          </p>
          <div className="mt-2 flex items-center justify-between text-[8px] text-white/75">
            <span className="tracking-widest">•••• 4829</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 font-semibold">
              +12.4%
            </span>
          </div>
        </div>
        <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.03] p-2">
          <svg viewBox="0 0 120 42" className="w-full" aria-hidden>
            <path
              d="M4 36 C18 33 22 24 32 27 C44 30 46 13 60 15 C74 17 76 23 88 19 C98 16 104 8 116 5"
              fill="none"
              stroke="#c6f517"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="116" cy="5" r="3" fill="#c6f517" />
          </svg>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["Send", "Top up", "Swap"].map((action) => (
            <div
              key={action}
              className="rounded-xl border border-white/5 bg-white/[0.03] py-1.5 text-center text-[8px] text-foreground-muted"
            >
              {action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PulseMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm py-2">
      <div className="absolute -inset-8 rounded-3xl bg-acid/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d13] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.02] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <div className="ml-2 flex-1 rounded-md bg-white/5 px-2 py-0.5 text-[8px] text-foreground-subtle">
            app.pulse.io/dashboard
          </div>
        </div>
        <div className="flex">
          <div className="hidden w-14 flex-col items-center gap-2 border-r border-white/5 p-2 sm:flex">
            <div className="size-6 rounded-lg bg-acid/25" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="size-6 rounded-lg bg-white/5" />
            ))}
          </div>
          <div className="flex-1 p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-foreground">
                Growth Overview
              </p>
              <span className="rounded-md bg-acid px-2 py-0.5 text-[8px] font-bold text-black">
                Live
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                ["Active users", "24.8K"],
                ["Revenue", "$1.2M"],
                ["Churn", "0.8%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/5 bg-white/[0.03] p-1.5"
                >
                  <p className="text-[7px] text-foreground-subtle">{label}</p>
                  <p className="text-[11px] font-bold text-foreground">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-lg border border-white/5 bg-white/[0.03] p-2">
              <svg viewBox="0 0 160 44" className="w-full" aria-hidden>
                {[
                  14, 22, 18, 28, 24, 34, 30, 26, 36, 32, 40, 38,
                ].map((h, i) => (
                  <rect
                    key={i}
                    x={8 + i * 12.4}
                    y={44 - h}
                    width="7"
                    height={h}
                    rx="2"
                    fill={i % 3 === 0 ? "#c6f517" : "#8b5cf6"}
                    opacity={i % 3 === 0 ? 0.9 : 0.7}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AureaMockup() {
  const swatches = [
    "bg-accent",
    "bg-acid",
    "bg-[#e8b04b]",
    "bg-[#f2efe8]",
    "bg-[#191920]",
  ];
  return (
    <div className="relative mx-auto w-full max-w-sm py-3">
      <div className="absolute -inset-8 rounded-3xl bg-accent/15 blur-3xl" />
      <div className="relative rounded-xl border border-white/10 bg-[#0d0d13] p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-acid font-display text-2xl font-bold text-black">
            A
          </div>
          <div>
            <p className="font-display text-lg font-bold tracking-[0.2em] text-foreground">
              AUREA
            </p>
            <p className="text-[8px] uppercase tracking-[0.3em] text-foreground-subtle">
              Maison De Parfum
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="w-3/5 -rotate-3 rounded-lg border border-white/10 bg-gradient-to-br from-[#2a2a35] to-[#16161c] p-3 shadow-xl">
            <p className="font-display text-[10px] font-bold tracking-[0.3em] text-foreground">
              AUREA
            </p>
            <div className="mt-2 h-px bg-white/20" />
            <p className="mt-2 text-[6px] uppercase tracking-[0.2em] text-foreground-muted">
              Creative Director
            </p>
            <p className="text-[8px] font-semibold text-foreground">
              Elena Vance
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {swatches.map((color) => (
            <span
              key={color}
              className={`size-7 rounded-full border border-white/15 ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FluxMockup() {
  const products = [
    { name: "Aurelia Coat", price: "$340", grad: "from-[#3a2f4a] to-[#17171f]" },
    { name: "Noir Tee", price: "$58", grad: "from-[#1c1c24] to-[#0c0c11]" },
    { name: "Volt Sneaker", price: "$120", grad: "from-accent/50 to-[#17171f]" },
    { name: "Lumen Bag", price: "$210", grad: "from-acid/25 to-[#17171f]" },
    { name: "Stone Watch", price: "$480", grad: "from-[#3c3428] to-[#17171f]" },
    { name: "Ivory Scarf", price: "$95", grad: "from-[#2e2e38] to-[#17171f]" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-sm py-2">
      <div className="absolute -inset-8 rounded-3xl bg-acid/10 blur-3xl" />
      <div className="relative rounded-xl border border-white/10 bg-[#0d0d13] p-3 shadow-2xl">
        <div className="flex items-center justify-between px-1">
          <p className="font-display text-xs font-bold tracking-[0.25em] text-foreground">
            FLUX
          </p>
          <div className="flex items-center gap-1.5">
            <span className="grid size-5 place-items-center rounded-full border border-white/10">
              <ShoppingBag className="size-2.5 text-foreground-muted" />
            </span>
            <span className="size-5 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="relative mt-2 overflow-hidden rounded-lg bg-gradient-to-r from-accent/60 to-acid/25 p-3">
          <p className="font-display text-[11px] font-bold text-foreground">
            New Season Drop
          </p>
          <p className="text-[8px] text-white/70">Up to 40% off</p>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-lg border border-white/5 bg-white/[0.03] p-1.5"
            >
              <div
                className={`aspect-square rounded-md bg-gradient-to-br ${product.grad}`}
              />
              <p className="mt-1 truncate text-[7px] text-foreground-muted">
                {product.name}
              </p>
              <p className="text-[8px] font-bold text-foreground">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Finora",
    category: "Fintech Mobile App",
    description:
      "End-to-end product design for a neobank — from onboarding flows to the card-issuing dashboard.",
    longDescription:
      "We partnered with Finora to design a complete mobile banking experience from the ground up. The challenge was creating trust through design in a crowded fintech market while simplifying complex financial workflows. We conducted extensive user research, mapped 47 user flows, and built a design system that scaled across iOS, Android, and web. The result: a 140% increase in onboarding completion and a 4.9 App Store rating.",
    metric: "+140%",
    metricLabel: "Conversion Rate",
    tags: ["Product Design", "Mobile", "Motion"],
    deliverables: [
      "UX Research & Strategy",
      "47 User Flows Mapped",
      "Design System (iOS/Android/Web)",
      "High-Fidelity Prototypes",
      "Usability Testing (120+ users)",
      "Developer Handoff & QA",
    ],
    timeline: "14 Weeks",
    team: ["Sarah Chen (Lead Designer)", "Marcus Webb (UX Research)", "Priya Patel (Motion)"],
    beforeAfter: {
      beforeSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
      afterSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      beforeAlt: "Finora legacy banking app interface",
      afterAlt: "Finora redesigned mobile banking interface",
    },
    mockup: <FinoraMockup />,
    videoUrl: "https://vimeo.com/chroma/finora-case-study",
    figmaUrl: "https://figma.com/chroma/finora",
    liveUrl: "https://finora.app",
    caseStudyUrl: "/case-studies/finora",
  },
  {
    index: "02",
    title: "Pulse",
    category: "SaaS Analytics Platform",
    description:
      "A data-dense growth analytics platform redesigned for clarity, speed, and daily active use.",
    longDescription:
      "Pulse needed to transform their cluttered analytics dashboard into a tool that product teams actually use daily. We restructured the information architecture, introduced progressive disclosure for complex metrics, and built a real-time collaboration layer. The redesign reduced task completion time by 68% and increased daily active users 3.2x within the first quarter.",
    metric: "3.2x",
    metricLabel: "Activation Rate",
    tags: ["UI/UX", "Web App", "Design System"],
    deliverables: [
      "Information Architecture Overhaul",
      "Dashboard & Reporting UI",
      "Real-time Collaboration Features",
      "Design System & Component Library",
      "Accessibility Audit (WCAG 2.1 AA)",
      "Engineering Handoff",
    ],
    timeline: "10 Weeks",
    team: ["David Park (Lead Designer)", "Lisa Wong (UX Engineer)", "Ahmed Hassan (Frontend)"],
    beforeAfter: {
      beforeSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      afterSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      beforeAlt: "Pulse legacy analytics dashboard",
      afterAlt: "Pulse redesigned analytics platform",
    },
    mockup: <PulseMockup />,
    videoUrl: "https://vimeo.com/chroma/pulse-case-study",
    figmaUrl: "https://figma.com/chroma/pulse",
    liveUrl: "https://pulse.io",
    caseStudyUrl: "/case-studies/pulse",
  },
  {
    index: "03",
    title: "Aurea",
    category: "Luxury Brand Identity",
    description:
      "Full identity system for a fragrance maison — logo, packaging, print, and digital presence.",
    longDescription:
      "Aurea approached us to build a brand identity for their ultra-premium fragrance line. We developed a visual language inspired by alchemy and light — from the custom logomark and typography system to the packaging suite and digital experience. The brand launched to 87% aided recall in target demographic and secured placement in 200+ luxury retailers globally.",
    metric: "+87%",
    metricLabel: "Brand Recall",
    tags: ["Branding", "Identity", "Art Direction"],
    deliverables: [
      "Brand Strategy & Positioning",
      "Logo & Visual Identity System",
      "Packaging Design (Primary & Secondary)",
      "Print Collateral & Editorial Layouts",
      "Website Art Direction",
      "Brand Guidelines (120 pages)",
    ],
    timeline: "12 Weeks",
    team: ["Elena Vasquez (Creative Director)", "Tomás Ruiz (Brand Designer)", "Yuki Tanaka (Packaging)"],
    beforeAfter: {
      beforeSrc: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200&q=80",
      afterSrc: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=80",
      beforeAlt: "Aurea initial brand concepts",
      afterAlt: "Aurea final luxury brand identity",
    },
    mockup: <AureaMockup />,
    videoUrl: "https://vimeo.com/chroma/aurea-case-study",
    figmaUrl: "https://figma.com/chroma/aurea",
    caseStudyUrl: "/case-studies/aurea",
  },
  {
    index: "04",
    title: "Flux",
    category: "Commerce Web Experience",
    description:
      "Headless commerce storefront with editorial layouts and buttery-smooth product discovery.",
    longDescription:
      "Flux needed a commerce experience that felt more like an editorial magazine than a traditional store. We built a headless Next.js + Shopify implementation with CMS-driven editorial layouts, 3D product viewers, and a custom animation system. The result: 2.1x average order value, 40% reduction in bounce rate, and a site that loads in under 1.2s globally.",
    metric: "2.1x",
    metricLabel: "Avg. Order Value",
    tags: ["Front-End", "E-commerce", "3D"],
    deliverables: [
      "Headless Architecture (Next.js + Shopify)",
      "Editorial CMS Integration",
      "3D Product Viewer (Three.js)",
      "Custom Animation System (Framer Motion)",
      "Performance Optimization (LCP < 1.2s)",
      "Design System & Storybook",
    ],
    timeline: "16 Weeks",
    team: ["James Liu (Tech Lead)", "Sofia Andersson (Designer)", "Raj Patel (3D Engineer)"],
    beforeAfter: {
      beforeSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      afterSrc: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
      beforeAlt: "Flux legacy e-commerce site",
      afterAlt: "Flux redesigned editorial commerce experience",
    },
    mockup: <FluxMockup />,
    videoUrl: "https://vimeo.com/chroma/flux-case-study",
    figmaUrl: "https://figma.com/chroma/flux",
    liveUrl: "https://flux.commerce",
    caseStudyUrl: "/case-studies/flux",
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      variants={item}
      role="article"
      tabIndex={0}
      aria-label={`${project.title} — ${project.category}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-card shadow-sm transition-all duration-300 ease-out hover:border-accent/20 hover:shadow-lg hover:shadow-accent/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background will-change-transform transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden border-b border-line bg-[#08080b]">
        <span className="absolute left-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-subtle">
          {project.index}
        </span>
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          {project.mockup}
        </div>
        {project.beforeAfter && (
          <div className="absolute inset-0 p-4">
            <BeforeAfterSlider
              beforeSrc={project.beforeAfter.beforeSrc}
              afterSrc={project.beforeAfter.afterSrc}
              beforeAlt={project.beforeAfter.beforeAlt}
              afterAlt={project.beforeAfter.afterAlt}
              beforeLabel="Before"
              afterLabel="After"
              className="h-full"
              defaultPosition={50}
            />
          </div>
        )}
        <div className="absolute right-4 top-4 flex translate-y-3 items-center gap-2 rounded-full border border-acid/40 bg-background/80 px-4 py-2 opacity-0 shadow-[0_0_30px_rgb(var(--glow-acid)/0.25)] backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-display text-lg font-bold text-acid">
            {project.metric}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground-muted">
            {project.metricLabel}
          </span>
        </div>

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="text-center p-6">
            <p className="font-display text-lg font-semibold text-white mb-2">View Case Study</p>
            <p className="text-sm text-white/70">click to explore →</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-accent">
              {project.category}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {project.title}
            </h3>
          </div>
          <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line bg-card text-foreground-muted transition-all duration-300 group-hover:border-acid/50 group-hover:bg-acid group-hover:text-black">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-muted px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-foreground-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute right-0 top-24 size-96 rounded-full bg-accent/10 blur-[160px]" />
      <div className="container-fluid relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <Badge variant="mono">01 — Shipped, not pitched</Badge>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
              Work that shipped.
              <br />
              <span className="text-gradient">Metrics that stayed.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-foreground-muted">
            <span className="font-semibold text-foreground">Four launches, one rule:</span> we measure the business metric — not Dribbble likes.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 lg:grid-cols-12"
        >
          {PROJECTS.map((project, idx) => (
            <div key={project.index} className={idx % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </motion.div>

        {/* Pull-quote break — low-density editorial after high-density grid */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-card shadow-sm p-8 lg:p-12"
        >
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-accent/10 blur-[80px] pointer-events-none" aria-hidden />
          <p className="relative font-display text-xl leading-relaxed text-foreground sm:text-2xl">
            “47 flows to one system in <span className="text-accent">14 days</span> — onboarding <span className="text-accent">+140%</span>, and our engineers merged on day one.”
          </p>
          <footer className="relative mt-4 flex items-center gap-3">
            <span className="size-8 rounded-full bg-accent/20 grid place-items-center text-accent font-mono text-xs">FL</span>
            <span className="text-sm text-foreground-muted"><span className="font-semibold text-foreground">Sarah Chen, CTO Finora</span> — placed adjacent to Finora proof, not hidden in a carousel</span>
          </footer>
        </motion.blockquote>
      </div>

      <CaseStudyModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}