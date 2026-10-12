import { GlitchText } from "@/components/global/ascii/GlitchText";
import { NAV_ART_IMAGES } from "@/data/navArtImages";
import { NAV_TAGS } from "@/data/navTags";
import { cn, hexToRgba } from "@/lib/utils";
import { NAVIGATION_ICONS } from "@/types/navigation";
import type { AppId } from "@/types/navigation";

interface NavCardArtProps {
  id: AppId;
  accentHex: string;
  className?: string;
  glitching?: boolean;
}

export function NavCardArt({ id, accentHex, className, glitching = false }: NavCardArtProps) {
  const Icon = NAVIGATION_ICONS[id];

  return (
    <div className={cn("relative select-none", className)}>
      <img
        src={NAV_ART_IMAGES[id]}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-30 grayscale"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundColor: accentHex, mixBlendMode: "color", opacity: 0.65 }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundColor: "rgba(11, 15, 20, 0.35)" }} />

      <Icon
        className="h-[clamp(2.5rem,7vw,4rem)] w-[clamp(2.5rem,7vw,4rem)]"
        style={{ color: accentHex, filter: `drop-shadow(0 0 18px ${hexToRgba(accentHex, 0.55)})` }}
      />

      <GlitchText
        text={NAV_TAGS[id]}
        glitching={glitching}
        style={{ color: accentHex }}
        className="text-[clamp(0.5rem,1.2vw,0.65rem)] opacity-70"
      />
    </div>
  );
}
