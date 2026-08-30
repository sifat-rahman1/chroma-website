"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  defaultPosition?: number;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before redesign",
  afterAlt = "After redesign",
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  defaultPosition = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const newPosition = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setPosition(newPosition);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove as EventListener);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove as EventListener, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
      document.body.style.userSelect = "none";
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove as EventListener);
      window.removeEventListener("touchend", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 5;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setPosition((p) => Math.max(0, p - step));
          break;
        case "ArrowRight":
          e.preventDefault();
          setPosition((p) => Math.min(100, p + step));
          break;
        case "Home":
          e.preventDefault();
          setPosition(0);
          break;
        case "End":
          e.preventDefault();
          setPosition(100);
          break;
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-[#08080b]", className)}
      role="img"
      aria-label={`${beforeLabel} vs ${afterLabel} comparison slider`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown as React.TouchEventHandler}
    >
      <div className="absolute inset-0 z-10 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          src={afterSrc}
          alt={afterAlt}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      </div>

      <img
        src={beforeSrc}
        alt={beforeAlt}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
      />

      <div
        ref={handleRef}
        className={cn(
          "absolute top-0 bottom-0 z-20 flex items-center justify-center w-px bg-white/20 transition-colors duration-200",
          isDragging && "bg-acid"
        )}
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        role="slider"
        aria-label="Comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown as React.TouchEventHandler}
      >
        <div className="relative z-10 flex h-full items-center gap-2 px-2">
          <div className="flex h-12 w-px bg-white/30" />
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-background/95 backdrop-blur-sm border border-white/20 shadow-xl transition-all duration-200 hover:scale-110">
            <ChevronLeft className="size-6 text-foreground" />
            <ChevronRight className="size-6 text-foreground" />
          </div>
          <div className="flex h-12 w-px bg-white/30" />
        </div>
      </div>

      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-foreground/60">
        {beforeLabel}
      </div>
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-foreground/60">
        {afterLabel}
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-4 py-2 text-[11px] font-mono text-foreground/50">
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">←</kbd>
        <span>Drag or use arrows</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">→</kbd>
      </div>
    </div>
  );
}

interface BeforeAfterSliderFullscreenProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  onClose: () => void;
}

export function BeforeAfterSliderFullscreen({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before redesign",
  afterAlt = "After redesign",
  beforeLabel = "Before",
  afterLabel = "After",
  onClose,
}: BeforeAfterSliderFullscreenProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newPosition = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setPosition(newPosition);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove as EventListener);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove as EventListener, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
      document.body.style.userSelect = "none";
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove as EventListener);
      window.removeEventListener("touchend", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      const step = e.shiftKey ? 10 : 5;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setPosition((p) => Math.max(0, p - step));
          break;
        case "ArrowRight":
          e.preventDefault();
          setPosition((p) => Math.min(100, p + step));
          break;
        case "Home":
          e.preventDefault();
          setPosition(0);
          break;
        case "End":
          e.preventDefault();
          setPosition(100);
          break;
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${beforeLabel} vs ${afterLabel} comparison`}
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute right-6 top-6 z-60 grid size-12 place-items-center rounded-full border border-line bg-card text-foreground-muted transition-all duration-300 hover:border-acid/50 hover:text-acid hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Close comparison"
      >
        <Expand className="size-5" />
      </button>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[80vh] max-h-[700px] overflow-hidden rounded-2xl border border-white/10 bg-[#08080b]"
        role="img"
        aria-label={`${beforeLabel} vs ${afterLabel} fullscreen comparison`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown as React.TouchEventHandler}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 z-10 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img
            src={afterSrc}
            alt={afterAlt}
            className="w-full h-full object-contain transition-opacity duration-300"
          />
        </div>

        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="w-full h-full object-contain transition-opacity duration-300"
        />

        <div
          className={cn(
            "absolute top-0 bottom-0 z-20 flex items-center justify-center w-px bg-white/20 transition-colors duration-200",
            isDragging && "bg-acid"
          )}
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          role="slider"
          aria-label="Comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown as React.TouchEventHandler}
        >
          <div className="relative z-10 flex h-full items-center gap-2 px-2">
            <div className="flex h-16 w-px bg-white/30" />
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-background/95 backdrop-blur-sm border border-white/20 shadow-xl">
              <ChevronLeft className="size-6 text-foreground" />
              <ChevronRight className="size-6 text-foreground" />
            </div>
            <div className="flex h-16 w-px bg-white/30" />
          </div>
        </div>

        <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-sm px-4 py-2 text-sm font-mono text-foreground/70">
          {beforeLabel}
        </div>
        <div className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-sm px-4 py-2 text-sm font-mono text-foreground/70">
          {afterLabel}
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex items-center gap-3 rounded-full bg-background/90 backdrop-blur-sm px-6 py-3 text-sm font-mono text-foreground/60">
          <kbd className="px-2 py-1 rounded bg-white/10 border border-white/10">←</kbd>
          <span>Drag or use arrow keys</span>
          <kbd className="px-2 py-1 rounded bg-white/10 border border-white/10">→</kbd>
          <span className="mx-2 text-foreground/40">|</span>
          <kbd className="px-2 py-1 rounded bg-white/10 border border-white/10">Esc</kbd>
          <span>Close</span>
        </div>
      </div>
    </div>
  );
}