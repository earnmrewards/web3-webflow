import { useQuery } from "@tanstack/react-query";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { useUser } from "@account-kit/react";

export function useTotalStakedNodes() {
  const user = useUser();
  const { readContract } = useCustomBundler({ chain: "arbitrum" });

  async function getTotalStakedNodes() {
    try {
      const nodes = await readContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getTotalSmartNodesStaked",
        args: [],
      });

      return nodes as number;
    } catch (error) {
      return 0;
    }
  }

  return useQuery({
    queryKey: ["total-staked-nodes"],
    queryFn: getTotalStakedNodes,
    initialData: 0,
    enabled: !!user,
  });
}
