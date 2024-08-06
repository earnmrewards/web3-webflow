import { useEffect } from "react";
import { useStore } from "../../contexts/use-store";

const COMPONENT_ID = "web3-transaction-hash";

export function SuccessfullyTransactionHash() {
  const { getTransactionHash } = useStore();

  useEffect(() => {
    const textField = document.getElementById(COMPONENT_ID);
    if (!textField) return;

    textField.style.display = getTransactionHash() ? "block" : "none";

    textField.textContent = getTransactionHash() || "...";
  }, [getTransactionHash]);

  return null;
}
