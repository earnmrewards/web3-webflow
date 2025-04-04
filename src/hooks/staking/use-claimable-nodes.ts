import { useUser } from "@account-kit/react";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { useQuery } from "@tanstack/react-query";
import { useStakedNodes } from "./use-staked-nodes";

export function useClaimableNodes() {
  const user = useUser();
  const { data: stakedNodes } = useStakedNodes({
    page: 1,
    take: 1,
  });
  const { readContract } = useCustomBundler({ chain: "arbitrum" });

  async function getClaimableNodes() {
    const stakedList = stakedNodes?.nodes || [];
    if (stakedList.length === 0) return [];

    const nodes = await Promise.all(
      stakedList.filter(async ({ tokenId }) => {
        try {
          const reward = await readContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "getRewards",
            args: [BigInt(tokenId)],
          });

          return Number(reward) > 0;
        } catch {
          return false;
        }
      })
    );

    return nodes;
  }

  return useQuery({
    queryKey: [user?.address, "claimable-nodes"],
    queryFn: getClaimableNodes,
    initialData: [],
    enabled: !!stakedNodes && stakedNodes.totalRewards > 0,
  });
}
