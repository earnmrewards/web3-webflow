import {
  abi,
  CONTRACT_ADDRESS,
  nftCollectionAbi,
} from "@/config/contracts/staking";
import { CONTRACT_ADDRESS as SN_CONTRACT_ADDRESS } from "@/config/contracts/smart-nodes";
import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { useOwnedNFTs } from "./use-owned-nfts";
import { isInternalError } from "@/errors/is-internal-error";
import { isInsufficientFundsError } from "@/errors/is-insufficient-funds-error";
import { isRejectedError } from "@/errors/is-rejected-error";
import { useState } from "react";
import { z } from "zod";

const stakeSchema = z.object({
  amount: z.number().positive(),
});

type StakeProps = z.infer<typeof stakeSchema>;

export function useStake({ amount }: StakeProps) {
  const user = useUser();
  const { client } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({ client });
  const { waitForTransactionReceipt, readContract } = useCustomBundler({
    chain: "arbitrum",
  });

  const { data: smartNodes } = useOwnedNFTs();

  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  function getNodeIds() {
    if (!smartNodes) return [];

    const sortedNodes = smartNodes.sort();
    const slicedNodes = sortedNodes.slice(0, amount);

    return slicedNodes.map((data) => data.tokenId);
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

  async function stake() {
    if (amount === 0 || !user) return;
    setError("");

    // const test: boolean = true;
    // if (test) {
    //   const data = await getLogs({
    //     address: CONTRACT_ADDRESS,
    //     event: {
    //       anonymous: false,
    //       inputs: [
    //         {
    //           indexed: true,
    //           internalType: "address",
    //           name: "stakerAddress",
    //           type: "address",
    //         },
    //         {
    //           indexed: false,
    //           internalType: "uint16[]",
    //           name: "snTokenIds",
    //           type: "uint16[]",
    //         },
    //       ],
    //       name: "SmartNodesStaked",
    //       type: "event",
    //     },
    //     fromBlock: BigInt(114038218),
    //     toBlock: "latest",
    //   });

    //   console.log(data);
    //   return;
    // }

    const { success } = stakeSchema.safeParse({ amount });
    if (!success) {
      setError(
        "Oops! Looks like you did not fill in the amount of nodes you want to stake"
      );
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

        // TODO: Add custom blocks for ARB
        await waitForTransactionReceipt({ hash });
      }

      const { hash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "stake",
            args: [getNodeIds().map(BigInt)],
          }),
        },
      });

      console.log({ hash });
      setFinished(true);
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
    }
  }

  async function unStake() {
    if (amount === 0 || !user) return;
    setError("");

    const { success } = stakeSchema.safeParse({ amount });
    if (!success) {
      setError(
        "Oops! Looks like you did not fill in the amount of nodes you want to stake"
      );
      return;
    }

    try {
      const { hash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "unstake",
            // TODO: Figure out how to fetch staked node ids
            args: [],
          }),
        },
      });

      console.log({ hash });
      setFinished(true);
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
    }
  }

  return { stake, unStake, error, finished };
}
