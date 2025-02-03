import {
  abi,
  CONTRACT_ADDRESS,
  NFT_COLLECTION_ADDRESS,
  nftCollectionAbi,
} from "@/config/contracts/staking";
import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { useCustomBundler } from "../web3/use-custom-bundler";

export function useStake() {
  const user = useUser();
  const { client } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({ client });
  const { waitForTransactionReceipt } = useCustomBundler({ chain: "arbitrum" });

  async function trigger() {
    if (!user) return;

    // TODO: Get ids from asc order
    const nftIds = [155];

    const { hash } = await sendUserOperationAsync({
      uo: {
        target: NFT_COLLECTION_ADDRESS,
        data: encodeFunctionData({
          abi: nftCollectionAbi,
          functionName: "approve",
          args: [NFT_COLLECTION_ADDRESS, nftIds.map(BigInt)],
        }),
      },
    });

    await waitForTransactionReceipt({ hash });

    const { hash: finalHash } = await sendUserOperationAsync({
      uo: {
        target: CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi,
          functionName: "stake",
          args: [nftIds.map(BigInt)],
        }),
      },
    });

    console.log({ finalHash });
  }

  return { trigger };
}
