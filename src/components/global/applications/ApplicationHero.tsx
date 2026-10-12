import { motion } from "framer-motion";

import { fadeUpItem } from "@/lib/motionVariants";
import { APPLICATION_META } from "@/types/applications";
import { NAVIGATION_ACCENTS, NAVIGATION_ICONS } from "@/types/navigation";
import type { AppId } from "@/types/navigation";

interface ApplicationHeroProps {
  appId: AppId;
}

export function ApplicationHero({ appId }: ApplicationHeroProps) {
  const meta = APPLICATION_META[appId];
  const Icon = NAVIGATION_ICONS[appId];
  const accent = NAVIGATION_ACCENTS[appId];

  return (
    <motion.div
      variants={fadeUpItem}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-10 text-center sm:py-12"
    >
      <Icon className="h-8 w-8" style={{ color: accent }} />
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted">{meta.theme}</p>
      <p className="font-mono text-sm text-text-secondary">{meta.futureVisualization}</p>
    </motion.div>
  );
}
