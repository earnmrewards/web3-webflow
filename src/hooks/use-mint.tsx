import {
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { z } from "zod";
import {
  encodeFunctionData,
  EstimateGasExecutionError,
  RpcRequestError,
  TransactionExecutionError,
} from "viem";
import { CONTRACT_ADDRESS } from "../config/contract";
import { abi } from "../config/abi";
import { storeUserData } from "../actions/store-user-data";
import { parseEther } from "ethers";
import { useState } from "react";
import { useStore } from "../contexts/use-store";

const mintSchema = z.object({
  amount: z.number().positive().min(1).max(10),
  code: z.string().min(1),
  email: z.string().email(),
});

type MintType = z.infer<typeof mintSchema>;

export function useMint({ amount, code, email }: MintType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { storeTransactionHash } = useStore();

  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const { sendUserOperationAsync } = useSendUserOperation({
    client,
    onSuccess: ({ hash }) => storeTransactionHash(hash),
  });

  function isInsufficientFundsError(error: unknown) {
    if (error instanceof EstimateGasExecutionError) return true;
    if (error instanceof RpcRequestError) {
      // Only for Alchemy Provider
      const gasFunctionName = "eth_estimateUserOperationGas";
      const foundFunctionInMessages = error.metaMessages?.find((message) =>
        message.includes(gasFunctionName)
      );
      return foundFunctionInMessages;
    }

    return false;
  }

  function isRejectedError(error: unknown) {
    if (error instanceof TransactionExecutionError) {
      const rejectedArg = "rejected";
      const foundRejectedMessage = error.shortMessage.includes(rejectedArg);
      return foundRejectedMessage;
    }

    return false;
  }

  async function mint(event: Event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const params = new URL(window.location.href).searchParams;
    const testSuccessModalOption = params.get("testSuccessModalOption");
    if (testSuccessModalOption) {
      setTimeout(() => {
        storeTransactionHash("0x123");
        setLoading(false);
      }, 3 * 1000);
      return;
    }

    try {
      await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "mint",
            args: [1],
          }),
          value: parseEther("0.14"),
        },
      });

      storeUserData(amount, code, email);
    } catch (error) {
      if (isInsufficientFundsError(error)) {
        setError(
          "Oops! You do not have sufficient funds to complete your purchase."
        );
        return;
      } else if (isRejectedError(error)) {
        setError("Oops! Looks like you rejected the transaction signature.");
        return;
      }

      setError(
        "Oops! Looks like an error occurred while trying to complete your purchase."
      );
    } finally {
      setLoading(false);
    }
  }

  return { mint, loading, error };
}
