import { useEffect, useState } from "react";
import { motion, type Transition } from "framer-motion";

import { NavCardArt } from "@/components/public/home/NavCardArt";
import { GlitchText } from "@/components/global/ascii/GlitchText";
import { usePortalTransition } from "@/hooks/usePortalTransition";
import { CARD_BOOT_DURATION_MS, CARD_POP_STAGGER_MS, GLITCH_DURATION_MS } from "@/lib/glitchMotion";
import { hexToRgba } from "@/lib/utils";
import { NAVIGATION_ACCENTS } from "@/types/navigation";
import type { NavigationTarget } from "@/types/navigation";

// Magnitude tables indexed by |offset| from the center card (0, 1, 2 positions out).
const ROTATE_Y_DEG = [0, 18, 24];
const TRANSLATE_Z_PX = [36, -24, -64];
const SCALE = [1.08, 0.94, 0.86];
const HOVER_Z_BOOST_PX = 50;
const FLOAT_AMPLITUDE_PX = 6;
const CARD_BOOT_DURATION_S = CARD_BOOT_DURATION_MS / 1000;

const BOOT_TIMES = [0, 0.18, 0.4, 0.7, 1];

export type NavigationCardVisualState = "idle" | "selected" | "dimmed";

interface NavigationPanelProps {
  target: NavigationTarget;
  index: number;
  offset: number;
  portalState: NavigationCardVisualState;
}

export function NavigationPanel({ target, index, offset, portalState }: NavigationPanelProps) {
  const { beginTransition } = usePortalTransition();
  const accentHex = NAVIGATION_ACCENTS[target.id];
  const [hovered, setHovered] = useState(false);
  const [entryPhase, setEntryPhase] = useState<"hidden" | "booting" | "ready">("hidden");
  const [justMounted, setJustMounted] = useState(false);

  const magnitude = Math.min(Math.abs(offset), ROTATE_Y_DEG.length - 1);
  const rotateY = offset === 0 ? 0 : -Math.sign(offset) * ROTATE_Y_DEG[magnitude];
  const baseZ = TRANSLATE_Z_PX[magnitude];
  const baseScale = SCALE[magnitude];
  const floatDuration = 3.2 + magnitude * 0.5;
  const floatDelay = index * 0.25;
  const idleBoxShadow = `0 20px 45px rgba(0,0,0,0.4), 0 0 24px ${hexToRgba(accentHex, 0.18)}`;
  const idleBorderColor = "rgba(255, 255, 255, 0.08)";

  // Stagger each card's CRT boot-in on mount (first load, or returning from
  // an app) and pulse a glitch through its label while it settles.
  useEffect(() => {
    const revealDelayMs = (index - 1) * CARD_POP_STAGGER_MS;
    const revealTimer = setTimeout(() => {
      setEntryPhase("booting");
      setJustMounted(true);
    }, revealDelayMs);
    const glitchTimer = setTimeout(() => setJustMounted(false), revealDelayMs + GLITCH_DURATION_MS);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(glitchTimer);
    };
  }, [index]);

  // No exit animation: while a portal transition is underway the card just
  // holds its idle look (never re-enters "hover") until the route swaps.
  const visualState =
    entryPhase !== "ready" ? entryPhase : hovered && portalState === "idle" ? "hover" : "idle";
  const glitching = justMounted || hovered || portalState !== "idle";

  function handleClick() {
    if (portalState !== "idle") return;
    beginTransition(target.id);
  }

  function handleAnimationComplete() {
    if (entryPhase === "booting") setEntryPhase("ready");
  }

  const animateTarget =
    visualState === "hover"
      ? {
          y: 0,
          z: baseZ + HOVER_Z_BOOST_PX,
          scaleX: baseScale * 1.06,
          scaleY: baseScale * 1.06,
          rotateY,
          zIndex: 20,
          opacity: 1,
          filter: "brightness(1.18)",
          boxShadow: `0 28px 60px rgba(0,0,0,0.5), 0 0 32px ${hexToRgba(accentHex, 0.4)}`,
          borderColor: hexToRgba(accentHex, 0.4),
        }
      : visualState === "booting"
        ? {
            y: 0,
            z: baseZ,
            scaleX: [0, 0.02, baseScale * 1.04, baseScale * 1.04, baseScale],
            scaleY: [0, 0.02, 0.02, baseScale * 1.04, baseScale],
            rotateY,
            zIndex: 10 - magnitude,
            opacity: [0, 1, 1, 1, 1],
            filter: ["brightness(1)", "brightness(2.4)", "brightness(2.4)", "brightness(1.15)", "brightness(1)"],
            boxShadow: [
              `0 0 0px ${hexToRgba(accentHex, 0)}`,
              `0 0 80px ${hexToRgba(accentHex, 0.8)}`,
              `0 0 120px ${hexToRgba(accentHex, 0.95)}`,
              `0 0 60px ${hexToRgba(accentHex, 0.55)}`,
              idleBoxShadow,
            ],
            borderColor: [
              hexToRgba(accentHex, 0),
              hexToRgba(accentHex, 0.9),
              hexToRgba(accentHex, 0.9),
              hexToRgba(accentHex, 0.5),
              idleBorderColor,
            ],
          }
        : visualState === "hidden"
          ? {
              y: 0,
              z: baseZ,
              scaleX: 0,
              scaleY: 0,
              rotateY,
              zIndex: 10 - magnitude,
              opacity: 0,
              filter: "brightness(1)",
              boxShadow: `0 0 0px ${hexToRgba(accentHex, 0)}`,
              borderColor: hexToRgba(accentHex, 0),
            }
          : {
              y: [0, -FLOAT_AMPLITUDE_PX, 0],
              z: baseZ,
              scaleX: baseScale,
              scaleY: baseScale,
              rotateY,
              zIndex: 10 - magnitude,
              opacity: 1,
              filter: "brightness(1)",
              boxShadow: idleBoxShadow,
              borderColor: idleBorderColor,
            };

  const transitionConfig: Transition =
    visualState === "idle"
      ? {
          y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
          default: { duration: 0.4, ease: "easeOut" },
        }
      : visualState === "booting"
        ? { duration: CARD_BOOT_DURATION_S, ease: "easeOut", times: BOOT_TIMES }
        : visualState === "hidden"
          ? { duration: 0 }
          : { duration: 0.25, ease: "easeOut" };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={animateTarget}
      transition={transitionConfig}
      onAnimationComplete={handleAnimationComplete}
      aria-label={`${target.label} — ${target.description}`}
      className="relative aspect-4/5 min-w-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-window"
    >
      <NavCardArt
        id={target.id}
        accentHex={accentHex}
        glitching={glitching}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to from-background/90 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[clamp(0.5rem,2vw,1rem)]">
        <GlitchText
          text={target.label}
          glitching={glitching}
          className="font-mono text-[clamp(0.65rem,1.6vw,0.9rem)] uppercase tracking-wide text-text-primary"
        />
        <span className="font-mono text-[clamp(0.55rem,1.1vw,0.7rem)] text-text-secondary">
          /{String(index).padStart(2, "0")}
        </span>
      </div>
    </motion.button>
  );
}
