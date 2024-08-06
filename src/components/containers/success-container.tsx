import { useEffect } from "react";
import { useStore } from "../../contexts/use-store";

const COMPONENT_ID = "web3-success-container";

export function SuccessContainer() {
  const { getTransactionHash } = useStore();

  useEffect(() => {
    const container = document.getElementById(COMPONENT_ID);
    if (!container) return;

    container.style.display = getTransactionHash() ? "block" : "none";
  }, [getTransactionHash]);

  return null;
}
