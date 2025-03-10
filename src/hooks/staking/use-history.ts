import { api } from "@/services/api";
import { historyResponse } from "@/types/staking";
import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

interface HistoryProps {
  page: number;
  take: number;
}

const mockedResponse: z.infer<typeof historyResponse>["data"] = [
  {
    actionDate: new Date().getTime(),
    actionType: "stake",
    amount: 5,
    hash: "0xf11950336054b6460c28a415f0beac4e273871e0cfa0cea30e1d78b54a8d3298",
    nodes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  },
  {
    actionDate: new Date().getTime(),
    actionType: "unstake",
    amount: 3,
    hash: "0x1af0e55295d08af3b88b77976e92a2df56a8e75c60661a01ab37477063477a7c",
    nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
  },
  {
    actionDate: new Date().getTime(),
    actionType: "claim",
    amount: 1,
    hash: "0xf703942509ab1940803374c571fbab177134404d95bc17d73067ee9b6a6f6367",
    reward: 50000,
    nodes: [{ id: 4 }],
  },
];

export function useHistory({ page, take }: HistoryProps) {
  const user = useUser();

  async function getHistory() {
    const { data, status } = await api.get(
      `/smartnodes/history/${user?.address}?page=${page}&take=${take}`
    );
    if (status !== 200)
      return {
        history: mockedResponse,
        count: 3,
        currentPage: 1,
        nextPage: null,
        prevPage: null,
        lastPage: 1,
      };

    const parsedResponse = historyResponse.safeParse(data);
    if (!parsedResponse.success)
      return {
        history: mockedResponse,
        count: 3,
        currentPage: 1,
        nextPage: null,
        prevPage: null,
        lastPage: 1,
      };

    const history = parsedResponse.data;

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
