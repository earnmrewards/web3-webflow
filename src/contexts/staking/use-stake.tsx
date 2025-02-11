import { useOwnedNFTs } from "@/hooks/staking/use-owned-nfts";
import { useCustomBundler } from "@/hooks/web3/use-custom-bundler";
import {
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
import { useLogStakedNodes } from "@/hooks/staking/use-log-staked-nodes";
import { useClaimableNodes } from "@/hooks/staking/use-claimable-nodes";

type StakeType = "stake" | "unstake" | "claim";

interface ResultType {
  operation: StakeType;
  amount: number;
}

interface StakeContextProps {
  stake: (amount: number) => Promise<void>;
  unstake: (amount: number) => Promise<void>;
  claim: () => Promise<void>;
  error: string;
  finished: boolean;
  loading: boolean;
  result: ResultType | null;
}

const StakeContext = createContext({} as StakeContextProps);

const stakeSchema = z.object({
  amount: z.number().positive(),
});

interface StakeProviderProps {
  children: ReactNode;
}

export function StakeProvider({ children }: StakeProviderProps) {
  const user = useUser();
  const { client } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({ client });
  const { waitForTransactionReceipt, readContract } = useCustomBundler({
    chain: "arbitrum",
  });

  const { data: smartNodes } = useOwnedNFTs();
  const { data: stakedNodes, isFetching: fetchingNodes } = useLogStakedNodes();
  const { data: claimableNodes, isFetching: fetchingClaimableNodes } =
    useClaimableNodes();

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  function getNodeIds(amount: number, type: StakeType) {
    const lists = {
      stake: smartNodes,
      unstake: stakedNodes,
      claim: claimableNodes,
    };
    const list = lists[type];
    if (!list || list.length === 0) return [];

    const size = type === "claim" ? list.length : amount;
    const fixedAmount = size > 100 ? 100 : size;

    const sortedNodes = list.sort((a, b) => a - b);
    const slicedNodes = sortedNodes.slice(0, fixedAmount);

    return slicedNodes;
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

  function hasEnoughNodes(amount: number, type: StakeType) {
    const lists = {
      stake: smartNodes,
      unstake: stakedNodes,
      claim: claimableNodes,
    };
    const list = lists[type];
    if (!list || list.length === 0) return false;

    return amount <= list.length;
  }

  async function stake(amount: number) {
    if (amount === 0 || !user) return;
    setError("");
    setLoading(true);

    const { success } = stakeSchema.safeParse({ amount });
    if (!success) {
      setError(
        "Oops! Looks like you did not fill in the amount of nodes you want to stake"
      );
      setLoading(false);
      return;
    }

    const functionName = "stake";
    const enoughNodes = hasEnoughNodes(amount, functionName);
    if (!enoughNodes) {
      setError(
        `Oops! Looks like you don't have enough nodes to perform this ${functionName}`
      );
      setLoading(false);
      return;
    }

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

      await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: functionName,
            args: [getNodeIds(amount, functionName).map(BigInt)],
          }),
        },
      });

      setResult({
        operation: functionName,
        amount,
      });
      setFinished(true);
    } catch (error) {
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

  async function unstake(amount: number) {
    if (amount === 0 || !user || fetchingNodes) return;
    setError("");
    setLoading(true);

    const { success } = stakeSchema.safeParse({ amount });
    if (!success) {
      setError(
        "Oops! Looks like you did not fill in the amount of nodes you want to stake"
      );
      setLoading(false);
      return;
    }

    const functionName = "unstake";
    const enoughNodes = hasEnoughNodes(amount, functionName);
    if (!enoughNodes) {
      setError(
        `Oops! Looks like you don't have enough nodes to perform this ${functionName}`
      );
      setLoading(false);
      return;
    }

    try {
      console.log(getNodeIds(amount, functionName));
      await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName,
            args: [getNodeIds(amount, functionName).map(BigInt)],
          }),
        },
      });

      setResult({
        operation: functionName,
        amount,
      });
      setFinished(true);
    } catch (error) {
      console.log(error);
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

  async function claim() {
    if (!user || fetchingClaimableNodes) return;
    setError("");
    setLoading(true);

    if (claimableNodes.length === 0) {
      setError("Oops! Looks like none of your nodes have rewards available");
      setLoading(false);
      return;
    }

    try {
      const functionName = "claim";
      await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "claimRewards",
            args: [getNodeIds(0, functionName).map(BigInt)],
          }),
        },
      });

      setResult({
        operation: functionName,
        amount: getNodeIds(0, functionName).length,
      });
    } catch (error) {
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
