import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useCallback, useEffect, useState } from "react";
import { STAKING_TABLE_COMPONENT_ID } from "../config";
import { createPortal } from "react-dom";
import SmartNodeImage from "@/assets/images/smart-node.png";
import { StakeOption } from "./types";
import { StakingTableGridSkeleton } from "./staking-table-grid.skeleton";

interface StakingTableGridProps {
  stakeOption: StakeOption;
  page: number;
}

export function StakingTableGrid({ stakeOption, page }: StakingTableGridProps) {
  const [tableComponent, setTableComponent] = useState<HTMLElement | null>(
    null
  );

  const { data: heldNodes, loading: loadingHeldNodes } = useHeldNodes({
    page,
    take: 6,
  });
  const { data: stakedNodes, loading: loadingStakedNodes } = useStakedNodes({
    page,
    take: 6,
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

  return createPortal(
    <div className="grid py-0 grid-cols-3 gap-4 max-h-[490px] overflow-y-auto">
      {getCurrentNodes() &&
        getCurrentNodes()?.nodes.map(({ tokenId }) => (
          <div
            key={tokenId}
            className="flex flex-col p-2 border border-[#C5C5C5] rounded-lg space-y-2"
          >
            <div className="flex flex-col">
              <span className="text-block-24">ID</span>
              <span className="text-white font-bold">{tokenId}</span>
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
