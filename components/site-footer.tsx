"use client";

import { useCallback, useEffect, useState, useRef, memo } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const BRAND_PATHS: Record<string, string> = {
  X: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z",
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  Dribbble:
    "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z",
  GitHub:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
};

const SOCIALS = [
  { label: "Twitter / X", href: "https://x.com", brand: "X" },
  { label: "Instagram", href: "https://instagram.com", brand: "Instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", brand: "LinkedIn" },
  { label: "Dribbble", href: "https://dribbble.com", brand: "Dribbble" },
  { label: "GitHub", href: "https://github.com", brand: "GitHub" },
];

function BrandIcon({ brand }: { brand: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d={BRAND_PATHS[brand]} />
    </svg>
  );
}

const SITEMAP = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const LiveClock = memo(function LiveClock() {
  const [time, setTime] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const update = () => {
      if (mountedRef.current) {
        setTime(formatter.format(new Date()));
      }
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => {
      mountedRef.current = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="flex items-center gap-2.5 rounded-full border border-line bg-card px-4 py-2">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-2 animate-ping rounded-full bg-acid/60" />
        <span className="relative inline-flex size-2 rounded-full bg-acid" />
      </span>
      <span className="font-mono text-xs tracking-[0.15em] text-foreground-muted">
        NY {time}
      </span>
    </div>
  );
});

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const email = "hello@chroma.studio";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const input = document.createElement("textarea");
      input.value = email;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(input);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied email address" : "Copy email address hello@chroma.studio"}
      className="group inline-flex cursor-pointer items-center gap-3 font-display text-3xl font-bold tracking-tight text-foreground transition-colors hover:text-acid sm:text-5xl"
    >
      <span className="text-gradient">{copied ? "Copied!" : "hello@chroma.studio"}</span>
      <span
        className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-card transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-black sm:size-14"
        aria-hidden
      >
        {copied ? <Check className="size-5 text-black" /> : <Copy className="size-5" />}
      </span>
    </button>
  );
}

function FooterCTA() {
  return (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-acid">
        Let&apos;s build something
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl">
        Have an idea?
        <br />
        Let&apos;s make it iconic.
      </h2>
    </>
  );
}

function FooterEmail() {
  return (
    <div className="space-y-4">
      <CopyEmailButton />
<p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-subtle">
            Tap to copy — we reply within 24 hours
          </p>
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-subtle">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLinks({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <>
      {items.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-sm text-foreground-muted transition-colors hover:text-acid"
          >
            {link.label}
          </a>
        </li>
      ))}
    </>
  );
}

function FooterServices() {
  return (
    <ul className="mt-4 space-y-2.5 text-sm text-foreground-muted">
      <li>UI/UX & Product Design</li>
      <li>Brand Strategy</li>
      <li>Front-End Engineering</li>
      <li>Design Systems</li>
    </ul>
  );
}

function FooterConnect() {
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="grid size-10 place-items-center rounded-full border border-line bg-card text-foreground-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-acid/60 hover:text-acid"
          >
            <BrandIcon brand={social.brand} />
          </a>
        ))}
      </div>
      <p className="mt-5 text-sm text-foreground-muted">New York • Remote</p>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="absolute inset-x-0 -top-32 mx-auto size-96 rounded-full bg-accent/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <FooterCTA />
          <Button asChild size="lg" className="self-start md:self-auto">
            <a href="#contact">Book a Strategy Call<ArrowUpRight /></a>
          </Button>
        </div>

        <FooterEmail />

        <div className="mt-16 grid gap-10 border-t border-line py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-foreground-muted">
              An award-winning digital design & engineering studio crafting
              experiences that drive growth.
            </p>
          </div>

          <FooterColumn title="Sitemap">
            <FooterLinks items={SITEMAP} />
          </FooterColumn>

          <FooterColumn title="Services">
            <FooterServices />
          </FooterColumn>

          <FooterColumn title="Connect">
            <FooterConnect />
          </FooterColumn>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} CHROMA® Studio. All rights reserved.
          </p>
          <LiveClock />
        </div>
      </div>
    </footer>
  );
}