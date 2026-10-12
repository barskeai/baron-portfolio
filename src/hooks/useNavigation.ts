import { useNavigate } from "react-router-dom";

import { NAVIGATION_TARGETS } from "@/types/navigation";
import type { AppId } from "@/types/navigation";

export function useNavigation() {
  const navigate = useNavigate();

  function navigateTo(id: AppId) {
    const target = NAVIGATION_TARGETS.find((item) => item.id === id);
    if (target) navigate(target.path);
  }

  function navigateToPath(path: string) {
    navigate(path);
  }

  return { navigateTo, navigateToPath };
}
