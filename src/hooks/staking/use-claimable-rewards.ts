import { useQuery } from "@tanstack/react-query";
import { useLogStakedNodes } from "./use-log-staked-nodes";
import { useUser } from "@account-kit/react";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";

export function useClaimableRewards() {
  const user = useUser();
  const { data: stakedNodes } = useLogStakedNodes();
  const { readContract } = useCustomBundler({ chain: "arbitrum" });

  async function getClaimableReward() {
    if (stakedNodes.length === 0) return 0;

    const rewards = await Promise.all(
      stakedNodes.map(async (nodeId) => {
        try {
          const reward = await readContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "getRewards",
            args: [BigInt(nodeId)],
          });

          return Number(reward);
        } catch {
          return 0;
        }
      })
    );

    const precision = 10 ** 18;
    const claimableRewards = rewards.reduce((acc, reward) => acc + reward, 0);

    return claimableRewards / precision;
  }

  return useQuery({
    queryKey: ["claimable-rewards", user?.address],
    queryFn: getClaimableReward,
    initialData: 0,
    enabled: stakedNodes.length > 0,
  });
}
