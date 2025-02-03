import { useQuery } from "@tanstack/react-query";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { useUser } from "@account-kit/react";

export function useStakedNodes() {
  const user = useUser();
  const { readContract } = useCustomBundler({ chain: "arbitrum" });

  async function getStakedNodes() {
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
    queryKey: ["staked-nodes", user?.address],
    queryFn: getStakedNodes,
    initialData: 0,
    enabled: !!user,
  });
}
