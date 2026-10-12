import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { usePortfolioStats, type StatState } from "@/hooks/usePortfolioStats";

const BAR_WIDTH = 10;
const BLOCK_WIDTH = 3;
const BAR_FRAME_MS = 90;

function LoadingBar() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % (BAR_WIDTH + BLOCK_WIDTH)), BAR_FRAME_MS);
    return () => clearInterval(id);
  }, []);

  const bar = Array.from({ length: BAR_WIDTH }, (_, i) => (i >= frame - BLOCK_WIDTH && i < frame ? "▓" : "░")).join("");
  return <span className="text-terminal-green/50">[{bar}]</span>;
}

const NOISE_CHARSET = "█▓▒░╬╫╪┼╳";
const NOISE_WIDTH = 8;
const NOISE_FRAME_MS = 120;

function randomNoise() {
  return Array.from({ length: NOISE_WIDTH }, () => NOISE_CHARSET[Math.floor(Math.random() * NOISE_CHARSET.length)]).join(
    "",
  );
}

function NoiseText() {
  const [text, setText] = useState(randomNoise);

  useEffect(() => {
    const id = setInterval(() => setText(randomNoise()), NOISE_FRAME_MS);
    return () => clearInterval(id);
  }, []);

  return <span className="text-text-muted">{text}</span>;
}

interface KpiRowProps {
  label: string;
  state: StatState<string>;
}

function KpiRow({ label, state }: KpiRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="uppercase tracking-wide text-text-muted">{label}:</span>
      {state.status === "loading" && <LoadingBar />}
      {state.status === "unavailable" && <NoiseText />}
      {state.status === "ready" && <span className="text-terminal-green">{state.value}</span>}
    </div>
  );
}

export function KpiStrip() {
  const { latestProject, certificationCount } = usePortfolioStats();

  const certificationState: StatState<string> =
    certificationCount.status === "ready"
      ? { status: "ready", value: String(certificationCount.value) }
      : certificationCount;

  return (
    <div className="flex flex-col gap-1.5 font-mono text-xs">
      <div className="flex items-center gap-2 text-terminal-green">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-terminal-green"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="uppercase tracking-wide">Status: Online</span>
      </div>

      <KpiRow label="Latest Project" state={latestProject} />
      <KpiRow label="Certifications" state={certificationState} />
    </div>
  );
}
