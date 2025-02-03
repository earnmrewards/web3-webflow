import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useTotalStakedNodes } from "@/hooks/staking/use-total-staked-nodes";
import {
  STAKED_AMOUNT_LABEL_ID,
  STAKING_CONTAINER_ID,
  TOTAL_STAKED_AMOUNT_LABEL_ID,
} from "./config";
import { useEffect } from "react";

export function StatsContainer() {
  const { data: stakedNodes, isFetching: stakedNodesFetching } =
    useStakedNodes();
  const { data: totalStakedNodes, isFetching: totalStakedNodesFetching } =
    useTotalStakedNodes();

  function showStakedAmount() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const stakedLabel = container.querySelector(`#${STAKED_AMOUNT_LABEL_ID}`);
    if (!stakedLabel) return;

    stakedLabel.innerHTML = stakedNodesFetching
      ? "---"
      : stakedNodes.toString();
  }
  useEffect(showStakedAmount, [stakedNodes, stakedNodesFetching]);

  function showTotalStakedNodes() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const totalStakedLabel = container.querySelector(
      `#${TOTAL_STAKED_AMOUNT_LABEL_ID}`
    );
    if (!totalStakedLabel) return;

    totalStakedLabel.innerHTML = totalStakedNodesFetching
      ? "---"
      : totalStakedNodes.toString();
  }
  useEffect(showTotalStakedNodes, [totalStakedNodes, totalStakedNodesFetching]);

  return null;
}
