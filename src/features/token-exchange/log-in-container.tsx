import { useUser } from "@account-kit/react";
import { LOG_IN_CONTAINER_ID } from "./config";
import { useEffect } from "react";

export function LogInContainer() {
  const user = useUser();

  function changeVisibility() {
    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    if (!container) return;

    container.style.display = !user ? "block" : "none";
  }
  useEffect(changeVisibility, [user]);

  return null;
}
