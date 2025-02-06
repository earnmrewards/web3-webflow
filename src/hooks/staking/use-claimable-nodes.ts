import { useUser } from "@account-kit/react";
import { useLogStakedNodes } from "./use-log-staked-nodes";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { useQuery } from "@tanstack/react-query";

export function useClaimableNodes() {
  const user = useUser();
  const { data: stakedNodes } = useLogStakedNodes();
  const { readContract } = useCustomBundler({ chain: "arbitrum" });

  async function getClaimableNodes() {
    if (stakedNodes.length === 0) return [];

    const nodes = await Promise.all(
      stakedNodes.filter(async (nodeId) => {
        try {
          const reward = await readContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "getRewards",
            args: [BigInt(nodeId)],
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
    queryKey: ["claimable-nodes", user?.address],
    queryFn: getClaimableNodes,
    initialData: [],
    enabled: !!stakedNodes,
  });
}
