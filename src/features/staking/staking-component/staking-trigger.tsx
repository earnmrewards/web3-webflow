import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
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
  const { stake, unstake, claim } = useStake();

  const hasReward = useMemo(() => {
    if (!stakedNodes) return false;

    const rewards = stakedNodes.nodes.reduce(
      (acc, node) => node.reward + acc,
      0
    );
    return rewards > 0;
  }, [stakedNodes]);

  const handleSelectionMode = useCallback(() => {
    if (selectionMode && selectedNodes.length > 0) {
      if (stakeOption === "staked" && hasReward) return;

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
    hasReward,
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

    if (selectionMode && stakeOption === "staked") {
      anchor.style.opacity = hasReward ? "0.5" : "1";
      anchor.style.cursor = hasReward ? "not-allowed" : "pointer";
    }

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
    hasReward,
  ]);

  const handleClaimingTrigger = useCallback(() => {
    if (!selectionMode || stakeOption !== "staked" || !hasReward) return;

    claim(selectedNodes);
  }, [selectionMode, stakeOption, hasReward, selectedNodes, claim]);

  function changeClaimingButtonVisibility() {
    const component = document.getElementById(STAKING_COMPONENT_ACTIONS_ID);
    if (!component) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      component.querySelectorAll("a");
    const anchor = anchors[1];
    if (!anchor) return;

    const shouldShow = selectionMode && stakeOption === "staked";
    anchor.style.display = shouldShow ? "block" : "none";

    anchor.style.opacity = hasReward ? "1" : "0.5";
    anchor.style.cursor = hasReward ? "pointer" : "not-allowed";

    anchor.addEventListener("click", handleClaimingTrigger);

    return () => {
      anchor.removeEventListener("click", handleClaimingTrigger);
    };
  }
  useEffect(changeClaimingButtonVisibility, [
    selectionMode,
    stakeOption,
    hasReward,
    handleClaimingTrigger,
  ]);

  return null;
}
