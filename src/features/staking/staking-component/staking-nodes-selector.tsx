import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { STAKING_VIEW_SELECTOR_ID } from "../config";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/assets/icons/close";
import { CheckIcon } from "@/assets/icons/check";
import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { StakeOption } from "./types";
interface StakingNodesSelectorProps {
  selectionMode: boolean;
  setSelectionMode: Dispatch<SetStateAction<boolean>>;
  selectedNodes: number[];
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
  stakeOption: StakeOption;
}

export function StakingNodesSelector({
  selectionMode,
  setSelectionMode,
  selectedNodes,
  setSelectedNodes,
  stakeOption,
}: StakingNodesSelectorProps) {
  const [viewSelectorComponent, setViewSelectorComponent] =
    useState<HTMLElement | null>(null);

  const { data: heldNodes } = useHeldNodes({
    page: 1,
    take: 100,
  });

  const { data: stakedNodes } = useStakedNodes({
    page: 1,
    take: 100,
  });

  useEffect(() => {
    const component = document.getElementById(STAKING_VIEW_SELECTOR_ID);
    if (!component) return;

    setViewSelectorComponent(component as HTMLElement);
  }, []);

  const isSelectedAll = useCallback(() => {
    const nodes = stakeOption === "available" ? heldNodes : stakedNodes;
    if (!nodes) return false;

    return nodes.count === selectedNodes.length;
  }, [heldNodes, selectedNodes, stakeOption, stakedNodes]);

  if (!viewSelectorComponent) return null;

  function handleSelectionMode() {
    setSelectionMode(false);
    setSelectedNodes([]);
  }

  function handleSelectAll() {
    if (isSelectedAll()) return;

    if (stakeOption === "available") {
      setSelectedNodes(heldNodes?.nodes.map((node) => node.tokenId) ?? []);
    } else {
      setSelectedNodes(stakedNodes?.nodes.map((node) => node.tokenId) ?? []);
    }
  }

  return createPortal(
    <div
      data-mode={selectionMode}
      className="my-4 px-4 py-2 data-[mode=false]:hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 bg-[#00D632] w-full rounded-lg text-black font-galano"
    >
      <div className="flex items-center gap-6">
        <CloseIcon
          className="w-4 h-4 cursor-pointer"
          onClick={handleSelectionMode}
        />
        <div className="flex items-center gap-2">
          <span>{selectedNodes.length}/100</span>
          <span>Selected</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-5 h-5 border-black border-2 rounded-md cursor-pointer"
          style={{ backgroundColor: isSelectedAll() ? "black" : "transparent" }}
          onClick={handleSelectAll}
        >
          {isSelectedAll() && <CheckIcon className="w-3.5 h-3.5 " />}
        </div>
        <span>Select All</span>
      </div>
    </div>,
    viewSelectorComponent
  );
}
