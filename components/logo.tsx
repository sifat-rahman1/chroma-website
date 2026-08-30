import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      className={cn("group inline-flex items-center gap-2", className)}
      aria-label="CHROMA home"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-acid font-display text-sm font-bold text-black transition-transform duration-300 group-hover:-rotate-6">
        C
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        CHROMA
        <span className="text-acid">®</span>
      </span>
    </Link>
  );
}
