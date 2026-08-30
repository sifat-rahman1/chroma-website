"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = ["UI/UX", "Web Dev", "Mobile App", "Branding"];

const BUDGETS = ["$10k–$25k", "$25k–$50k", "$50k+"];

const NEXT_STEPS = [
  {
    title: "Discovery call",
    description:
      "A free 30-minute call to understand your goals and scope. No pressure, no jargon.",
  },
  {
    title: "Proposal & estimate",
    description:
      "Within 48 hours you'll receive a tailored proposal with timeline, budget, and team.",
  },
  {
    title: "Kickoff",
    description:
      "Lock in the plan and we start week one with research and strategy. Simple.",
  },
];

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function Estimator() {
  const [types, setTypes] = useState<string[]>(["UI/UX"]);
  const [budget, setBudget] = useState<string>("$10k–$25k");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const toggleType = (type: string) => {
    setTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "That email doesn't look right.";
    }
    if (!message.trim()) next.message = "Tell us a little about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 1400);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[180px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="mono">04 — Project Estimator</Badge>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
              Let&apos;s estimate
              <br />
              <span className="text-gradient">your project.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted">
              Tell us what you&apos;re building and we&apos;ll come back with a
              realistic budget and timeline. Average reply time: under 24 hours.
            </p>

            <div className="mt-9 space-y-6">
              {NEXT_STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-acid/40 bg-acid/10 font-mono text-[10px] text-acid">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-acid/40 bg-acid/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                <Sparkles className="size-3.5" />
                Accepting Q4 Projects
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-foreground-muted">
                <Mail className="size-4 text-accent" />
                hello@chroma.studio
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-foreground-muted">
                <MapPin className="size-4 text-accent" />
                New York • Remote
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-line bg-card/70 p-6 backdrop-blur-sm sm:p-9"
          >
            {status === "success" ? (
              <div
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
                role="status"
                aria-live="polite"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="grid size-16 place-items-center rounded-full bg-acid/15 text-acid"
                >
                  <Check className="size-8" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
                  Proposal incoming.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">
                  Thanks {name.split(" ")[0] || "there"} — we&apos;ve got your
                  brief. Expect a detailed estimate from us at{" "}
                  <span className="font-medium text-acid">{email}</span> within
                  24 hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-8"
                  onClick={() => {
                    setStatus("idle");
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div>
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium text-foreground">
                      What do you need?{" "}
                      <span className="text-foreground-subtle">(select all that apply)</span>
                    </legend>
                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-label="Project types"
                    >
                      {PROJECT_TYPES.map((type) => {
                        const active = types.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleType(type)}
                            aria-pressed={active}
                            className={cn(
                              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              active
                                ? "border-acid bg-acid text-[#04202a] btn-glow-acid"
                                : "border-foreground/15 bg-transparent text-foreground-muted hover:border-acid/50 hover:text-acid"
                            )}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-7">
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium text-foreground">
                      Budget range
                    </legend>
                    <div
                      className="grid grid-cols-3 gap-2"
                      role="radiogroup"
                      aria-label="Budget range"
                    >
                      {BUDGETS.map((option) => {
                        const active = budget === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setBudget(option)}
                            className={cn(
                              "cursor-pointer rounded-xl border px-2 py-3 text-center font-mono text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              active
                                ? "border-accent bg-accent/15 text-accent btn-glow-accent"
                                : "border-foreground/15 text-foreground-muted hover:border-accent/50 hover:text-foreground"
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Cooper"
                      aria-invalid={!!errors.name}
                      className={cn(
                        "mt-2 h-12 w-full rounded-xl border bg-muted px-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground-subtle focus:border-accent focus:ring-2 focus:ring-accent/30",
                        errors.name ? "border-red-500/70" : "border-line"
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      aria-invalid={!!errors.email}
                      className={cn(
                        "mt-2 h-12 w-full rounded-xl border bg-muted px-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground-subtle focus:border-accent focus:ring-2 focus:ring-accent/30",
                        errors.email ? "border-red-500/70" : "border-line"
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Project details
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your goals, timeline, and what success looks like…"
                    rows={5}
                    aria-invalid={!!errors.message}
                    className={cn(
                        "mt-2 w-full resize-none rounded-xl border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-foreground-subtle focus:border-accent focus:ring-2 focus:ring-accent/30",
                      errors.message ? "border-red-500/70" : "border-line"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-7 w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Get My Estimate
                      <Send />
                    </>
                  )}
                </Button>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-subtle">
                  No spam. No obligations. Ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
