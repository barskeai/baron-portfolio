import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { ScrambleText } from "@/components/global/ascii/ScrambleText";

function NotFoundPage() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <ScrambleText text="404 :: SIGNAL_LOST" durationMs={700} className="text-2xl text-terminal-green" />
      <p className="max-w-sm font-mono text-sm text-text-secondary">
        This path does not exist in BARON.OS. The route may have been moved or was never compiled.
      </p>
      <Link
        to="/"
        className="mt-2 flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Return to Desktop
      </Link>
    </div>
  );
}

export default NotFoundPage;
