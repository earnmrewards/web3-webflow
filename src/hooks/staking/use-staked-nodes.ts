import { api } from "@/services/api";
import { stakedResponseSchema } from "@/types/staking";
import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

interface StakedNodesProps {
  page: number;
  take: number;
}

interface StakedNodesResponse {
  nodes: z.infer<typeof stakedResponseSchema>["data"]["smartNodes"]["data"];
  totalRewards: number;
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export function useStakedNodes({ page, take }: StakedNodesProps) {
  const user = useUser();

  async function getStakedNodes(): Promise<StakedNodesResponse | undefined> {
    const { data, status } = await api.get(
      `/smartnodes/staked/${user?.address}?page=${page}&take=${take}`
    );

    if (status !== 200) return;

    const parsedResponse = stakedResponseSchema.safeParse(data);
    if (!parsedResponse.success) return;

    const {
      data: { smartNodes, totalRewards },
    } = parsedResponse.data;

    return {
      nodes: smartNodes.data,
      totalRewards,
      count: smartNodes.count,
      currentPage: smartNodes.currentPage,
      nextPage: smartNodes.nextPage,
      prevPage: smartNodes.prevPage,
      lastPage: smartNodes.lastPage,
    };
  }

  const { data, isLoading } = useQuery({
    queryKey: [user?.address, "staked-nodes", { page, take }],
    queryFn: getStakedNodes,
    enabled: !!user && !!page && !!take,
  });

  return { data, loading: isLoading };
}
