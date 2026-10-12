import type { ReactNode } from "react";

import { ApplicationHeader } from "@/components/global/applications/ApplicationHeader";
import { ApplicationTransition } from "@/components/global/applications/ApplicationTransition";
import { APP_CONTAINER_CLASS, SHELL_PADDING_X } from "@/lib/layoutTokens";
import { cn } from "@/lib/utils";
import type { AppId } from "@/types/navigation";

interface ApplicationLayoutProps {
  appId: AppId;
  children: ReactNode;
}

export function ApplicationLayout({ appId, children }: ApplicationLayoutProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background text-foreground">
      <ApplicationHeader appId={appId} />

      <ApplicationTransition>
        <main
          className={cn(
            APP_CONTAINER_CLASS,
            SHELL_PADDING_X,
            "themed-scrollbar flex-1 overflow-y-auto py-10",
          )}
        >
          {children}
        </main>
      </ApplicationTransition>
    </div>
  );
}
