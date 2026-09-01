"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer relative overflow-hidden isolate transition-all duration-300 will-change-transform transform-gpu",
  {
    variants: {
      variant: {
        default:
          "bg-acid text-[#04202a] hover:bg-acid/90 btn-glow-acid magnetic-btn btn-shine before:rounded-full hover:shadow-[0_0_32px_rgb(var(--glow-acid)/0.5)] [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-300 group-hover:[&_svg:last-child]:translate-x-1 group-hover:[&_svg:last-child]:-translate-y-1",
        outline:
          "border border-foreground/15 bg-transparent text-foreground hover:border-acid/70 hover:text-acid hover:bg-acid/5 magnetic-btn [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-300 group-hover:[&_svg:last-child]:translate-x-0.5",
        ghost: "text-foreground-muted hover:text-foreground hover:bg-muted [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-300",
        violet:
          "bg-accent text-white dark:text-[#052733] hover:bg-accent/90 btn-glow-accent magnetic-btn btn-shine before:rounded-full hover:shadow-[0_0_32px_rgb(var(--glow-accent)/0.5)] [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-300 group-hover:[&_svg:last-child]:translate-x-1 group-hover:[&_svg:last-child]:-translate-y-1",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const ref = React.useRef<HTMLElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (variant === "ghost") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.15;
    const dy = (e.clientY - cy) * 0.15;
    setPos({ x: dx, y: dy });
  }, [variant]);

  const handleMouseLeave = React.useCallback(() => setPos({ x: 0, y: 0 }), []);

  const Comp = asChild ? Slot : "button";

  // Only apply magnetic transform for primary CTAs (default/violet)
  const magneticStyle = variant === "ghost" ? undefined : { transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` };

  return (
    <Comp
      ref={ref as any}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={magneticStyle as React.CSSProperties}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={handleMouseLeave as any}
      {...props}
    />
  );
}

export { Button, buttonVariants };