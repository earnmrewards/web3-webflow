import { usePartner } from "@/contexts/use-partner";
import { NOT_FOUND_CONTAINER_ID } from "./config";
import { useEffect } from "react";

export function NotFoundContainer() {
  const { data, loading } = usePartner();

  function handleVisibility() {
    const container = document.getElementById(NOT_FOUND_CONTAINER_ID);
    if (!container) return;

    const shouldShow = !loading && data === null;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(handleVisibility, [data, loading]);

  return null;
}
