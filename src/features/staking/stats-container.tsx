import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useTotalStakedNodes } from "@/hooks/staking/use-total-staked-nodes";
import {
  CLAIMABLE_REWARDS_LABEL_ID,
  SN_AMOUNT_LABEL_ID,
  STAKING_CONTAINER_ID,
  TOTAL_STAKED_AMOUNT_LABEL_ID,
  USER_TOTAL_STAKED_AMOUNT_LABEL_ID,
} from "./config";
import { useEffect } from "react";
import { useUser } from "@account-kit/react";
import { useHeldNodes } from "@/hooks/staking/use-held-nodes";

export function StatsContainer() {
  const user = useUser();

  const { data: heldNodes, loading: heldNodesLoading } = useHeldNodes({
    page: 1,
    take: 1,
  });
  const { data: stakedNodes, loading: stakedNodesLoading } = useStakedNodes({
    page: 1,
    take: 1,
  });
  const { data: totalStakedNodes, isLoading: totalStakedNodesLoading } =
    useTotalStakedNodes();

  function showSmartNodesAmount() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const snAmountLabel = container.querySelector(`#${SN_AMOUNT_LABEL_ID}`);
    if (!snAmountLabel) return;

    const shouldShow = !heldNodesLoading && user && heldNodes;
    snAmountLabel.innerHTML = shouldShow ? heldNodes.count.toString() : "---";
  }
  useEffect(showSmartNodesAmount, [heldNodesLoading, heldNodes, user]);

  function showTotalStakedNodes() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const totalStakedLabel = container.querySelector(
      `#${TOTAL_STAKED_AMOUNT_LABEL_ID}`
    );
    if (!totalStakedLabel) return;

    const shouldShow = !totalStakedNodesLoading && user;
    totalStakedLabel.innerHTML = shouldShow
      ? totalStakedNodes.toString()
      : "---";
  }
  useEffect(showTotalStakedNodes, [
    totalStakedNodesLoading,
    totalStakedNodes,
    user,
  ]);

  function showUserTotalStakedNodes() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const userTotalStakedLabel = container.querySelector(
      `#${USER_TOTAL_STAKED_AMOUNT_LABEL_ID}`
    );
    if (!userTotalStakedLabel) return;

    const shouldShow = !stakedNodesLoading && user && stakedNodes;
    userTotalStakedLabel.innerHTML = shouldShow
      ? stakedNodes.count.toString()
      : "---";
  }
  useEffect(showUserTotalStakedNodes, [stakedNodesLoading, stakedNodes, user]);

  function showClaimableRewards() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const claimableRewardsLabel = container.querySelector(
      `#${CLAIMABLE_REWARDS_LABEL_ID}`
    );
    if (!claimableRewardsLabel) return;

    const shouldShow = !stakedNodesLoading && user && stakedNodes;
    if (!shouldShow) {
      claimableRewardsLabel.innerHTML = "---";
      return;
    }

    const claimableValue = stakedNodes.totalRewards.toLocaleString(undefined, {
      maximumFractionDigits: 4,
    });

    claimableRewardsLabel.innerHTML = claimableValue;
  }
  useEffect(showClaimableRewards, [stakedNodesLoading, stakedNodes, user]);

  return null;
}
