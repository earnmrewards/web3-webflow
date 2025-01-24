import { useUser } from "@account-kit/react";
import { STAKING_CONTAINER_ID } from "./config";
import { useEffect } from "react";

export function StakingContainer() {
  const user = useUser();

  function changeVisibility() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    container.style.display = user ? "block" : "none";
  }
  useEffect(changeVisibility, [user]);

  return null;
}
