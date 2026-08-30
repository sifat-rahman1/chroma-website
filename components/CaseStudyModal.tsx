"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Play, ExternalLink, Code, Monitor, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSliderFullscreen } from "@/components/BeforeAfterSlider";

interface CaseStudyData {
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
}

interface CaseStudyModalProps {
  project: CaseStudyData;
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export function CaseStudyModal({ project, isOpen, onClose }: CaseStudyModalProps) {
  const focusRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => focusRef.current?.focus(), 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "Tab") {
          const focusableElements = document.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={onClose}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={focusRef}
            onClick={onClose}
            className="absolute right-5 top-5 z-20 grid size-11 place-items-center rounded-full border border-line bg-card text-foreground-muted transition-all duration-300 hover:border-acid/50 hover:text-acid hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close case study"
          >
            <X className="size-5" />
          </button>

          <div className="flex flex-col">
            {project.beforeAfter && (
              <div className="relative aspect-video w-full overflow-hidden rounded-t-[24px] border-b border-white/10">
                <BeforeAfterSliderFullscreen
                  beforeSrc={project.beforeAfter.beforeSrc}
                  afterSrc={project.beforeAfter.afterSrc}
                  beforeAlt={project.beforeAfter.beforeAlt}
                  afterAlt={project.beforeAfter.afterAlt}
                  beforeLabel="Before"
                  afterLabel="After"
                  onClose={onClose}
                />
              </div>
            )}

            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={staggerItem} className="mb-6 flex flex-wrap items-center gap-3">
                  <Badge variant="mono">{project.index} — {project.category}</Badge>
                  {project.timeline && (
                    <Badge variant="accent">
                      <Sparkles className="size-3 mr-1" /> {project.timeline}
                    </Badge>
                  )}
                </motion.div>

                <motion.h1
                  id="case-study-title"
                  variants={staggerItem}
                  className="font-display text-3xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  {project.title}
                </motion.h1>

                <motion.p variants={staggerItem} className="mt-4 text-lg leading-relaxed text-foreground/70">
                  {project.longDescription || project.description}
                </motion.p>

                <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 rounded-full border border-acid/40 bg-acid/10 px-4 py-2 font-display text-lg font-bold text-acid">
                    {project.metric}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/60">
                    {project.metricLabel}
                  </div>
                </motion.div>

                {project.deliverables && project.deliverables.length > 0 && (
                  <motion.div variants={staggerItem} className="mt-10">
                    <h3 className="font-display text-lg font-semibold text-foreground">Key Deliverables</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.deliverables.map((item) => (
                        <motion.span
                          key={item}
                          variants={staggerItem}
                          className="rounded-full border border-line bg-muted px-3.5 py-1.5 text-xs text-foreground/70 transition-colors hover:border-acid/50 hover:text-acid"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {project.tags && project.tags.length > 0 && (
                  <motion.div variants={staggerItem} className="mt-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">Expertise</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          variants={staggerItem}
                          className="rounded-full border border-line bg-muted px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-foreground-muted"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {project.team && project.team.length > 0 && (
                  <motion.div variants={staggerItem} className="mt-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">Team</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.team.map((member) => (
                        <motion.span
                          key={member}
                          variants={staggerItem}
                          className="rounded-full border border-line bg-muted px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-foreground-muted"
                        >
                          {member}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {(project.videoUrl || project.figmaUrl || project.liveUrl || project.caseStudyUrl) && (
                  <motion.div variants={staggerItem} className="mt-10 space-y-3">
                    <h3 className="font-display text-lg font-semibold text-foreground">Explore</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.videoUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          asChild
                          className="group"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.videoUrl!, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="size-4 mr-2" />
                            Watch Case Study
                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </Button>
                      )}
                      {project.figmaUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          asChild
                          className="group"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.figmaUrl!, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                            <Code className="size-4 mr-2" />
                            View Figma File
                            <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          asChild
                          className="group"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl!, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Monitor className="size-4 mr-2" />
                            Visit Live Site
                            <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </Button>
                      )}
                      {project.caseStudyUrl && (
                        <Button
                          variant="default"
                          size="lg"
                          asChild
                          className="group"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.caseStudyUrl!, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                            <CheckCircle className="size-4 mr-2" />
                            Full Case Study
                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}