import { collection, limit, onSnapshot, orderBy, query, type Unsubscribe } from "firebase/firestore";

import { db } from "@/config/firebase";

// Expected Firestore schema (design the collections to match these fields):
// projects/{id}       — { title: string, createdAt: Timestamp, ... }
// certifications/{id} — { title: string, ... } (only the doc count is used here)

export function subscribeLatestProjectTitle(
  onData: (title: string | null) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  const latestProjectQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"), limit(1));

  return onSnapshot(
    latestProjectQuery,
    (snapshot) => {
      const latest = snapshot.docs[0];
      onData(latest ? ((latest.data().title as string | undefined) ?? null) : null);
    },
    onError,
  );
}

export function subscribeCertificationCount(
  onData: (count: number | null) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, "certifications"),
    (snapshot) => onData(snapshot.size > 0 ? snapshot.size : null),
    onError,
  );
}
