import { useUser } from "@account-kit/react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { STAKING_COMPONENT_ID, STAKING_SELECTOR_ID } from "../config";
import { selectionOptions, StakeOption } from "./types";

interface StakingSelectorProps {
  stakeOption: StakeOption;
  setStakeOption: Dispatch<SetStateAction<StakeOption>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSelectionMode: Dispatch<SetStateAction<boolean>>;
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
}

export function StakingSelector({
  stakeOption,
  setStakeOption,
  setPage,
  setSelectionMode,
  setSelectedNodes,
}: StakingSelectorProps) {
  const user = useUser();

  function getComponent() {
    const component = document.getElementById(
      STAKING_COMPONENT_ID
    ) as HTMLElement;
    if (!component) return;

    return component;
  }

  const handleStakeOptionClick = useCallback(
    (option: StakeOption) => {
      if (!user) return;

      setStakeOption(option);
      setPage(1);
      setSelectionMode(false);
      setSelectedNodes([]);
    },
    [user, setStakeOption, setPage, setSelectionMode, setSelectedNodes]
  );

  useEffect(() => {
    const component = getComponent();
    if (!component) return;

    const selector = component.querySelector(`#${STAKING_SELECTOR_ID}`);
    if (!selector) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      selector.querySelectorAll("a");
    for (const [index, anchor] of anchors.entries()) {
      anchor.style.cursor = user ? "pointer" : "not-allowed";
      anchor.addEventListener("click", () =>
        handleStakeOptionClick(selectionOptions[index])
      );
    }

    return () => {
      for (const [index, anchor] of anchors.entries()) {
        anchor.removeEventListener("click", () =>
          handleStakeOptionClick(selectionOptions[index])
        );
      }
    };
  }, [user, handleStakeOptionClick]);

  function changeStakeButtonColor() {
    const component = getComponent();
    if (!component) return;

    const selector = component.querySelector(`#${STAKING_SELECTOR_ID}`);
    if (!selector) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      selector.querySelectorAll("a");
    for (const [index, anchor] of anchors.entries()) {
      const isSelected =
        index ===
        selectionOptions.findIndex((option) => option === stakeOption);

      anchor.style.borderBottom = isSelected ? "2px solid #02D632" : "";
      anchor.style.color = isSelected ? "#02D632" : "#A8A8A8";
    }
  }
  useEffect(changeStakeButtonColor, [stakeOption]);

  return null;
}
