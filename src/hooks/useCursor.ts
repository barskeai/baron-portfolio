import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

import { useOSStore } from "@/store/osStore";

export function useCursor() {
  const cursorMode = useOSStore((state) => state.cursorMode);
  const setCursorMode = useOSStore((state) => state.setCursorMode);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    function handleOver(event: MouseEvent) {
      if (useOSStore.getState().cursorMode === "loading") return;

      const target = event.target as HTMLElement;
      const isInteractive = Boolean(target.closest("a, button, [role='button'], input, [data-cursor-hover]"));
      setCursorMode(isInteractive ? "hover" : "idle");
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [x, y, setCursorMode]);

  return { x: springX, y: springY, cursorMode };
}
