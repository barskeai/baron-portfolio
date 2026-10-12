import { AnimatePresence, motion } from "framer-motion";

import { useCursor } from "@/hooks/useCursor";

const BASE_DOT_PX = 8;
const HOVER_RING_PX = 32;
const LOADING_RING_PX = 24;

export function CustomCursor() {
  const { x, y, cursorMode } = useCursor();

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 select-none"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terminal-green"
        animate={{
          width: cursorMode === "idle" ? BASE_DOT_PX : BASE_DOT_PX * 0.6,
          height: cursorMode === "idle" ? BASE_DOT_PX : BASE_DOT_PX * 0.6,
          opacity: cursorMode === "loading" ? 0 : cursorMode === "hover" ? 1 : 0.9,
          boxShadow: "0 0 6px 1px rgba(124, 255, 107, 0.5)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      <AnimatePresence>
        {cursorMode === "hover" && (
          <motion.div
            key="hover-ring"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-terminal-green"
            style={{
              width: HOVER_RING_PX,
              height: HOVER_RING_PX,
              boxShadow: "0 0 14px 2px rgba(124, 255, 107, 0.35)",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
        )}

        {cursorMode === "loading" && (
          <motion.div
            key="loading-ring"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-terminal-green border-t-transparent"
            style={{
              width: LOADING_RING_PX,
              height: LOADING_RING_PX,
              boxShadow: "0 0 10px 2px rgba(124, 255, 107, 0.4)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              opacity: { duration: 0.15 },
              scale: { duration: 0.15 },
              rotate: { duration: 0.8, ease: "linear", repeat: Infinity },
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
