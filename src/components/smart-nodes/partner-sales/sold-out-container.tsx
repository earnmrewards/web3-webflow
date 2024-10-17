import { useEffect } from "react";
import { SOLD_OUT_CONTAINER_ID } from "./config";
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

  return null;
}
