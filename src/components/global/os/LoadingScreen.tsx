import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { ScrambleText } from "@/components/global/ascii/ScrambleText";
import { useOSState } from "@/hooks/useOSState";

const MODULES = ["Identity Module", "Project Database", "Experience Records", "Knowledge Base"];

const KERNEL_DELAY_MS = 500;
const LINE_DELAY_MS = 300;
const GREETING_DELAY_MS = 400;
const HOLD_MS = 900;

export function LoadingScreen() {
  const { enterDesktop } = useOSState();

  useEffect(() => {
    const totalMs = KERNEL_DELAY_MS + MODULES.length * LINE_DELAY_MS + GREETING_DELAY_MS + HOLD_MS;
    const timer = setTimeout(enterDesktop, totalMs);
    return () => clearTimeout(timer);
  }, [enterDesktop]);

  const readyDelay = (KERNEL_DELAY_MS + MODULES.length * LINE_DELAY_MS) / 1000;
  const greetingDelay = readyDelay + GREETING_DELAY_MS / 1000;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-sm font-mono text-sm">
        <p className="mb-4 tracking-widest text-text-primary">BARON.OS BOOTLOADER</p>

        <ScrambleText text="Initializing kernel..." durationMs={450} className="mb-3 text-text-secondary" />

        <ul className="mb-4 space-y-1.5">
          {MODULES.map((module, index) => (
            <motion.li
              key={module}
              className="flex items-center gap-2 text-text-secondary"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (KERNEL_DELAY_MS + index * LINE_DELAY_MS) / 1000, duration: 0.3 }}
            >
              <Check className="h-3.5 w-3.5 text-terminal-green" />
              {module}
            </motion.li>
          ))}
        </ul>

        <motion.p
          className="mb-1 text-terminal-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: readyDelay, duration: 0.3 }}
        >
          System Ready.
        </motion.p>

        <motion.p
          className="text-text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: greetingDelay, duration: 0.3 }}
        >
          Hello, User.
        </motion.p>
      </div>
    </motion.div>
  );
}
