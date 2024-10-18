import { useEffect } from "react";
import { FIXED_SMART_NODES_VALUE, SOLD_OUT_CONTAINER_ID } from "./config";
import { usePartner } from "@/contexts/use-partner";
import { SMART_NODES_TIERS_VALUE } from "../config";

export function SoldOutContainer() {
  const { data, loading } = usePartner();

  function handleVisibility() {
    const container = document.getElementById(SOLD_OUT_CONTAINER_ID);
    if (!container) return;

    const shouldShow = !loading && data && data.availableSmartNodes <= 0;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(handleVisibility, [data, loading]);

  function handleOriginalValue() {
    const tierLabel = document.querySelector(".tier-letter") as HTMLSpanElement;
    let tier = "S";
    if (tierLabel) {
      tier = tierLabel.innerText;
    }

    const availableTiers = Object.keys(SMART_NODES_TIERS_VALUE);
    const priceKey = !availableTiers.includes(tier) ? availableTiers[0] : tier;
    const priceValue = SMART_NODES_TIERS_VALUE[priceKey];

    const label = document.getElementById(FIXED_SMART_NODES_VALUE);
    if (!label) return;

    label.innerText = `$${priceValue}`;
  }
  useEffect(handleOriginalValue, []);

  return null;
}
