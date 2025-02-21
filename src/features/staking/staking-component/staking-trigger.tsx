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
import { ERROR_COMPONENT_ID } from "@/features/global-config";

interface StakingTriggerProps {
  selectionMode: boolean;
  setSelectionMode: Dispatch<SetStateAction<boolean>>;
  stakeOption: StakeOption;
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
  selectedNodes: number[];
}

const disabledTriggerStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
};

const enabledTriggerStyles = {
  opacity: "1",
  cursor: "pointer",
};

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
  const { stake, unstake, claim, error } = useStake();

  const hasReward = useMemo(() => {
    if (!stakedNodes) return false;

    const rewards = stakedNodes.nodes.reduce((acc, node) => {
      const selectedNode = selectedNodes.find((id) => id === node.tokenId);
      if (!selectedNode) return acc;

      return node.reward + acc;
    }, 0);

    return rewards > 0;
  }, [stakedNodes, selectedNodes]);

  const handleSelectionMode = useCallback(() => {
    const nodes = stakeOption === "available" ? heldNodes : stakedNodes;
    if (loadingHeldNodes || loadingStakedNodes || !nodes) return;

    if (!selectionMode) {
      setSelectedNodes(nodes?.nodes.map(({ tokenId }) => tokenId) || []);
      setSelectionMode(true);
      return;
    }

    if (selectedNodes.length === 0 || (stakeOption === "staked" && hasReward))
      return;
    stakeOption === "available" ? stake(selectedNodes) : unstake(selectedNodes);
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

    anchor.addEventListener("click", handleSelectionMode);

    if (loadingHeldNodes || loadingStakedNodes) {
      anchor.style.opacity = enabledTriggerStyles.opacity;
      anchor.style.cursor = enabledTriggerStyles.cursor;
      return;
    }

    if (!selectionMode) {
      anchor.innerText = "Select SmartNodes";
      anchor.style.opacity = enabledTriggerStyles.opacity;
      anchor.style.cursor = enabledTriggerStyles.cursor;
      return;
    }

    anchor.innerText = stakeOption === "available" ? "Stake" : "Unstake";

    if (selectedNodes.length === 0) {
      anchor.style.opacity = disabledTriggerStyles.opacity;
      anchor.style.cursor = disabledTriggerStyles.cursor;
      return;
    }

    if (stakeOption === "staked" && hasReward) {
      anchor.style.opacity = disabledTriggerStyles.opacity;
      anchor.style.cursor = disabledTriggerStyles.cursor;
      return;
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
    selectedNodes,
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

  function showErrorText() {
    const textLabels: NodeListOf<HTMLParagraphElement> =
      document.querySelectorAll(`#${ERROR_COMPONENT_ID}`);
    if (textLabels.length === 0) return;

    for (const label of textLabels) {
      label.innerText = error;
    }
  }
  useEffect(showErrorText, [error]);

  return null;
}
