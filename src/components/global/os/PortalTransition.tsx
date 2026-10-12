import { useEffect } from "react";

import { useNavigation } from "@/hooks/useNavigation";
import { CARD_EXIT_DURATION_MS, PAGE_ENTER_SETTLE_MS } from "@/lib/glitchMotion";
import { useOSStore } from "@/store/osStore";

// Pure sequencer: no visual of its own. NavigationPanel handles the
// pop-out/scramble on exit and the destination page handles its own
// scramble/pop-in on enter — this just times the route swap between them.
export function PortalTransition() {
  const { targetId, phase, direction } = useOSStore((state) => state.portalTransition);
  const continuePortal = useOSStore((state) => state.continuePortal);
  const endPortalTransition = useOSStore((state) => state.endPortalTransition);
  const setCursorMode = useOSStore((state) => state.setCursorMode);
  const { navigateTo, navigateToPath } = useNavigation();

  useEffect(() => {
    if (phase === "closing") {
      const timer = setTimeout(() => {
        if (direction === "enter") {
          if (targetId) navigateTo(targetId);
        } else {
          navigateToPath("/");
        }
        continuePortal();
      }, CARD_EXIT_DURATION_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "opening") {
      const timer = setTimeout(() => {
        endPortalTransition();
        setCursorMode("idle");
      }, PAGE_ENTER_SETTLE_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, direction, targetId, navigateTo, navigateToPath, continuePortal, endPortalTransition, setCursorMode]);

  return null;
}
