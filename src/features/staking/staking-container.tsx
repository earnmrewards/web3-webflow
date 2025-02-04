import { useCallback, useEffect, useState } from "react";
import {
  SELECTOR_AMOUNT_INPUT_ID,
  SELECTOR_MAX_BUTTON_ID,
  SELECTOR_RANGE_INPUT_ID,
  STAKING_CONTAINER_ID,
  STAKING_SELECTOR_ID,
  STAKING_TRIGGER_BUTTON_ID,
} from "./config";
import { useOwnedNFTs } from "@/hooks/staking/use-owned-nfts";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useStake } from "@/hooks/staking/use-stake";
import { ERROR_COMPONENT_ID } from "../global-config";

export function StakingContainer() {
  const [stakeType, setStakeType] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState(0);

  const { data: smartNodes, isFetching: smartNodesFetching } = useOwnedNFTs();
  const { data: stakedNodes, isFetching: stakedNodesFetching } =
    useStakedNodes();

  const { stake, unStake, error } = useStake({ amount });

  const getMaxAmount = useCallback(
    () => (stakeType === "stake" ? smartNodes?.length ?? 0 : stakedNodes),
    [stakeType, smartNodes, stakedNodes]
  );

  function handleStakeButtonClick() {
    setStakeType((type) => (type === "stake" ? "unstake" : "stake"));
    setAmount(0);
  }

  function changeStakeType() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const selector = container.querySelector(`#${STAKING_SELECTOR_ID}`);
    if (!selector) return;

    const buttons: NodeListOf<HTMLButtonElement> =
      selector.querySelectorAll("button");
    for (const button of buttons) {
      button.addEventListener("click", handleStakeButtonClick);
    }

    return () => {
      for (const button of buttons) {
        button.removeEventListener("click", handleStakeButtonClick);
      }
    };
  }
  useEffect(changeStakeType, []);

  function changeStakeButtonColor() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const selector = container.querySelector(`#${STAKING_SELECTOR_ID}`);
    if (!selector) return;

    const buttons: NodeListOf<HTMLButtonElement> =
      selector.querySelectorAll("button");
    for (const [index, button] of buttons.entries()) {
      const stakeTypeIndex = stakeType === "stake" ? 0 : 1;

      if (stakeTypeIndex === index) {
        button.classList.add("border-b");
        button.classList.add("border-b-[#02D632]");
      } else {
        button.classList.remove("border-b");
        button.classList.remove("border-b-[#02D632]");
      }
    }
  }
  useEffect(changeStakeButtonColor, [stakeType]);

  const handleMaxButtonClick = useCallback(() => {
    const fetching =
      stakeType === "stake" ? smartNodesFetching : stakedNodesFetching;
    const maxAmount = getMaxAmount();
    if (fetching || maxAmount === 0) return;

    setAmount(maxAmount);
  }, [stakeType, smartNodesFetching, stakedNodesFetching, getMaxAmount]);

  function maxButtonBehavior() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const button = container.querySelector(
      `#${SELECTOR_MAX_BUTTON_ID}`
    ) as HTMLButtonElement;
    if (!button) return;

    button.addEventListener("click", handleMaxButtonClick);

    return () => {
      button.removeEventListener("click", handleMaxButtonClick);
    };
  }
  useEffect(maxButtonBehavior, [handleMaxButtonClick]);

  function defineRangeInputValues() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const range = container.querySelector(
      `#${SELECTOR_RANGE_INPUT_ID}`
    ) as HTMLInputElement;
    if (!range) return;

    range.max = getMaxAmount().toString();
  }
  useEffect(defineRangeInputValues, [getMaxAmount]);

  const handleInputValueChange = useCallback(
    (event: Event) => {
      const target = event.target as HTMLInputElement;

      if (getMaxAmount() === 0) {
        target.value = String(0);
        return;
      }

      setAmount(Number(target.value));
    },
    [getMaxAmount]
  );

  function addInputsEvent() {
    const inputIds = [SELECTOR_RANGE_INPUT_ID, SELECTOR_AMOUNT_INPUT_ID];
    const components: HTMLInputElement[] = [];

    for (const id of inputIds) {
      const input = document.getElementById(id) as HTMLInputElement;
      if (!input) return;

      components.push(input);
    }

    for (const component of components) {
      component.addEventListener("change", handleInputValueChange);
    }

    return () => {
      for (const component of components) {
        component.removeEventListener("change", handleInputValueChange);
      }
    };
  }
  useEffect(addInputsEvent, [handleInputValueChange]);

  function updateInputs() {
    const inputIds = [SELECTOR_RANGE_INPUT_ID, SELECTOR_AMOUNT_INPUT_ID];
    for (const id of inputIds) {
      const input = document.getElementById(id) as HTMLInputElement;
      if (!input) return;

      input.value = String(amount);
    }
  }
  useEffect(updateInputs, [amount]);

  function triggerStake() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const button = container.querySelector(
      `#${STAKING_TRIGGER_BUTTON_ID}`
    ) as HTMLButtonElement;
    if (!button) return;

    button.addEventListener("click", stakeType === "stake" ? stake : unStake);

    return () => {
      button.removeEventListener(
        "click",
        stakeType === "stake" ? stake : unStake
      );
    };
  }
  useEffect(triggerStake, [stakeType, stake, unStake]);

  function showErrorText() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const textLabels: NodeListOf<HTMLParagraphElement> =
      container.querySelectorAll(`#${ERROR_COMPONENT_ID}`);
    for (const label of textLabels) {
      label.innerText = error;
    }
  }
  useEffect(showErrorText, [error]);

  return null;
}
