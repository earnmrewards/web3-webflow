import { api } from "@/services/api";
import { iterationResponseSchema } from "@/types/staking";
import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

interface IterationsProps {
  page: number;
  take: number;
}

interface IterationsResponse {
  iterations: z.infer<typeof iterationResponseSchema>["items"];
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export function useIterations({ page, take }: IterationsProps) {
  const user = useUser();

  async function getIterations(): Promise<IterationsResponse | undefined> {
    const { data, status } = await api.get(
      `/smartnodes/iterations?page=${page}&take=${take}`
    );
    if (status !== 200) return;

    const parsedResponse = iterationResponseSchema.safeParse(data);
    if (!parsedResponse.success) return;

    const { items, total, page: currentPage, take: pageSize } = parsedResponse.data;
    const lastPage = Math.max(1, Math.ceil(total / pageSize));

    return {
      iterations: items,
      count: total,
      currentPage,
      nextPage: currentPage < lastPage ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      lastPage,
    };
  }

  const { data, isLoading } = useQuery({
    queryKey: ["iterations", { page, take }],
    queryFn: getIterations,
    enabled: !!user,
  });

  return { data, loading: isLoading };
}
