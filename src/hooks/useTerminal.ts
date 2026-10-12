import { useCallback, useRef, useState } from "react";

import { runCommand } from "@/components/global/terminal/commands";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";

export interface HistoryEntry {
  id: number;
  command: string;
  output: string[];
}

export type PendingPrompt = "password" | null;

export function useTerminal() {
  const { navigateTo } = useNavigation();
  const { attemptLogin } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [pendingPrompt, setPendingPrompt] = useState<PendingPrompt>(null);
  const idRef = useRef(0);

  const clear = useCallback(() => setHistory([]), []);

  const requestPassword = useCallback(() => setPendingPrompt("password"), []);

  const updateHistoryOutput = useCallback((id: number, output: string[]) => {
    setHistory((entries) => entries.map((entry) => (entry.id === id ? { ...entry, output } : entry)));
  }, []);

  const execute = useCallback(
    (rawInput: string) => {
      const input = rawInput.trim();
      if (!input) return;

      if (pendingPrompt === "password") {
        setPendingPrompt(null);
        idRef.current += 1;
        const id = idRef.current;
        setHistory((entries) => [...entries, { id, command: "••••••••", output: ["Authenticating..."] }]);

        void attemptLogin(input).then((output) => updateHistoryOutput(id, output));
        return;
      }

      setCommandLog((log) => [...log, input]);

      const output = runCommand(input, { navigateTo, clear, requestPassword });
      idRef.current += 1;
      setHistory((entries) => [...entries, { id: idRef.current, command: input, output }]);
    },
    [navigateTo, clear, requestPassword, pendingPrompt, attemptLogin, updateHistoryOutput],
  );

  return { history, commandLog, pendingPrompt, execute };
}
