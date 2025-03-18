import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { MAX_ITEMS_PER_PAGE, STAKING_TABLE_COMPONENT_ID } from "../../config";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { StakeOption, ViewType } from "../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AvailableList } from "./available-list";
import { AvailableListSkeleton } from "./available-list.skeleton";
import { StakedListSkeleton } from "./staked-list.skeleton";
import { StakedList } from "./staked-list";
import { HistoryList } from "./history-list";
import { useHistory } from "@/hooks/staking/use-history";
import { HistoryListSkeleton } from "./history-list.skeleton";

interface StakingTableListProps {
  page: number;
  stakeOption: StakeOption;
  viewType: ViewType;
  setViewType: Dispatch<SetStateAction<ViewType>>;
  selectionMode: boolean;
  selectedNodes: number[];
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
}

export function StakingTableList({
  page,
  stakeOption,
  selectionMode,
  selectedNodes,
  setSelectedNodes,
}: StakingTableListProps) {
  const [tableComponent, setTableComponent] = useState<HTMLElement | null>(
    null
  );

  const { loading: loadingHeldNodes } = useHeldNodes({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });
  const { loading: loadingStakedNodes } = useStakedNodes({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });
  const { loading: loadingHistory } = useHistory({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });

  useEffect(() => {
    const component = document.getElementById(STAKING_TABLE_COMPONENT_ID);
    if (!component) return;

    setTableComponent(component as HTMLElement);
  }, []);

  if (!tableComponent) return null;

  if (loadingHeldNodes && stakeOption === "available") {
    return createPortal(<AvailableListSkeleton />, tableComponent);
  }

  if (loadingStakedNodes && stakeOption === "staked") {
    return createPortal(<StakedListSkeleton />, tableComponent);
  }

  if (loadingHistory && stakeOption === "history") {
    return createPortal(<HistoryListSkeleton />, tableComponent);
  }

  if (stakeOption === "available") {
    return createPortal(
      <AvailableList
        page={page}
        selectionMode={selectionMode}
        selectedNodes={selectedNodes}
        setSelectedNodes={setSelectedNodes}
      />,
      tableComponent
    );
  }

  if (stakeOption === "staked") {
    return createPortal(
      <StakedList
        page={page}
        selectionMode={selectionMode}
        selectedNodes={selectedNodes}
        setSelectedNodes={setSelectedNodes}
      />,
      tableComponent
    );
  }

  if (stakeOption === "history") {
    return createPortal(<HistoryList page={page} />, tableComponent);
  }

  return null;
}
