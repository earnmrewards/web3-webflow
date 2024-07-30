import { useEffect } from "react";

const COMPONENT_ID = "web3-transaction-hash";

export function SuccessfullyTransactionHash() {
  useEffect(() => {
    const textField = document.getElementById(COMPONENT_ID);
    if (!textField) return;

    const searchParams = new URL(window.location.href).searchParams;
    const transactionHash = searchParams.get("txHash");

    textField.textContent = transactionHash || "Not found";
  }, []);

  return null;
}
