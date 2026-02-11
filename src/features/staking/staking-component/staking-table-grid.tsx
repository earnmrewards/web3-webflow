import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MAX_ITEMS_PER_PAGE, STAKING_TABLE_COMPONENT_ID } from "../config";
import { createPortal } from "react-dom";
import SmartNodeImage from "@/assets/images/smart-node.png";
import { StakeOption } from "./types";
import { StakingTableGridSkeleton } from "./staking-table-grid.skeleton";
import { CheckIcon } from "@/assets/icons/check";

interface StakingTableGridProps {
  stakeOption: StakeOption;
  page: number;
  selectedNodes: number[];
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
  selectionMode: boolean;
}

export function StakingTableGrid({
  stakeOption,
  page,
  selectedNodes,
  setSelectedNodes,
  selectionMode,
}: StakingTableGridProps) {
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

  const getCurrentNodes = useCallback(
    () => (stakeOption === "available" ? heldNodes : stakedNodes),
    [stakeOption, heldNodes, stakedNodes]
  );

  if (!tableComponent) return null;

  const shouldShowSkeleton =
    (loadingStakedNodes && stakeOption === "staked") ||
    (loadingHeldNodes && stakeOption === "available");
  if (shouldShowSkeleton) {
    return createPortal(<StakingTableGridSkeleton />, tableComponent);
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
    <div className="grid py-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[490px] overflow-y-auto">
      {getCurrentNodes() &&
        getCurrentNodes()?.nodes.map(({ tokenId }) => (
          <div
            key={tokenId}
            data-mode={selectionMode}
            data-selected={isSelected(tokenId)}
            className="flex flex-col p-2 border border-[#C5C5C5] data-[selected=true]:border-[#00D632] rounded-lg space-y-2 data-[mode=true]:cursor-pointer"
            onClick={() => handleSelect(tokenId)}
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-block-24">ID</span>
                <span className="text-white font-bold">{tokenId}</span>
              </div>

              {selectionMode && (
                <div
                  data-selected={isSelected(tokenId)}
                  className="flex items-center justify-center w-5 h-5 rounded-md border-[#C5C5C5] data-[selected=true]:border-[#00D632]"
                >
                  {isSelected(tokenId) && (
                    <CheckIcon className="w-3.5 h-3.5 color-white" />
                  )}
                </div>
              )}
            </div>
            <img
              src={SmartNodeImage}
              alt="Smart Node"
              className="max-w-[320px]"
            />
          </div>
        ))}
    </div>,
    tableComponent
  );
}
