import { motion } from "framer-motion";

import { fadeUpItem } from "@/lib/motionVariants";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  title: string;
  accentColor?: string;
  className?: string;
}

export function ApplicationCard({ title, accentColor, className }: ApplicationCardProps) {
  return (
    <motion.div
      variants={fadeUpItem}
      className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: accentColor ?? "var(--text-muted)" }}
          aria-hidden="true"
        />
        <span className="truncate font-mono text-xs uppercase tracking-wide text-text-secondary">{title}</span>
      </div>
      <div className="flex min-h-20 items-center justify-center px-4 py-6 text-center font-mono text-xs text-text-muted">
        No entries yet
      </div>
    </motion.div>
  );
}
