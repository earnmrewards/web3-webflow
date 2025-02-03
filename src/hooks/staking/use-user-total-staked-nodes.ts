import { useUser } from "@account-kit/react";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { useQuery } from "@tanstack/react-query";

export function useUserTotalStakedNodes() {
  const user = useUser();
  const { readContract } = useCustomBundler({ chain: "arbitrum" });

  async function getUserTotalStakedNodes() {
    if (!user) return 0;

    try {
      const nodes = await readContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getSmartNodesStakedCount",
        args: [user.address],
      });

      return nodes as number;
    } catch (error) {
      return 0;
    }
  }

  return useQuery({
    queryKey: ["total-staked-nodes", user?.address],
    queryFn: getUserTotalStakedNodes,
    initialData: 0,
    enabled: !!user,
  });
}
