import { useState } from "react";
import { motion } from "framer-motion";

import { AsciiLogo } from "@/components/global/ascii/AsciiLogo";
import { ScrambleText } from "@/components/global/ascii/ScrambleText";
import { AmbientBackground } from "@/components/global/3d/AmbientBackground";
import { useOSState } from "@/hooks/useOSState";

type BootStage = "initializing" | "reveal" | "ready";

export function BootScreen() {
  const { startLoading } = useOSState();
  const [stage, setStage] = useState<BootStage>("initializing");

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-background px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => stage === "ready" && startLoading()}
      role="button"
      aria-label={stage === "ready" ? "Continue to Baron OS" : "Baron OS booting"}
    >
      <AmbientBackground />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {stage === "initializing" ? (
          <ScrambleText
            text="INITIALIZING..."
            durationMs={600}
            onComplete={() => setStage("reveal")}
            className="text-sm text-text-secondary"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AsciiLogo animated durationMs={1200} onRevealComplete={() => setStage("ready")} />
          </motion.div>
        )}

        <div className="flex h-10 flex-col items-center gap-1 text-center font-mono text-sm">
          {stage === "ready" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <p className="text-terminal-green">SYSTEM ONLINE</p>
              <p className="text-text-secondary">
                CLICK ANYWHERE TO CONTINUE
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  _
                </motion.span>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
