import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

import { ScrambleText } from "@/components/global/ascii/ScrambleText";
import { GLITCH_DURATION_MS, glitchAnimate, glitchTransition } from "@/lib/glitchMotion";

interface GlitchTextProps {
  text: string;
  glitching: boolean;
  className?: string;
  style?: CSSProperties;
}

export function GlitchText({ text, glitching, className, style }: GlitchTextProps) {
  const [playCount, setPlayCount] = useState(0);
  const wasGlitching = useRef(false);

  useEffect(() => {
    if (glitching && !wasGlitching.current) {
      setPlayCount((count) => count + 1);
    }
    wasGlitching.current = glitching;
  }, [glitching]);

  return (
    <motion.span key={playCount} animate={glitching ? glitchAnimate : undefined} transition={glitchTransition}>
      <ScrambleText text={text} durationMs={GLITCH_DURATION_MS} style={style} className={className} />
    </motion.span>
  );
}
