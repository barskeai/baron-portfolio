import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type Unsubscribe,
  type User,
} from "firebase/auth";

import { auth } from "@/config/firebase";

// Baron's own public email — not sensitive. The real access gate is this
// equality check after Google sign-in, not the fun terminal password prompt.
export const ALLOWED_ADMIN_EMAIL = "baronmiguel0522@gmail.com";

// Flavor gate for the `login` easter egg — ships in the JS bundle, so it has
// no real security value. Access control happens via Google sign-in below.
export const FUN_LOGIN_PASSWORD = "reveal-dreams";

const googleProvider = new GoogleAuthProvider();

export type SignInResult =
  | { ok: true; user: User }
  | { ok: false; reason: "unauthorized" | "cancelled" | "error" };

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  return email === ALLOWED_ADMIN_EMAIL;
}

export async function signInWithGoogleAndVerify(): Promise<SignInResult> {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    if (!isAllowedAdminEmail(result.user.email)) {
      await signOut(auth);
      return { ok: false, reason: "unauthorized" };
    }

    return { ok: true, user: result.user };
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      return { ok: false, reason: "cancelled" };
    }
    return { ok: false, reason: "error" };
  }
}

export function subscribeToAuthState(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}
