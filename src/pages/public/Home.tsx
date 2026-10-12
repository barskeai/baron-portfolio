import { useState } from "react";
import { motion } from "framer-motion";

import { GlitchText } from "@/components/global/ascii/GlitchText";
import { KpiStrip } from "@/components/public/home/KpiStrip";
import { NavigationPanel } from "@/components/public/home/NavigationPanel";
import { useOSStore } from "@/store/osStore";
import { NAVIGATION_TARGETS } from "@/types/navigation";

function HomePage() {
  const [roleHovered, setRoleHovered] = useState(false);
  const { targetId, phase } = useOSStore((state) => state.portalTransition);
  const transitioning = phase !== "idle";

  return (
    <motion.div
      className="relative flex flex-1 flex-col gap-8 overflow-auto p-[clamp(0.75rem,3vw,1.5rem)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative z-10 flex flex-1 flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl space-y-2 font-mono">
            <p className="text-2xl font-semibold tracking-tight text-text-primary sm:text-xl">Hello, I'm Baron Miguel Niog.</p>
            <div onMouseEnter={() => setRoleHovered(true)} onMouseLeave={() => setRoleHovered(false)}>
              <GlitchText
                text="Software Engineer, Builder, Leader."
                glitching={roleHovered}
                className="text-base text-text-secondary sm:text-lg"
              />
            </div>
            <p className="text-xs text-text-muted">Explore the applications below, or use the terminal to navigate.</p>
          </div>

          <KpiStrip />
        </div>

        <div
          className="flex flex-row flex-nowrap items-center gap-[clamp(0.375rem,1.5vw,1rem)]"
          style={{ perspective: "1600px" }}
        >
          {NAVIGATION_TARGETS.map((target, i) => (
            <NavigationPanel
              key={target.id}
              target={target}
              index={i + 1}
              offset={i - Math.floor((NAVIGATION_TARGETS.length - 1) / 2)}
              portalState={!transitioning ? "idle" : target.id === targetId ? "selected" : "dimmed"}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default HomePage;
