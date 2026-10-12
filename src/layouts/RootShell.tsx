import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import { AmbientBackground } from "@/components/global/3d/AmbientBackground";
import { CustomCursor } from "@/components/global/cursor/CustomCursor";
import { BootScreen } from "@/components/global/os/BootScreen";
import { LoadingScreen } from "@/components/global/os/LoadingScreen";
import { PortalTransition } from "@/components/global/os/PortalTransition";
import { Taskbar } from "@/components/global/os/Taskbar";
import { Terminal } from "@/components/global/terminal/Terminal";
import { useOSState } from "@/hooks/useOSState";
import { SHELL_PADDING_X } from "@/lib/layoutTokens";
import { cn } from "@/lib/utils";

export function RootShell() {
  const { systemState } = useOSState();
  const location = useLocation();

  return (
    <div className="cursor-none">
      <AnimatePresence mode="wait">
        {systemState === "BOOT" && <BootScreen key="boot" />}
        {systemState === "LOADING" && <LoadingScreen key="loading" />}
        {(systemState === "DESKTOP" || systemState === "TERMINAL") && (
          <div key="desktop" className="fixed inset-0 flex flex-col bg-background text-foreground">
            <header
              className={cn(
                "relative z-10 flex h-11 shrink-0 items-center justify-between border-b border-border bg-background font-mono text-xs text-text-secondary",
                SHELL_PADDING_X,
              )}
            >
              <span className="text-sm font-semibold tracking-[0.15em] text-text-primary">BARON.OS</span>
              <span className={systemState === "TERMINAL" ? "text-electric-blue" : "text-terminal-green"}>●</span>
            </header>

            <AmbientBackground />

            <AnimatePresence mode="wait">
              <div key={location.pathname} className="relative z-10 flex min-h-0 flex-1 flex-col">
                <Outlet />
              </div>
            </AnimatePresence>

            <PortalTransition />
            <Terminal />
            <Taskbar />
          </div>
        )}
      </AnimatePresence>

      <CustomCursor />
    </div>
  );
}
