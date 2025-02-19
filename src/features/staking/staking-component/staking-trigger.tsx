import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { STAKING_COMPONENT_ACTIONS_ID } from "../config";
import { StakeOption } from "./types";
import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";

interface StakingTriggerProps {
  selectionMode: boolean;
  setSelectionMode: Dispatch<SetStateAction<boolean>>;
  stakeOption: StakeOption;
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
}

export function StakingTrigger({
  selectionMode,
  setSelectionMode,
  stakeOption,
  setSelectedNodes,
}: StakingTriggerProps) {
  const { data: heldNodes, loading: loadingHeldNodes } = useHeldNodes({
    page: 1,
    take: 100,
  });
  const { data: stakedNodes, loading: loadingStakedNodes } = useStakedNodes({
    page: 1,
    take: 100,
  });

  const handleSelectionMode = useCallback(() => {
    const nodes = stakeOption === "available" ? heldNodes : stakedNodes;
    if (selectionMode || loadingHeldNodes || loadingStakedNodes || !nodes)
      return;

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
  ]);

  function addSelectionModeListener() {
    const component = document.getElementById(STAKING_COMPONENT_ACTIONS_ID);
    if (!component) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      component.querySelectorAll("a");
    const anchor = anchors[0];
    if (!anchor) return;

    anchor.style.cursor =
      loadingHeldNodes || loadingStakedNodes ? "not-allowed" : "pointer";
    anchor.addEventListener("click", handleSelectionMode);
  }

  useEffect(addSelectionModeListener, [
    selectionMode,
    handleSelectionMode,
    loadingHeldNodes,
    loadingStakedNodes,
  ]);

  function updateTriggerButton() {
    const component = document.getElementById(STAKING_COMPONENT_ACTIONS_ID);
    if (!component) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      component.querySelectorAll("a");
    const anchor = anchors[0];
    if (!anchor) return;

    const text = stakeOption === "available" ? "Stake" : "Unstake";
    anchor.innerText = selectionMode ? text : "Select SmartNodes";
  }
  useEffect(updateTriggerButton, [stakeOption, selectionMode]);

  return null;
}
