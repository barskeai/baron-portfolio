import { useOSStore } from "@/store/osStore";

export function useOSState() {
  const systemState = useOSStore((state) => state.systemState);
  const terminalOpen = useOSStore((state) => state.terminalOpen);

  const startBoot = useOSStore((state) => state.startBoot);
  const startLoading = useOSStore((state) => state.startLoading);
  const enterDesktop = useOSStore((state) => state.enterDesktop);
  const setTerminalActive = useOSStore((state) => state.setTerminalActive);

  return {
    systemState,
    terminalOpen,
    startBoot,
    startLoading,
    enterDesktop,
    setTerminalActive,
  };
}
