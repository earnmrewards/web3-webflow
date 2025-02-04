import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { useCustomBundler } from "../web3/use-custom-bundler";
import { CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { stakeEventABI } from "@/config/contracts/staking/stake-event-abi";
import { unstakeEventABI } from "@/config/contracts/staking/unstake-event-abi";

const STARTER_BLOCK = BigInt(114038218);

export function useLogStakedNodes() {
  const user = useUser();
  const { getLogs } = useCustomBundler({ chain: "arbitrum" });

  async function getStakedNodes() {
    if (!user) return [];

    const stakedNodes = await getLogs({
      address: CONTRACT_ADDRESS,
      event: stakeEventABI,
      fromBlock: STARTER_BLOCK,
      toBlock: "latest",
    });

    const nodeBlockMap = new Map<number, bigint>();

    for (const node of stakedNodes) {
      if (node.args.stakerAddress !== user.address) continue;

      for (const tokenId of node.args.snTokenIds || []) {
        nodeBlockMap.set(tokenId, node.blockNumber);
      }
    }

    const unstakedNodes = await getLogs({
      address: CONTRACT_ADDRESS,
      event: unstakeEventABI,
      fromBlock: STARTER_BLOCK,
      toBlock: "latest",
    });

    for (const node of unstakedNodes) {
      if (node.args.stakerAddress !== user.address) continue;

      for (const tokenId of node.args.snTokenIds || []) {
        const lastStakedBlock = nodeBlockMap.get(tokenId);

        if (
          lastStakedBlock !== undefined &&
          node.blockNumber > lastStakedBlock
        ) {
          nodeBlockMap.delete(tokenId);
        }
      }
    }

    return Array.from(nodeBlockMap.keys());
  }

  return useQuery({
    queryKey: ["log-staked-nodes", user?.address],
    queryFn: getStakedNodes,
    initialData: [],
    enabled: !!user,
  });
}
