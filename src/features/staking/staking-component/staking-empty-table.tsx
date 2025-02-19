import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useEffect, useMemo } from "react";
import { StakeOption } from "./types";
import { STAKING_COMPONENT_ACTIONS_ID, STAKING_CONTENT_ID } from "../config";

interface StakingEmptyTableProps {
  stakeOption: StakeOption;
}

export function StakingEmptyTable({ stakeOption }: StakingEmptyTableProps) {
  const { data: heldNodes, loading: loadingHeldNodes } = useHeldNodes({
    page: 1,
    take: 1,
  });
  const { data: stakedNodes, loading: loadingStakedNodes } = useStakedNodes({
    page: 1,
    take: 1,
  });

  const hasNodes = useMemo(() => {
    const nodes = stakeOption === "available" ? heldNodes : stakedNodes;
    if (!nodes) return false;

    return nodes.count > 0;
  }, [heldNodes, stakedNodes, stakeOption]);

  useEffect(() => {
    if (loadingStakedNodes || loadingHeldNodes) return;

    const content = document.getElementById(STAKING_CONTENT_ID);
    if (content) {
      content.style.display = hasNodes ? "block" : "none";
    }

    const actionComponent = document.getElementById(
      STAKING_COMPONENT_ACTIONS_ID
    );
    if (actionComponent) {
      actionComponent.style.display = hasNodes ? "flex" : "none";
    }
  }, [loadingHeldNodes, loadingStakedNodes, hasNodes]);

  if (hasNodes || loadingStakedNodes || loadingHeldNodes) return null;

  return (
    <div className="text-[#6C6C6C] text-lg text-center">
      {stakeOption === "available"
        ? `You don’t have any SmartNodes avalaible yet`
        : `You haven't staked any SmartNodes yet`}
    </div>
  );
}
