import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  MAX_INTERACTIVE_ITEMS,
  MAX_ITEMS_PER_PAGE,
  STAKING_COMPONENT_ACTIONS_ID,
} from "../config";
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
  page: number;
}

export function StakingTrigger({
  selectionMode,
  setSelectionMode,
  stakeOption,
  setSelectedNodes,
  selectedNodes,
  page,
}: StakingTriggerProps) {
  const { data: heldNodes, loading: loadingHeldNodes } = useHeldNodes({
    page: 1,
    take: MAX_INTERACTIVE_ITEMS,
  });
  const { data: stakedNodes, loading: loadingStakedNodes } = useStakedNodes({
    page: page,
    take: MAX_ITEMS_PER_PAGE,
  });
  const { stake, unstake, claim, error } = useStake();

  function getButtonComponent(type: "trigger" | "claiming") {
    const component = document.getElementById(STAKING_COMPONENT_ACTIONS_ID);
    if (!component) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      component.querySelectorAll("a");
    const anchor = anchors[type === "trigger" ? 0 : 1];
    if (!anchor) return;

    return anchor;
  }

  const selectedRewards = useMemo(() => {
    if (!stakedNodes) return 0;

    const rewards = stakedNodes.nodes.reduce((acc, node) => {
      const selectedNode = selectedNodes.find((id) => id === node.tokenId);
      if (!selectedNode) return acc;

      return node.reward + acc;
    }, 0);

    return rewards;
  }, [stakedNodes, selectedNodes]);

  const hasReward = selectedRewards > 0;

  const handleSelectionMode = useCallback(() => {
    if (stakeOption === "history") return;

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

  function addTriggerEvent() {
    const anchor = getButtonComponent("trigger");
    if (!anchor) return;

    anchor.addEventListener("click", handleSelectionMode);

    return () => {
      anchor.removeEventListener("click", handleSelectionMode);
    };
  }
  useEffect(addTriggerEvent, [selectionMode, handleSelectionMode]);

  function handlePreSelection() {
    const anchor = getButtonComponent("trigger");
    if (!anchor || selectionMode) return;

    anchor.innerText = "Select SmartNodes";

    const shouldBlock =
      loadingHeldNodes || loadingStakedNodes || stakeOption === "history";
    anchor.style.opacity = shouldBlock ? "0.5" : "1";
    anchor.style.cursor = shouldBlock ? "not-allowed" : "pointer";
  }
  useEffect(handlePreSelection, [
    loadingHeldNodes,
    loadingStakedNodes,
    selectionMode,
    stakeOption,
  ]);

  function handlePosSelection() {
    const anchor = getButtonComponent("trigger");
    if (!anchor || !selectionMode) return;

    anchor.innerText = stakeOption === "available" ? "Stake" : "Unstake";

    const shouldBlock =
      selectedNodes.length === 0 || (stakeOption === "staked" && hasReward);
    anchor.style.opacity = shouldBlock ? "0.5" : "1";
    anchor.style.cursor = shouldBlock ? "not-allowed" : "pointer";
  }
  useEffect(handlePosSelection, [
    selectionMode,
    selectedNodes,
    hasReward,
    stakeOption,
  ]);

  const handleClaimingTrigger = useCallback(() => {
    if (!selectionMode || stakeOption !== "staked" || !hasReward) return;

    claim(selectedNodes, selectedRewards);
  }, [
    selectionMode,
    stakeOption,
    hasReward,
    selectedNodes,
    claim,
    selectedRewards,
  ]);

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
