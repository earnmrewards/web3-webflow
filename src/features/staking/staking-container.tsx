import { useCallback, useEffect, useState } from "react";
import {
  BUY_MORE_TRIGGER_BUTTON_ID,
  SELECTOR_AMOUNT_INPUT_ID,
  SELECTOR_AMOUNT_LABEL_ID,
  SELECTOR_MAX_BUTTON_ID,
  SELECTOR_RANGE_INPUT_ID,
  STAKING_CONTAINER_ID,
  STAKING_SELECTOR_ID,
  STAKING_TRIGGER_BUTTON_ID,
} from "./config";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { ERROR_COMPONENT_ID } from "../global-config";
import { useStake } from "@/contexts/staking/use-stake";
import { blockNativeSubmitEvent } from "@/utils/block-native-submit-event";
import { useUser } from "@account-kit/react";
import { useHeldNodes } from "@/hooks/staking/use-held-nodes";

export function StakingContainer() {
  const user = useUser();

  const [stakeType, setStakeType] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState(0);

  const { data: smartNodes, loading: smartNodesLoading } = useHeldNodes({
    page: 1,
    take: 100,
  });
  const { data: stakedNodes, loading: stakedNodesLoading } = useStakedNodes({
    page: 1,
    take: 100,
  });

  const { stake, unstake, error } = useStake();

  const getMaxAmount = useCallback(
    () =>
      stakeType === "stake" ? smartNodes?.count ?? 0 : stakedNodes?.count ?? 0,
    [stakeType, smartNodes, stakedNodes]
  );

  const handleStakeButtonClick = useCallback(() => {
    if (!user) return;

    setStakeType((type) => (type === "stake" ? "unstake" : "stake"));
    setAmount(0);
  }, [user]);

  function resetValuesWhenDisconnect() {
    if (user) return;

    setAmount(0);
    setStakeType("stake");
  }
  useEffect(resetValuesWhenDisconnect, [user]);

  function changeStakeType() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const selector = container.querySelector(`#${STAKING_SELECTOR_ID}`);
    if (!selector) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      selector.querySelectorAll("a");
    for (const anchor of anchors) {
      anchor.style.cursor = user ? "pointer" : "not-allowed";
      anchor.addEventListener("click", handleStakeButtonClick);
    }

    return () => {
      for (const anchor of anchors) {
        anchor.removeEventListener("click", handleStakeButtonClick);
      }
    };
  }
  useEffect(changeStakeType, [user, handleStakeButtonClick]);

  function changeStakeButtonColor() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const selector = container.querySelector(`#${STAKING_SELECTOR_ID}`);
    if (!selector) return;

    const anchors: NodeListOf<HTMLAnchorElement> =
      selector.querySelectorAll("a");
    for (const [index, anchor] of anchors.entries()) {
      const stakeTypeIndex = stakeType === "stake" ? 0 : 1;

      if (stakeTypeIndex === index) {
        anchor.style.borderBottom = "2px solid #02D632";
        anchor.style.color = "white";
      } else {
        anchor.style.borderBottom = "";
        anchor.style.color = "#A8A8A8";
      }
    }
  }
  useEffect(changeStakeButtonColor, [stakeType]);

  const handleMaxButtonClick = useCallback(() => {
    const fetching =
      stakeType === "stake" ? smartNodesLoading : stakedNodesLoading;
    const maxAmount = getMaxAmount();
    if (fetching || maxAmount === 0) return;

    setAmount(maxAmount > 100 ? 100 : maxAmount);
  }, [stakeType, smartNodesLoading, stakedNodesLoading, getMaxAmount]);

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

    const maxAmount = getMaxAmount() > 100 ? 100 : getMaxAmount();

    range.max = maxAmount.toString();
    range.type = "range";
    range.style.accentColor = "#00D632";
  }
  useEffect(defineRangeInputValues, [getMaxAmount]);

  const handleInputValueChange = useCallback(
    (event: Event) => {
      const target = event.target as HTMLInputElement;

      if (getMaxAmount() === 0) {
        target.value = String(0);
        return;
      }

      if (Number(target.value) > 100) {
        target.value = String(100);
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
      component.addEventListener("keypress", blockNativeSubmitEvent);
    }

    return () => {
      for (const component of components) {
        component.removeEventListener("change", handleInputValueChange);
        component.removeEventListener("keypress", blockNativeSubmitEvent);
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

  const handleTrigger = useCallback(() => {
    stakeType === "stake" ? stake(amount) : unstake(amount);
  }, [stakeType, amount, stake, unstake]);

  function triggerStake() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const button = container.querySelector(
      `#${STAKING_TRIGGER_BUTTON_ID}`
    ) as HTMLAnchorElement;
    if (!button) return;

    const shouldDisable = amount === 0;
    button.style.backgroundColor = shouldDisable ? "#E2E2E2" : "white";
    button.style.color = shouldDisable ? "#A0A0A0" : "black";
    button.style.cursor = shouldDisable ? "not-allowed" : "pointer";
    button.style.textTransform = "capitalize";

    button.innerText = `${stakeType} SmartNodes`;

    button.addEventListener("click", handleTrigger);

    return () => {
      button.removeEventListener("click", handleTrigger);
    };
  }
  useEffect(triggerStake, [amount, handleTrigger, stakeType]);

  function changeBuyMoreButtonVisibility() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const button = container.querySelector(
      `#${BUY_MORE_TRIGGER_BUTTON_ID}`
    ) as HTMLElement;
    if (!button) return;

    button.style.display = stakeType === "stake" ? "block" : "none";
  }
  useEffect(changeBuyMoreButtonVisibility, [stakeType]);

  function changeAmountLabelText() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const label = container.querySelector(
      `#${SELECTOR_AMOUNT_LABEL_ID}`
    ) as HTMLElement;
    if (!label) return;

    label.style.textTransform = "capitalize";
    label.innerText = `Amount To ${stakeType}`;
  }
  useEffect(changeAmountLabelText, [stakeType]);

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
