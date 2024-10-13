import { useEffect, useState } from "react";
import { SOLD_OUT_CONTAINER_ID } from "./config";
import { getPartnerData } from "@/actions/get-partner-data";

export function SoldOutContainer() {
  const [hasAvailableSN, setHasAvailableSN] = useState(true);
  // TODO: Add a loader container

  function fetchPartnerData() {
    const [partnerId] = window.location.pathname
      .split("/")
      .filter((path) => path.length > 0);
    if (!partnerId) return;

    (async () => {
      const data = await getPartnerData(partnerId);
      setHasAvailableSN(data.remainingAmount > 0);
    })();
  }
  useEffect(fetchPartnerData, []);

  function handleVisibility() {
    const container = document.getElementById(SOLD_OUT_CONTAINER_ID);
    if (!container) return;

    container.style.display = !hasAvailableSN ? "block" : "none";
  }
  useEffect(handleVisibility, [hasAvailableSN]);

  return null;
}
