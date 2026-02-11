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
  nodes: z.infer<typeof heldResponseSchema>["items"];
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
    if (parsedResponse.success) {
      const { items, total, page: currentPage, take: pageSize } = parsedResponse.data;
      const lastPage = Math.max(1, Math.ceil(total / pageSize));

      return {
        nodes: items,
        count: total,
        currentPage,
        nextPage: currentPage < lastPage ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        lastPage,
      };
    }

    // TODO: Remove this fallback once the held endpoint is deployed with pagination
    const legacy = z.object({ heldCount: z.number() }).safeParse(data);
    if (legacy.success) {
      return {
        nodes: [],
        count: legacy.data.heldCount,
        currentPage: 1,
        nextPage: null,
        prevPage: null,
        lastPage: 1,
      };
    }

    return {
      nodes: [],
      count: 0,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      lastPage: 1,
    };
  }

  const { data, isLoading } = useQuery({
    queryKey: [user?.address, "held-nodes", { page, take }],
    queryFn: getHeldNodes,
    enabled: !!user,
  });

  return { data, loading: isLoading };
}
