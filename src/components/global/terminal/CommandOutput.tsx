import { motion } from "framer-motion";

import type { HistoryEntry } from "@/hooks/useTerminal";

interface CommandOutputProps {
  history: HistoryEntry[];
}

export function CommandOutput({ history }: CommandOutputProps) {
  return (
    <div className="flex flex-col gap-3 font-mono text-sm">
      {history.map((entry) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <p className="text-text-secondary">
            <span className="text-terminal-green">baron@os:~$</span> {entry.command}
          </p>
          {entry.output.map((line, index) => (
            <p key={index} className={line ? "text-text-primary" : "h-4"}>
              {line}
            </p>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
