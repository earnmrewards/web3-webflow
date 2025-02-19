import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { STAKING_COMPONENT_ACTIONS_ID } from "../config";
import { StakeOption } from "./types";

interface StakingTriggerProps {
  selectionMode: boolean;
  setSelectionMode: Dispatch<SetStateAction<boolean>>;
  stakeOption: StakeOption;
}

export function StakingTrigger({
  selectionMode,
  setSelectionMode,
  stakeOption,
}: StakingTriggerProps) {
  const handleSelectionMode = useCallback(() => {
    if (selectionMode) return;

    setSelectionMode(true);
  }, [selectionMode, setSelectionMode]);

  function addSelectionModeListener() {
    const component = document.getElementById(STAKING_COMPONENT_ACTIONS_ID);
    if (!component) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      component.querySelectorAll("a");
    const anchor = anchors[0];
    if (!anchor) return;

    anchor.addEventListener("click", handleSelectionMode);
  }

  useEffect(addSelectionModeListener, [selectionMode, handleSelectionMode]);

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
