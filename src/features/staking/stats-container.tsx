import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useTotalStakedNodes } from "@/hooks/staking/use-total-staked-nodes";
import {
  CLAIMABLE_REWARDS_LABEL_ID,
  SN_AMOUNT_LABEL_ID,
  STAKED_AMOUNT_LABEL_ID,
  STAKING_CONTAINER_ID,
  TOTAL_STAKED_AMOUNT_LABEL_ID,
  USER_TOTAL_STAKED_AMOUNT_LABEL_ID,
} from "./config";
import { useEffect } from "react";
import { useUser } from "@account-kit/react";
import { useUserTotalStakedNodes } from "@/hooks/staking/use-user-total-staked-nodes";
import { useOwnedNFTs } from "@/hooks/staking/use-owned-nfts";
import { useClaimableRewards } from "@/hooks/staking/use-claimable-rewards";

export function StatsContainer() {
  const user = useUser();

  const {
    data: { totalCount: smartNodesCount },
    isFetching: smartNodesFetching,
  } = useOwnedNFTs();
  const { data: stakedNodes, isFetching: stakedNodesFetching } =
    useStakedNodes();
  const { data: totalStakedNodes, isFetching: totalStakedNodesFetching } =
    useTotalStakedNodes();
  const {
    data: userTotalStakedNodes,
    isFetching: userTotalStakedNodesFetching,
  } = useUserTotalStakedNodes();
  const { data: claimableRewards, isFetching: claimableRewardsFetching } =
    useClaimableRewards();

  function showSmartNodesAmount() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const snAmountLabel = container.querySelector(`#${SN_AMOUNT_LABEL_ID}`);
    if (!snAmountLabel) return;

    const shouldShow = !smartNodesFetching && user;
    snAmountLabel.innerHTML = shouldShow ? smartNodesCount.toString() : "---";
  }
  useEffect(showSmartNodesAmount, [smartNodesFetching, smartNodesCount, user]);

  function showStakedAmount() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const stakedLabel = container.querySelector(`#${STAKED_AMOUNT_LABEL_ID}`);
    if (!stakedLabel) return;

    const shouldShow = !stakedNodesFetching && user;
    stakedLabel.innerHTML = shouldShow ? stakedNodes.toString() : "---";
  }
  useEffect(showStakedAmount, [stakedNodesFetching, stakedNodes, user]);

  function showTotalStakedNodes() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const totalStakedLabel = container.querySelector(
      `#${TOTAL_STAKED_AMOUNT_LABEL_ID}`
    );
    if (!totalStakedLabel) return;

    const shouldShow = !totalStakedNodesFetching && user;
    totalStakedLabel.innerHTML = shouldShow
      ? totalStakedNodes.toString()
      : "---";
  }
  useEffect(showTotalStakedNodes, [
    totalStakedNodesFetching,
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

    const shouldShow = !userTotalStakedNodesFetching && user;
    userTotalStakedLabel.innerHTML = shouldShow
      ? userTotalStakedNodes.toString()
      : "---";
  }
  useEffect(showUserTotalStakedNodes, [
    userTotalStakedNodesFetching,
    userTotalStakedNodes,
    user,
  ]);

  function showClaimableRewards() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const claimableRewardsLabel = container.querySelector(
      `#${CLAIMABLE_REWARDS_LABEL_ID}`
    );
    if (!claimableRewardsLabel) return;

    const claimableValue = claimableRewards.toLocaleString(undefined, {
      maximumFractionDigits: 4,
    });

    const shouldShow = !claimableRewardsFetching && user;
    claimableRewardsLabel.innerHTML = shouldShow ? claimableValue : "---";
  }
  useEffect(showClaimableRewards, [
    claimableRewards,
    claimableRewardsFetching,
    user,
  ]);

  return null;
}
