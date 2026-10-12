import { Home as HomeIcon, Terminal as TerminalIcon } from "lucide-react";
import type { ComponentType } from "react";
import { useLocation } from "react-router-dom";

import { TERMINAL_INPUT_ID } from "@/components/global/terminal/CommandInput";
import { useNavigation } from "@/hooks/useNavigation";
import { SHELL_PADDING_X } from "@/lib/layoutTokens";
import { cn } from "@/lib/utils";
import { useOSStore } from "@/store/osStore";
import { NAVIGATION_ACCENTS, NAVIGATION_ICONS, NAVIGATION_TARGETS } from "@/types/navigation";

interface TaskbarEntry {
  key: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
  accent?: string;
  onClick: () => void;
}

const FOCUS_RING_CLASS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export function Taskbar() {
  const { navigateTo, navigateToPath } = useNavigation();
  const showTerminalOutput = useOSStore((state) => state.showTerminalOutput);
  const location = useLocation();

  function handleTerminalClick() {
    showTerminalOutput();
    document.getElementById(TERMINAL_INPUT_ID)?.focus();
  }

  const entries: TaskbarEntry[] = [
    {
      key: "home",
      label: "Home",
      icon: HomeIcon,
      isActive: location.pathname === "/",
      onClick: () => navigateToPath("/"),
    },
    ...NAVIGATION_TARGETS.map((target) => ({
      key: target.id,
      label: target.label,
      icon: NAVIGATION_ICONS[target.id],
      isActive: location.pathname === target.path,
      accent: NAVIGATION_ACCENTS[target.id],
      onClick: () => navigateTo(target.id),
    })),
  ];

  return (
    <div
      className={cn(
        "relative z-40 flex h-12 shrink-0 items-center justify-between border-t border-border bg-surface font-mono text-xs text-text-secondary",
        SHELL_PADDING_X,
      )}
    >
      <div className="flex items-center gap-1.5">
        {entries.map((entry) => {
          const Icon = entry.icon;
          const activeColor = entry.accent ?? "var(--terminal-green)";
          return (
            <button
              key={entry.key}
              type="button"
              onClick={entry.onClick}
              title={entry.label}
              aria-label={entry.label}
              aria-current={entry.isActive ? "page" : undefined}
              style={entry.isActive ? { color: activeColor } : undefined}
              className={cn(
                "group relative flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary",
                entry.isActive && "bg-surface-hover",
                FOCUS_RING_CLASS,
              )}
            >
              {entry.isActive && (
                <span
                  className="absolute inset-x-2 top-0 h-0.5 rounded-full"
                  style={{ backgroundColor: activeColor }}
                  aria-hidden="true"
                />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              <span
                className={cn(
                  "overflow-hidden whitespace-nowrap uppercase tracking-wide transition-all duration-200",
                  entry.isActive
                    ? "max-w-24 opacity-100"
                    : "max-w-0 opacity-0 group-hover:max-w-24 group-hover:opacity-100",
                )}
              >
                {entry.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleTerminalClick}
        title="Terminal"
        aria-label="Terminal"
        className={cn(
          "group flex items-center gap-1.5 rounded-md px-3 py-1.5 text-terminal-green transition-colors duration-150 hover:bg-surface-hover",
          FOCUS_RING_CLASS,
        )}
      >
        <TerminalIcon className="h-4 w-4 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap uppercase tracking-wide opacity-0 transition-all duration-200 group-hover:max-w-24 group-hover:opacity-100">
          Terminal
        </span>
      </button>
    </div>
  );
}
