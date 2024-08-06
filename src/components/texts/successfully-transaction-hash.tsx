import { useEffect } from "react";
import { useStore } from "../../hooks/use-store";

const COMPONENT_ID = "web3-transaction-hash";

export function SuccessfullyTransactionHash() {
  const { getTransactionHash } = useStore();

  useEffect(() => {
    const textField = document.getElementById(COMPONENT_ID);
    if (!textField) return;

    const transactionHash = getTransactionHash();
    textField.style.display = transactionHash ? "block" : "none";

    textField.textContent = getTransactionHash() || "...";
  }, [getTransactionHash]);

  return null;
}
