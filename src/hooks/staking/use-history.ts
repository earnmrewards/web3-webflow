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
      `/smartnodes/history/${user?.address}?page=${page}&take=${take}&sortByTime=${filter}`
    );
    if (status !== 200) return;

    const parsedResponse = historyResponse.safeParse(data);
    if (!parsedResponse.success) return;

    const {
      data: { history },
    } = parsedResponse.data;

    return {
      history: history.data,
      count: history.count,
      currentPage: history.currentPage,
      nextPage: history.nextPage,
      prevPage: history.prevPage,
      lastPage: history.lastPage,
    };
  }

  const { data, isLoading } = useQuery({
    queryKey: [user?.address, "history", { page, take }],
    queryFn: getHistory,
    enabled: !!user,
  });

  return { data, loading: isLoading };
}
