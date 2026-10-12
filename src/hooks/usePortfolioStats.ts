import { useEffect, useState } from "react";

import { subscribeCertificationCount, subscribeLatestProjectTitle } from "@/services/portfolioStats";

export type StatState<T> = { status: "loading" } | { status: "unavailable" } | { status: "ready"; value: T };

function useStat<T>(
  subscribe: (onData: (value: T | null) => void, onError: (error: unknown) => void) => () => void,
): StatState<T> {
  const [state, setState] = useState<StatState<T>>({ status: "loading" });

  useEffect(() => {
    return subscribe(
      (value) => setState(value === null ? { status: "unavailable" } : { status: "ready", value }),
      () => setState({ status: "unavailable" }),
    );
  }, [subscribe]);

  return state;
}

export function usePortfolioStats() {
  const latestProject = useStat<string>(subscribeLatestProjectTitle);
  const certificationCount = useStat<number>(subscribeCertificationCount);

  return { latestProject, certificationCount };
}
