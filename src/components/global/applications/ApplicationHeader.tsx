import { ScrambleText } from "@/components/global/ascii/ScrambleText";
import { ApplicationBreadcrumb } from "@/components/global/applications/ApplicationBreadcrumb";
import { BackButton } from "@/components/global/applications/BackButton";
import { APP_CONTAINER_CLASS, SHELL_PADDING_X } from "@/lib/layoutTokens";
import { cn } from "@/lib/utils";
import { APPLICATION_META } from "@/types/applications";
import { NAVIGATION_ACCENTS, NAVIGATION_ICONS } from "@/types/navigation";
import type { AppId } from "@/types/navigation";

interface ApplicationHeaderProps {
  appId: AppId;
}

export function ApplicationHeader({ appId }: ApplicationHeaderProps) {
  const meta = APPLICATION_META[appId];
  const Icon = NAVIGATION_ICONS[appId];
  const accent = NAVIGATION_ACCENTS[appId];

  return (
    <header className={cn("border-b border-border py-4", SHELL_PADDING_X)}>
      <div className={cn(APP_CONTAINER_CLASS, "flex flex-col gap-3")}>
        <ApplicationBreadcrumb appId={appId} />
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <BackButton />
            <Icon className="h-4 w-4 shrink-0" style={{ color: accent }} />
            <ScrambleText text={meta.exeTitle} durationMs={700} className="truncate text-lg text-text-primary" />
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
            {meta.theme}
          </span>
        </div>
      </div>
    </header>
  );
}
