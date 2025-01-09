import { isInsufficientFundsError } from "@/errors/is-insufficient-funds-error";
import { isRejectedError } from "@/errors/is-rejected-error";
import { polygonAmoy } from "@account-kit/infra";
import { useChain } from "@account-kit/react";
import { useState } from "react";

export function useTokenExchange() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setChain } = useChain();

  async function trigger() {
    setLoading(true);

    try {
      setChain({ chain: polygonAmoy });

      // rest of the process
    } catch (error) {
      if (isInsufficientFundsError(error)) {
        setError(
          "Oops! You do not have sufficient funds to complete your purchase."
        );
      } else if (isRejectedError(error)) {
        setError("Oops! Looks like you rejected the transaction signature.");
      } else {
        setError(
          "Oops! Looks like an error occurred while trying to complete your purchase."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return { trigger, loading, error };
}
