import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useTotalStakedNodes } from "@/hooks/staking/use-total-staked-nodes";
import {
  STAKED_AMOUNT_LABEL_ID,
  STAKING_CONTAINER_ID,
  TOTAL_STAKED_AMOUNT_LABEL_ID,
  USER_TOTAL_STAKED_AMOUNT_LABEL_ID,
} from "./config";
import { useEffect } from "react";
import { useUser } from "@account-kit/react";
import { useUserTotalStakedNodes } from "@/hooks/staking/use-user-total-staked-nodes";

export function StatsContainer() {
  const user = useUser();

  const { data: stakedNodes, isFetching: stakedNodesFetching } =
    useStakedNodes();
  const { data: totalStakedNodes, isFetching: totalStakedNodesFetching } =
    useTotalStakedNodes();
  const {
    data: userTotalStakedNodes,
    isFetching: userTotalStakedNodesFetching,
  } = useUserTotalStakedNodes();

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

  return null;
}
