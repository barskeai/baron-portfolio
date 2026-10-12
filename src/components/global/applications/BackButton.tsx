import { ArrowLeft } from "lucide-react";

import { usePortalTransition } from "@/hooks/usePortalTransition";

export function BackButton() {
  const { beginReturnTransition } = usePortalTransition();

  return (
    <button
      type="button"
      onClick={() => beginReturnTransition()}
      aria-label="Back to desktop"
      className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Desktop
    </button>
  );
}
