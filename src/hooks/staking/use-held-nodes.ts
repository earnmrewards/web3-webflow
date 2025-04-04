import { api } from "@/services/api";
import { heldResponseSchema } from "@/types/staking";
import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

interface HeldNodesProps {
  page: number;
  take: number;
}

interface HeldNodesResponse {
  nodes: z.infer<typeof heldResponseSchema>["data"]["smartNodes"]["data"];
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export function useHeldNodes({ page, take }: HeldNodesProps) {
  const user = useUser();

  async function getHeldNodes(): Promise<HeldNodesResponse | undefined> {
    const { data, status } = await api.get(
      `/smartnodes/held/${user?.address}?page=${page}&take=${take}`
    );
    if (status !== 200) return;

    const parsedResponse = heldResponseSchema.safeParse(data);
    if (!parsedResponse.success) return;

    const {
      data: { smartNodes },
    } = parsedResponse.data;

    return {
      nodes: smartNodes.data,
      count: smartNodes.count,
      currentPage: smartNodes.currentPage,
      nextPage: smartNodes.nextPage,
      prevPage: smartNodes.prevPage,
      lastPage: smartNodes.lastPage,
    };
  }

  const { data, isLoading } = useQuery({
    queryKey: [user?.address, "held-nodes", { page, take }],
    queryFn: getHeldNodes,
    enabled: !!user,
  });

  return { data, loading: isLoading };
}
