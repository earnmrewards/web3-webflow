import { useEffect } from "react";
import { useStore } from "../../hooks/use-store";

const COMPONENT_ID = "web3-success-container";

export function SuccessModal() {
  const { getTransactionHash } = useStore();

  useEffect(() => {
    const container = document.getElementById(COMPONENT_ID);
    if (!container) return;

    container.style.display = getTransactionHash() ? "block" : "none";
  }, [getTransactionHash]);

  return null;
}
