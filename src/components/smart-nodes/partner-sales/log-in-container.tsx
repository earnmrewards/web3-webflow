import { useUser } from "@account-kit/react";
import { LOG_IN_CONTAINER_ID } from "../config";
import { useEffect } from "react";
import { usePartner } from "@/contexts/use-partner";

export function LogIn() {
  const user = useUser();
  const { data, loading } = usePartner();

  function changeVisibility() {
    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    if (!container) return;

    const shouldShow =
      !user && !loading && data && data.availableSmartNodes > 0;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeVisibility, [user, data, loading]);

  return null;
}
