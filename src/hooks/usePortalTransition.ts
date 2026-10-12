import { useOSStore } from "@/store/osStore";
import type { AppId } from "@/types/navigation";

export function usePortalTransition() {
  const startPortalEnter = useOSStore((state) => state.startPortalEnter);
  const startPortalExit = useOSStore((state) => state.startPortalExit);
  const setCursorMode = useOSStore((state) => state.setCursorMode);

  function beginTransition(id: AppId) {
    setCursorMode("loading");
    startPortalEnter(id);
  }

  function beginReturnTransition() {
    setCursorMode("loading");
    startPortalExit();
  }

  return { beginTransition, beginReturnTransition };
}
