import { useCustomBundler } from "@/hooks/web3/use-custom-bundler";
import {
  useChain,
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { createContext, ReactNode, useContext, useState } from "react";

import { CONTRACT_ADDRESS as SN_CONTRACT_ADDRESS } from "@/config/contracts/smart-nodes";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { abi as nftCollectionAbi } from "@/config/contracts/staking/smart-nodes-collection";
import { encodeFunctionData } from "viem";
import { isInternalError } from "@/errors/is-internal-error";
import { isInsufficientFundsError } from "@/errors/is-insufficient-funds-error";
import { isRejectedError } from "@/errors/is-rejected-error";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { networkDef } from "@/types/network";

type StakeType = "stake" | "unstake" | "claim";

interface ResultType {
  operation: StakeType;
  selectedNodes: number[];
  selectedRewards?: number;
}

interface StakeContextProps {
  stake: (selectedNodes: number[]) => Promise<void>;
  unstake: (selectedNodes: number[]) => Promise<void>;
  claim: (selectedNodes: number[], selectedRewards: number) => Promise<void>;
  error: string;
  finished: boolean;
  loading: boolean;
  result: ResultType | null;
}

const StakeContext = createContext({} as StakeContextProps);

const stakeSchema = z.object({
  selectedNodes: z.array(z.number().positive().int()),
});

const OLD_TOKEN_ADDRESS = import.meta.env.VITE_EARNM_OLD_ETH_ADDRESS;

interface StakeProviderProps {
  children: ReactNode;
}

export function StakeProvider({ children }: StakeProviderProps) {
  const user = useUser();
  const { setChain } = useChain();
  const { client } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({ client });
  const { waitForTransactionReceipt, readContract } = useCustomBundler({
    chain: "arbitrum",
  });
  const queryClient = useQueryClient();

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  function getChain() {
    const { arbitrum } = networkDef;
    const isProduction = import.meta.env.VITE_ENVIRONMENT === "production";

    return isProduction ? arbitrum.mainnet : arbitrum.testnet;
  }

  async function hasValidApproval() {
    if (!user) return false;

    const approval = await readContract({
      address: SN_CONTRACT_ADDRESS,
      abi: nftCollectionAbi,
      functionName: "isApprovedForAll",
      args: [user.address, CONTRACT_ADDRESS],
    });

    return approval as boolean;
  }

  async function stake(selectedNodes: number[]) {
    if (selectedNodes.length === 0 || !user) return;
    setError("");
    setLoading(true);

    const { success } = stakeSchema.safeParse({ selectedNodes });
    if (!success) {
      setError(
        "Oops! Looks like you didn't fill in the number of nodes correctly."
      );
      setLoading(false);
      return;
    }

    setChain({ chain: getChain() });

    const params = new URL(window.location.href).searchParams;
    try {
      const validApproval = await hasValidApproval();
      if (!validApproval) {
        const { hash } = await sendUserOperationAsync({
          uo: {
            target: SN_CONTRACT_ADDRESS,
            data: encodeFunctionData({
              abi: nftCollectionAbi,
              functionName: "setApprovalForAll",
              args: [CONTRACT_ADDRESS, true],
            }),
          },
        });

        await waitForTransactionReceipt({ hash });
      }

      const sortedSelectedNodes = selectedNodes.sort((a, b) => a - b);
      const { hash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "stake",
            args: [sortedSelectedNodes.map(BigInt)],
          }),
        },
      });

      setResult({
        operation: "stake",
        selectedNodes,
      });
      setFinished(true);

      await waitForTransactionReceipt({ hash });
      queryClient.invalidateQueries({ queryKey: [user.address, "held-nodes"] });
      queryClient.invalidateQueries({
        queryKey: [user.address, "staked-nodes"],
      });
    } catch (error) {
      if (params.get("debugging")) {
        console.log(error);
      }
      if (isInternalError(error)) {
        setError("Oops! Looks like an internal error happens.");
      } else if (isInsufficientFundsError(error)) {
        setError(
          "Oops! You do not have sufficient funds to complete your operation."
        );
      } else if (isRejectedError(error)) {
        setError("Oops! Looks like you rejected the transaction signature.");
      } else {
        setError(
          "Oops! Looks like an error occurred while trying to complete your operation."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function unstake(selectedNodes: number[]) {
    if (selectedNodes.length === 0 || !user) return;
    setError("");
    setLoading(true);

    const { success } = stakeSchema.safeParse({ selectedNodes });
    if (!success) {
      setError(
        "Oops! Looks like you didn't fill in the number of nodes correctly."
      );
      setLoading(false);
      return;
    }

    setChain({ chain: getChain() });

    const params = new URL(window.location.href).searchParams;
    try {
      const sortedSelectedNodes = selectedNodes.sort((a, b) => a - b);
      const { hash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "unstake",
            args: [sortedSelectedNodes.map(BigInt)],
          }),
        },
      });

      setResult({
        operation: "unstake",
        selectedNodes,
      });
      setFinished(true);

      await waitForTransactionReceipt({ hash });
      queryClient.invalidateQueries({ queryKey: [user.address, "held-nodes"] });
      queryClient.invalidateQueries({
        queryKey: [user.address, "staked-nodes"],
      });
    } catch (error) {
      if (params.get("debugging")) {
        console.log(error);
      }
      if (isInternalError(error)) {
        setError("Oops! Looks like an internal error happens.");
      } else if (isInsufficientFundsError(error)) {
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

  async function claim(selectedNodes: number[], selectedRewards: number) {
    if (!user) return;
    setError("");
    setLoading(true);

    if (selectedNodes.length === 0) {
      setError("Oops! Looks like none of your nodes have rewards available");
      setLoading(false);
      return;
    }

    setChain({ chain: getChain() });

    const params = new URL(window.location.href).searchParams;
    try {
      const sortedSelectedNodes = selectedNodes.sort((a, b) => a - b);
      const { hash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "claimRewards",
            args: [OLD_TOKEN_ADDRESS, sortedSelectedNodes.map(BigInt)],
          }),
        },
      });

      setResult({
        operation: "claim",
        selectedNodes,
        selectedRewards,
      });
      setFinished(true);

      await waitForTransactionReceipt({ hash });
      queryClient.invalidateQueries({
        queryKey: [user.address, "staked-nodes"],
      });
    } catch (error) {
      if (params.get("debugging")) {
        console.log(error);
      }
      if (isInternalError(error)) {
        setError("Oops! Looks like an internal error happens.");
      } else if (isInsufficientFundsError(error)) {
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

  const value: StakeContextProps = {
    stake,
    unstake,
    error,
    finished,
    loading,
    result,
    claim,
  };

  return (
    <StakeContext.Provider value={value}>{children}</StakeContext.Provider>
  );
}

export function useStake() {
  return useContext(StakeContext);
}
