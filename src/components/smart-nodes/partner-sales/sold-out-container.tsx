import { useEffect } from "react";
import { LOADER_CONTAINER_ID, SOLD_OUT_CONTAINER_ID } from "./config";
import { usePartner } from "@/contexts/use-partner";

export function SoldOutContainer() {
  const { data, loading } = usePartner();

  function handleVisibility() {
    const container = document.getElementById(SOLD_OUT_CONTAINER_ID);
    if (!container) return;

    const shouldShow = !loading && data && data.availableSmartNodes <= 0;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(handleVisibility, [data, loading]);

  function handleLoaderVisibility() {
    const container = document.getElementById(LOADER_CONTAINER_ID);
    if (!container) return;

    container.style.display = loading ? "block" : "none";
  }
  useEffect(handleLoaderVisibility, [loading]);

  return null;
}
