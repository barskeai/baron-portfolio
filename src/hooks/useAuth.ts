import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

import { useNavigation } from "@/hooks/useNavigation";
import { FUN_LOGIN_PASSWORD, signInWithGoogleAndVerify, subscribeToAuthState } from "@/services/auth";
import { useOSStore } from "@/store/osStore";

export function useAuth() {
  const { navigateToPath } = useNavigation();
  const setCursorMode = useOSStore((state) => state.setCursorMode);

  async function attemptLogin(password: string): Promise<string[]> {
    if (password !== FUN_LOGIN_PASSWORD) {
      return ["Access denied.", "", "Nice try."];
    }

    setCursorMode("loading");
    try {
      const result = await signInWithGoogleAndVerify();

      if (result.ok) {
        navigateToPath("/admin");
        return ["Access granted.", "Welcome back, Baron."];
      }

      if (result.reason === "cancelled") {
        return ["Sign-in cancelled."];
      }
      if (result.reason === "unauthorized") {
        return ["Access denied.", "That account isn't authorized for admin access."];
      }
      return ["Sign-in failed. Try again."];
    } finally {
      setCursorMode("idle");
    }
  }

  return { attemptLogin };
}

export function useAuthUser(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
}
