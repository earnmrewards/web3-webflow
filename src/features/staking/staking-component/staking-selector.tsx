import { useUser } from "@account-kit/react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { STAKING_COMPONENT_ID, STAKING_SELECTOR_ID } from "../config";
import { StakeOption } from "./types";

interface StakingSelectorProps {
  stakeOption: StakeOption;
  setStakeOption: Dispatch<SetStateAction<StakeOption>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSelectionMode: Dispatch<SetStateAction<boolean>>;
}

export function StakingSelector({
  stakeOption,
  setStakeOption,
  setPage,
  setSelectionMode,
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
    },
    [user, setStakeOption, setPage, setSelectionMode]
  );

  useEffect(() => {
    const component = getComponent();
    if (!component) return;

    const selector = component.querySelector(`#${STAKING_SELECTOR_ID}`);
    if (!selector) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      selector.querySelectorAll("a");
    for (const [index, anchor] of anchors.entries()) {
      const option: StakeOption = index === 0 ? "available" : "staked";
      anchor.style.cursor = user ? "pointer" : "not-allowed";
      anchor.addEventListener("click", () => handleStakeOptionClick(option));
    }

    return () => {
      for (const [index, anchor] of anchors.entries()) {
        const option: StakeOption = index === 0 ? "available" : "staked";
        anchor.removeEventListener("click", () =>
          handleStakeOptionClick(option)
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
      const stakeTypeIndex = stakeOption === "available" ? 0 : 1;

      if (stakeTypeIndex === index) {
        anchor.style.borderBottom = "2px solid #02D632";
        anchor.style.color = "#02D632";
      } else {
        anchor.style.borderBottom = "";
        anchor.style.color = "#A8A8A8";
      }
    }
  }
  useEffect(changeStakeButtonColor, [stakeOption]);

  return null;
}
