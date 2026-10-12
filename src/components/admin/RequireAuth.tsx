import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { ScrambleText } from "@/components/global/ascii/ScrambleText";
import { useAuthUser } from "@/hooks/useAuth";
import { isAllowedAdminEmail } from "@/services/auth";

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <ScrambleText text="Verifying access..." durationMs={500} className="text-terminal-green" />
      </div>
    );
  }

  if (!isAllowedAdminEmail(user?.email)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
