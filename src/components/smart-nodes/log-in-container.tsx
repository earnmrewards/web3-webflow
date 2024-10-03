import { useEffect } from "react";
import { LOG_IN_CONTAINER_ID, STORAGE_KEY } from "./config";
import { useUser } from "@account-kit/react";
import { useStore } from "../../contexts/use-store";

export function LogInContainer() {
  const user = useUser();
  const store = useStore();

  function changeVisibility() {
    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    if (!container) return;

    const storedEmail = store.get(STORAGE_KEY);
    const shouldShow = !user && storedEmail;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeVisibility, [user, store]);

  return null;
}
