import { usePartner } from "@/contexts/use-partner";
import { useEffect } from "react";
import { LOADER_CONTAINER_ID } from "./config";

export function LoaderContainer() {
  const { loading } = usePartner();

  function handleVisibility() {
    const container = document.getElementById(LOADER_CONTAINER_ID);
    if (!container) return;

    container.style.display = loading ? "block" : "none";
  }
  useEffect(handleVisibility, [loading]);

  return null;
}
