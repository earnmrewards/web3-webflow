import { useEffect } from "react";
import { useStore } from "../../hooks/use-store";

const COMPONENT_ID = "web3-success-modal";

export function SuccessModal() {
  const { getTransactionHash } = useStore();

  useEffect(() => {
    const container = document.getElementById(COMPONENT_ID);
    if (!container) return;

    container.style.display = getTransactionHash() ? "flex" : "none";
  }, [getTransactionHash]);

  return null;
}
