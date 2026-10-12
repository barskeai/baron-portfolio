import { usePortalTransition } from "@/hooks/usePortalTransition";
import { NAVIGATION_TARGETS } from "@/types/navigation";
import type { AppId } from "@/types/navigation";

interface ApplicationBreadcrumbProps {
  appId: AppId;
}

export function ApplicationBreadcrumb({ appId }: ApplicationBreadcrumbProps) {
  const { beginReturnTransition } = usePortalTransition();
  const target = NAVIGATION_TARGETS.find((item) => item.id === appId);

  return (
    <p className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
      <span className="text-text-secondary">BARON.OS</span>
      <span aria-hidden="true">—</span>
      <button
        type="button"
        onClick={() => beginReturnTransition()}
        className="rounded-sm transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Home
      </button>
      <span aria-hidden="true">&gt;</span>
      <span className="text-text-secondary">{target?.label}</span>
    </p>
  );
}
