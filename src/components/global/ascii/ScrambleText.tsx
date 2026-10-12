import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  durationMs?: number;
  onComplete?: () => void;
}

const CHARSET = "█▓▒░╬╫╪┼╳";
const FRAME_MS = 40;

function isInk(char: string) {
  return char !== " " && char !== "\n";
}

export function ScrambleText({ text, className, style, durationMs = 900, onComplete }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const totalFrames = Math.max(1, Math.round(durationMs / FRAME_MS));
    const revealFrame = text
      .split("")
      .map((char) => (isInk(char) ? Math.floor(Math.random() * totalFrames) : -1));
    let frame = 0;

    const interval = setInterval(() => {
      frame += 1;

      let next = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        next +=
          !isInk(char) || frame >= revealFrame[i]
            ? char
            : CHARSET[Math.floor(Math.random() * CHARSET.length)];
      }
      setDisplay(next);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(text);
        onCompleteRef.current?.();
      }
    }, FRAME_MS);

    return () => clearInterval(interval);
  }, [text, durationMs]);

  return (
    <pre className={cn("m-0 whitespace-pre font-mono", className)} style={style}>
      {display}
    </pre>
  );
}
