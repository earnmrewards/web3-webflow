import { useEffect } from "react";
import { LOG_IN_CONTAINER_ID } from "./config";
import { useUser } from "@account-kit/react";

export function LogInContainer() {
  const user = useUser();

  function changeVisibility() {
    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    if (!container) return;

    container.style.display = user ? "none" : "block";
  }
  useEffect(changeVisibility, [user]);

  return null;
}
