import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { MAX_ITEMS_PER_PAGE, STAKING_TABLE_COMPONENT_ID } from "../config";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { StakeOption, ViewType } from "./types";
import { StakingTableListSkeleton } from "./staking-table-list.skeleton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface StakingTableListProps {
  page: number;
  stakeOption: StakeOption;
  viewType: ViewType;
  setViewType: Dispatch<SetStateAction<ViewType>>;
}

export function StakingTableList({ page, stakeOption }: StakingTableListProps) {
  const [tableComponent, setTableComponent] = useState<HTMLElement | null>(
    null
  );

  const { data: heldNodes, loading: loadingHeldNodes } = useHeldNodes({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });
  const { data: stakedNodes, loading: loadingStakedNodes } = useStakedNodes({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });

  useEffect(() => {
    const component = document.getElementById(STAKING_TABLE_COMPONENT_ID);
    if (!component) return;

    setTableComponent(component as HTMLElement);
  }, []);

  if (!tableComponent) return null;

  const shouldShowSkeleton =
    (loadingStakedNodes && stakeOption === "staked") ||
    (loadingHeldNodes && stakeOption === "available");
  if (shouldShowSkeleton) {
    return createPortal(
      <StakingTableListSkeleton option={stakeOption} />,
      tableComponent
    );
  }

  return createPortal(
    <>
      {stakeOption === "available" && (
        <div className="grid grid-cols-6 gap-4">
          {heldNodes &&
            heldNodes.nodes.map(({ tokenId, receivedAt }) => (
              <div className="flex flex-col border border-[#C5C5C5] rounded-2xl p-2 space-y-2">
                <div className="flex flex-col">
                  <span className="text-block-24">ID</span>
                  <span className="text-white font-bold">{tokenId}</span>
                </div>
                <div className="flex flex-col text-nowrap">
                  <span className="text-block-24">Purchased Date</span>
                  <span className="text-white font-bold">
                    {new Date(receivedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {stakeOption === "staked" && (
        <div className="grid grid-cols-1 gap-4 max-h-[540px] overflow-y-auto">
          {stakedNodes &&
            stakedNodes.nodes.map(({ tokenId, stakedAt }) => (
              <div
                key={tokenId}
                className="flex items-center border border-[#C5C5C5] rounded-2xl p-2 space-x-4"
              >
                <div className="flex flex-col">
                  <span className="text-block-24">ID</span>
                  <span className="text-white font-bold">{tokenId}</span>
                </div>
                <div className="flex flex-col text-nowrap">
                  <span className="text-block-24">Staked on</span>
                  <span className="text-white font-bold">
                    {new Date(stakedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </>,
    tableComponent
  );
}
