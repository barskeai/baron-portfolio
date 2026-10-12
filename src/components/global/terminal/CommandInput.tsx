import { useState, type KeyboardEvent } from "react";

export const TERMINAL_INPUT_ID = "terminal-command-input";

interface CommandInputProps {
  commandLog: string[];
  masked?: boolean;
  onExecute: (command: string) => void;
  onFocusChange?: (active: boolean) => void;
  onCollapseOutput?: () => void;
}

export function CommandInput({ commandLog, masked = false, onExecute, onFocusChange, onCollapseOutput }: CommandInputProps) {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      onCollapseOutput?.();
      return;
    }

    if (event.key === "Enter") {
      onExecute(value);
      setValue("");
      setHistoryIndex(null);
      return;
    }

    if (masked) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandLog.length === 0) return;
      const nextIndex = historyIndex === null ? commandLog.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(commandLog[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandLog.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(nextIndex);
        setValue(commandLog[nextIndex]);
      }
    }
  }

  return (
    <div className="flex items-center gap-2 py-2 font-mono text-sm">
      <span className="text-terminal-green">{masked ? "password:" : "baron@os:~$"}</span>
      <input
        id={TERMINAL_INPUT_ID}
        type={masked ? "password" : "text"}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => onFocusChange?.(true)}
        onBlur={() => onFocusChange?.(false)}
        spellCheck={false}
        autoComplete="off"
        placeholder={masked ? "" : "Type help for a list of commands..."}
        aria-label={masked ? "Password input" : "Terminal command input"}
        className="flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-muted"
      />
    </div>
  );
}
