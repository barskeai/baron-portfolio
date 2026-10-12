import { ScrambleText } from "@/components/global/ascii/ScrambleText";
import { cn } from "@/lib/utils";

export const BARON_OS_LOGO = 
` ██████╗  █████╗ ██████╗  ██████╗ ███╗   ██╗    ██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██╔═══██╗████╗  ██║   ██╔═══██╗██╔════╝
 ██████╔╝███████║██████╔╝██║   ██║██╔██╗ ██║   ██║   ██║███████╗
 ██╔══██╗██╔══██║██╔══██╗██║   ██║██║╚██╗██║   ██║   ██║╚════██║
 ██████╔╝██║  ██║██║  ██║╚██████╔╝██║ ╚████║██╗╚██████╔╝███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚══════╝`;

interface AsciiLogoProps {
  className?: string;
  animated?: boolean;
  durationMs?: number;
  onRevealComplete?: () => void;
}

export function AsciiLogo({ className, animated = false, durationMs = 1400, onRevealComplete }: AsciiLogoProps) {
  const style = { fontSize: "clamp(0.25rem, 1.8vw, 0.95rem)" };
  const logoClassName = cn("m-0 w-fit select-none whitespace-pre font-mono text-terminal-green", className);

  return (
    <div className="max-w-full overflow-x-auto">
      {animated ? (
        <ScrambleText
          text={BARON_OS_LOGO}
          durationMs={durationMs}
          onComplete={onRevealComplete}
          className={logoClassName}
          style={style}
        />
      ) : (
        <pre className={logoClassName} style={style}>
          {BARON_OS_LOGO}
        </pre>
      )}
    </div>
  );
}
