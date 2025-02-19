import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { MAX_ITEMS_PER_PAGE, STAKING_TABLE_COMPONENT_ID } from "../config";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { StakeOption, ViewType } from "./types";
import { StakingTableListSkeleton } from "./staking-table-list.skeleton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon } from "@/assets/icons/check";
import { useCountdown } from "@/components/use-countdown";

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

  const { timeLeft } = useCountdown({ stopTimer: false });
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
        <div className="grid py-0 grid-cols-6 gap-4">
          {heldNodes &&
            heldNodes.nodes.map(({ tokenId, receivedAt }) => (
              <div
                key={tokenId}
                className="flex flex-col border border-[#C5C5C5] rounded-2xl p-3 space-y-2"
                style={{
                  borderColor: isSelected(tokenId) ? "#00D632" : "#C5C5C5",
                  cursor: selectionMode ? "pointer" : "default",
                }}
                onClick={() => handleSelect(tokenId)}
              >
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-block-24 font-galano">ID</span>
                    <span className="text-white font-bold">{tokenId}</span>
                  </div>
                  {selectionMode && (
                    <div
                      className="flex items-center justify-center w-5 h-5 rounded-md"
                      style={{
                        backgroundColor: isSelected(tokenId)
                          ? "#00D632"
                          : "#D9D9D9",
                      }}
                    >
                      {isSelected(tokenId) && (
                        <CheckIcon className="w-3.5 h-3.5 color-white" />
                      )}
                    </div>
                  )}
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
        <div className="grid py-0 grid-cols-1 gap-4 max-h-[490px] overflow-y-auto">
          {stakedNodes &&
            stakedNodes.nodes.map(({ tokenId, stakedAt, reward }) => (
              <div
                key={tokenId}
                className={`grid ${
                  selectionMode ? "grid-cols-5" : "grid-cols-4"
                } border rounded-2xl p-5`}
                style={{
                  borderColor: isSelected(tokenId) ? "#00D632" : "#C5C5C5",
                  cursor: selectionMode ? "pointer" : "default",
                }}
                onClick={() => handleSelect(tokenId)}
              >
                {selectionMode && (
                  <div className="flex items-center justify-center max-w-20">
                    <div
                      className="flex items-center justify-center w-5 h-5 rounded-md"
                      style={{
                        backgroundColor: isSelected(tokenId)
                          ? "#00D632"
                          : "#D9D9D9",
                      }}
                    >
                      {isSelected(tokenId) && (
                        <CheckIcon className="w-3.5 h-3.5 color-white" />
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-block-24 font-galano">ID</span>
                  <span className="text-white font-bold">{tokenId}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-block-24 font-galano">Staked on</span>
                  <span className="text-white font-bold">
                    {new Date(stakedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-block-24 font-galano">Reward</span>
                  <span className="text-white font-bold">{reward}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-block-24 font-galano">
                    Claimable In
                  </span>
                  <span className="text-white font-bold">{timeLeft}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </>,
    tableComponent
  );
}
