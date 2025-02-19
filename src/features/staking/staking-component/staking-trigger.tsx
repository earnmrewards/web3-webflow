import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { STAKING_COMPONENT_ACTIONS_ID } from "../config";
import { StakeOption } from "./types";
import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useStake } from "@/contexts/staking/use-stake";

interface StakingTriggerProps {
  selectionMode: boolean;
  setSelectionMode: Dispatch<SetStateAction<boolean>>;
  stakeOption: StakeOption;
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
  selectedNodes: number[];
}

export function StakingTrigger({
  selectionMode,
  setSelectionMode,
  stakeOption,
  setSelectedNodes,
  selectedNodes,
}: StakingTriggerProps) {
  const { data: heldNodes, loading: loadingHeldNodes } = useHeldNodes({
    page: 1,
    take: 100,
  });
  const { data: stakedNodes, loading: loadingStakedNodes } = useStakedNodes({
    page: 1,
    take: 100,
  });
  const { stake, unstake } = useStake();

  const handleSelectionMode = useCallback(() => {
    if (selectionMode && selectedNodes.length > 0) {
      stakeOption === "available"
        ? stake(selectedNodes)
        : unstake(selectedNodes);
      return;
    }

    const nodes = stakeOption === "available" ? heldNodes : stakedNodes;
    if (loadingHeldNodes || loadingStakedNodes || !nodes) return;

    setSelectedNodes(nodes?.nodes.map(({ tokenId }) => tokenId) || []);
    setSelectionMode(true);
  }, [
    selectionMode,
    setSelectionMode,
    loadingHeldNodes,
    loadingStakedNodes,
    heldNodes,
    stakedNodes,
    stakeOption,
    setSelectedNodes,
    selectedNodes,
    stake,
    unstake,
  ]);

  function addSelectionModeListener() {
    const component = document.getElementById(STAKING_COMPONENT_ACTIONS_ID);
    if (!component) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      component.querySelectorAll("a");
    const anchor = anchors[0];
    if (!anchor) return;

    const text = stakeOption === "available" ? "Stake" : "Unstake";
    anchor.innerText = selectionMode ? text : "Select SmartNodes";
    anchor.style.cursor =
      loadingHeldNodes || loadingStakedNodes ? "not-allowed" : "pointer";
    anchor.addEventListener("click", handleSelectionMode);

    return () => {
      anchor.removeEventListener("click", handleSelectionMode);
    };
  }
  useEffect(addSelectionModeListener, [
    selectionMode,
    handleSelectionMode,
    loadingHeldNodes,
    loadingStakedNodes,
    stakeOption,
  ]);

  return null;
}
