import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { CommandInput } from "@/components/global/terminal/CommandInput";
import { CommandOutput } from "@/components/global/terminal/CommandOutput";
import { useOSState } from "@/hooks/useOSState";
import { useTerminal } from "@/hooks/useTerminal";
import { SHELL_PADDING_X } from "@/lib/layoutTokens";
import { cn } from "@/lib/utils";
import { useOSStore } from "@/store/osStore";

export function Terminal() {
  const { history, commandLog, pendingPrompt, execute } = useTerminal();
  const { setTerminalActive } = useOSState();
  const terminalOutputVisible = useOSStore((state) => state.terminalOutputVisible);
  const showTerminalOutput = useOSStore((state) => state.showTerminalOutput);
  const hideTerminalOutput = useOSStore((state) => state.hideTerminalOutput);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function handleExecute(command: string) {
    execute(command);
    showTerminalOutput();
  }

  const showOutput = history.length > 0 && terminalOutputVisible;

  return (
    <div className={cn("relative shrink-0 border-t border-border bg-surface", SHELL_PADDING_X)}>
      <AnimatePresence>
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 bottom-full z-50 flex max-h-[70vh] flex-col border-t border-border/50 bg-surface/35 shadow-window backdrop-blur-xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border/50 px-4 py-1.5">
              <span className="font-mono text-[0.65rem] uppercase tracking-wide text-text-muted">Output</span>
              <button
                type="button"
                onClick={hideTerminalOutput}
                aria-label="Hide terminal output"
                className="rounded-sm text-terminal-green transition-colors hover:text-terminal-green/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div ref={scrollRef} className="themed-scrollbar overflow-y-auto px-4 py-2">
              <CommandOutput history={history} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandInput
        commandLog={commandLog}
        masked={pendingPrompt !== null}
        onExecute={handleExecute}
        onFocusChange={setTerminalActive}
        onCollapseOutput={hideTerminalOutput}
      />
    </div>
  );
}
