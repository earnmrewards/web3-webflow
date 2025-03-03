import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { MAX_ITEMS_PER_PAGE, STAKING_TABLE_COMPONENT_ID } from "../config";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { StakeOption, ViewType } from "./types";
import { StakingTableListSkeleton } from "./staking-table-list.skeleton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon } from "@/assets/icons/check";
import { EarnM } from "@/assets/icons/earnm";

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

  function isSelected(id: number) {
    return selectedNodes.includes(id);
  }

  function handleSelect(id: number) {
    if (!selectionMode) return;

    if (isSelected(id)) {
      setSelectedNodes(selectedNodes.filter((node) => node !== id));
    } else {
      setSelectedNodes([...selectedNodes, id]);
    }
  }

  return createPortal(
    <>
      {stakeOption === "available" && (
        <div className="mt-3 grid py-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {heldNodes &&
            heldNodes.nodes.map(({ tokenId, receivedAt }) => (
              <div
                key={tokenId}
                data-mode={selectionMode}
                data-selected={isSelected(tokenId)}
                className="flex flex-col border border-[#C5C5C5] data-[selected=true]:border-[#00D632] rounded-2xl p-3 space-y-2 data-[mode=true]:cursor-pointer"
                onClick={() => handleSelect(tokenId)}
              >
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-block-24 font-galano">
                      SmartNode ID
                    </span>
                    <span className="heading-text-table text-white font-bold">
                      {tokenId}
                    </span>
                  </div>
                  {selectionMode && (
                    <div
                      data-selected={isSelected(tokenId)}
                      className="ml-2 flex items-center justify-center w-5 h-5 rounded-md bg-[#C5C5C5] data-[selected=true]:bg-[#00D632]"
                    >
                      {isSelected(tokenId) && (
                        <CheckIcon className="w-3.5 h-3.5 color-white" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-nowrap">
                  <span className="text-block-24">Received Date</span>
                  <span className="heading-text-table text-white font-bold">
                    {new Date(receivedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {stakeOption === "staked" && (
        <div className="mt-3 pr-2 grid py-0 grid-cols-1 gap-4 md:max-h-[490px] overflow-y-auto custom-scrollbar">
          {stakedNodes &&
            stakedNodes.nodes.map(({ tokenId, stakedAt, reward }) => (
              <div
                key={tokenId}
                data-selected={isSelected(tokenId)}
                data-mode={selectionMode}
                className="min-w-fit w-full flex flex-row justify-between gap-4 border border-[#C5C5C5] data-[selected=true]:border-[#00D632] rounded-2xl p-5 data-[mode=true]:cursor-pointer overflow-x-auto custom-thin-scrollbar"
                onClick={() => handleSelect(tokenId)}
              >
                {selectionMode && (
                  <div className="flex items-center justify-center max-w-20">
                    <div
                      data-selected={isSelected(tokenId)}
                      className="flex items-center justify-center w-5 h-5 rounded-md bg-[#C5C5C5] data-[selected=true]:bg-[#00D632]"
                    >
                      {isSelected(tokenId) && (
                        <CheckIcon className="w-3.5 h-3.5 color-white" />
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-block-24 font-galano whitespace-nowrap">
                    SmartNode ID
                  </span>
                  <span className="heading-text-table text-white font-bold">
                    {tokenId}
                  </span>
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <span className="text-block-24 font-galano">Staked on</span>
                  <span className="heading-text-table text-white font-bold">
                    {new Date(stakedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-block-24 font-galano whitespace-nowrap">
                    Withdrawable Now
                  </span>
                  <div className="flex items-center gap-1">
                    <EarnM />
                    <span className="heading-text-table text-white font-bold">
                      {reward.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>,
    tableComponent
  );
}
