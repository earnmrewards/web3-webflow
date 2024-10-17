import { useUser } from "@account-kit/react";
import { LOG_IN_CONTAINER_ID, STORAGE_KEY } from "../config";
import { useEffect } from "react";
import { usePartner } from "@/contexts/use-partner";
import { useStore } from "@/contexts/use-store";

export function LogInContainer() {
  const user = useUser();
  const store = useStore();
  const { data, loading } = usePartner();

  function changeVisibility() {
    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    if (!container) return;

    const storedEmail = store.get(STORAGE_KEY);
    const shouldShow =
      !user && storedEmail && !loading && data && data.availableSmartNodes > 0;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeVisibility, [user, data, loading, store]);

  return null;
}
