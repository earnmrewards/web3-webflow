import { api } from "@/services/api";
import { historyResponse } from "@/types/staking";
import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";

interface HistoryProps {
  page: number;
  take: number;
  filter?: "asc" | "desc";
}

export function useHistory({ page, take, filter = "desc" }: HistoryProps) {
  const user = useUser();

  async function getHistory() {
    const { data, status } = await api.get(
      `/smartnodes/history/${user?.address}?page=${page}&take=${take}&sortDirection=${filter}`
    );
    if (status !== 200) return;

    const parsedResponse = historyResponse.safeParse(data);
    if (!parsedResponse.success) return;

    const { items, total, page: currentPage, take: pageSize } = parsedResponse.data;
    const lastPage = Math.max(1, Math.ceil(total / pageSize));

    return {
      history: items,
      count: total,
      currentPage,
      nextPage: currentPage < lastPage ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      lastPage,
    };
  }

  const { data, isLoading } = useQuery({
    queryKey: [user?.address, "history", { page, take }],
    queryFn: getHistory,
    enabled: !!user,
  });

  return { data, loading: isLoading };
}
