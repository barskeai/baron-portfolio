import { create } from "zustand";

import type { AppId } from "@/types/navigation";
import type { CursorMode, OSState } from "@/types/os";

export type PortalPhase = "idle" | "closing" | "opening";
export type PortalDirection = "enter" | "exit";

interface PortalTransitionState {
  targetId: AppId | null;
  phase: PortalPhase;
  direction: PortalDirection;
}

interface OSStore {
  systemState: OSState;
  cursorMode: CursorMode;
  terminalOpen: boolean;
  terminalOutputVisible: boolean;
  portalTransition: PortalTransitionState;

  startBoot: () => void;
  startLoading: () => void;
  enterDesktop: () => void;
  setTerminalActive: (active: boolean) => void;
  setCursorMode: (mode: CursorMode) => void;
  showTerminalOutput: () => void;
  hideTerminalOutput: () => void;
  startPortalEnter: (id: AppId) => void;
  startPortalExit: () => void;
  continuePortal: () => void;
  endPortalTransition: () => void;
}

const IDLE_PORTAL_TRANSITION: PortalTransitionState = {
  targetId: null,
  phase: "idle",
  direction: "enter",
};

export const useOSStore = create<OSStore>((set) => ({
  systemState: "BOOT",
  cursorMode: "idle",
  terminalOpen: false,
  terminalOutputVisible: false,
  portalTransition: IDLE_PORTAL_TRANSITION,

  startBoot: () => set({ systemState: "BOOT" }),
  startLoading: () => set({ systemState: "LOADING" }),
  enterDesktop: () => set({ systemState: "DESKTOP" }),
  setTerminalActive: (active) => set({ terminalOpen: active, systemState: active ? "TERMINAL" : "DESKTOP" }),
  setCursorMode: (mode) => set({ cursorMode: mode }),
  showTerminalOutput: () => set({ terminalOutputVisible: true }),
  hideTerminalOutput: () => set({ terminalOutputVisible: false }),

  startPortalEnter: (id) =>
    set({ portalTransition: { targetId: id, phase: "closing", direction: "enter" } }),

  startPortalExit: () =>
    set({ portalTransition: { targetId: null, phase: "closing", direction: "exit" } }),

  continuePortal: () => set((state) => ({ portalTransition: { ...state.portalTransition, phase: "opening" } })),

  endPortalTransition: () => set({ portalTransition: IDLE_PORTAL_TRANSITION }),
}));
