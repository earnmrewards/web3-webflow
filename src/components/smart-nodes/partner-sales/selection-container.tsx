import { useCallback, useEffect, useState } from "react";
import { isInsideContainer } from "../../../utils/is-inside-container";
import { useUser } from "@account-kit/react";
import {
  BASE_VALUES,
  BONUS_PLAN_VALUES,
  STORAGE_KEY,
  YELLOW_COLOR,
} from "../config";
import { useNavigate } from "../../../contexts/use-navigate";
import { useStore } from "../../../contexts/use-store";
import { usePartner } from "@/contexts/use-partner";

const SELECTION_CONTAINER_ID = "web3-smart-nodes-selection";
const SMART_NODES_VALUE_ID = "web3-smart-nodes-amount";
const EARN_PHONE_VALUE_ID = "web3-smart-nodes-phone-amount";
const LOWER_VALUE_ID = "web3-smart-nodes-lower-value";
const REVIEW_BUTTON_ID = "web3-smart-nodes-review-button";

export function SelectionContainer() {
  const [amount, setAmount] = useState(1);

  const user = useUser();
  const { navigate, searchParams } = useNavigate();
  const store = useStore();
  const { data, loading } = usePartner();

  const queryAmount = Number(searchParams.get("amount"));
  const hasOperationResult = !!searchParams.get("operationResult");
  const bonusPlan = Number(searchParams.get("bonusPlan")) || 1;

  function changeContainerVisibility() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container) return;

    const storedEmail = store.get(STORAGE_KEY);
    const hasValidPartner = !loading && data && data.availableSmartNodes > 0;
    const shouldShow =
      user &&
      queryAmount <= 0 &&
      !hasOperationResult &&
      storedEmail &&
      hasValidPartner;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeContainerVisibility, [
    user,
    queryAmount,
    hasOperationResult,
    store,
    loading,
    data,
  ]);

  const handleClickOption = useCallback(
    (index: number) => {
      setAmount(BONUS_PLAN_VALUES[bonusPlan][index]);
    },
    [bonusPlan]
  );

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const value = parseInt(target.value);
    if (isNaN(value)) return;

    setAmount(value);
  }

  const handleOrderClick = useCallback(() => {
    if (!data) return;

    const bonusValue = parseInt(String(amount >= 3 ? amount / 3 : 0));
    if (amount + bonusValue > data?.availableSmartNodes) {
      return;
    }

    const searchParams = new URLSearchParams({ amount: String(amount) });
    navigate({ query: searchParams });
  }, [amount, navigate, data]);

  function disableOptionButtons() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container || !data) return;

    const buttons = container.getElementsByTagName("a");
    if (buttons.length === 0) return;

    for (const [index, button] of Array.from(buttons).entries()) {
      if (index >= BASE_VALUES.length) continue;

      if (BASE_VALUES[index] > data.availableSmartNodes) {
        button.style.display = "none";
      }
    }
  }
  useEffect(disableOptionButtons, [data]);

  function addOptionsButtonEvent() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container) return;

    const buttons = container.getElementsByTagName("a");
    if (buttons.length === 0) return;

    for (const [index, button] of Array.from(buttons).entries()) {
      if (index >= BASE_VALUES.length) continue;

      button.addEventListener("click", () => handleClickOption(index));

      if (bonusPlan === 2) {
        const bolderNumber = button.querySelector(
          `.bolder-smartnode-number`
        ) as HTMLElement;
        if (!bolderNumber) return;

        const planValue: Record<string, string> = {
          three: "four",
          six: "eight",
        };

        Object.keys(planValue).forEach((key) => {
          if (button.innerText.toLowerCase().includes(key)) {
            bolderNumber.innerText = planValue[key].toUpperCase();
          }
        });
      }
    }

    return () => {
      for (const [index, button] of Array.from(buttons).entries()) {
        if (index >= BASE_VALUES.length) return;

        button.removeEventListener("click", () => handleClickOption(index));
      }
    };
  }
  useEffect(addOptionsButtonEvent, [bonusPlan, handleClickOption]);

  function updateInputValueByAmount() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.value = String(amount);
  }
  useEffect(updateInputValueByAmount, [amount]);

  function addInputEvent() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container || !data) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.addEventListener("input", handleInputChange);
    return () => {
      input.removeEventListener("input", handleInputChange);
    };
  }
  useEffect(addInputEvent, [data]);

  function blockNativeSubmitEvent(event: KeyboardEvent) {
    if (event.key === "Enter") event.preventDefault();
  }

  function blockSubmitInputEvent() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.addEventListener("keypress", blockNativeSubmitEvent);
    return () => {
      input.removeEventListener("keypress", blockNativeSubmitEvent);
    };
  }
  useEffect(blockSubmitInputEvent, []);

  function handleBonusesVisibility() {
    const bonuses = [
      {
        baseValueIndex: 1,
        componentId: SMART_NODES_VALUE_ID,
        text: "Free SmartNodes",
      },
      {
        baseValueIndex: 1,
        componentId: EARN_PHONE_VALUE_ID,
        value: "+1",
        text: "Free EarnPhone",
      },
      {
        baseValueIndex: 1,
        componentId: LOWER_VALUE_ID,
        value: "25%",
        text: "Lower FDV",
      },
    ];

    for (const { baseValueIndex, componentId, value, text } of bonuses) {
      const canShow = amount >= BONUS_PLAN_VALUES[bonusPlan][baseValueIndex];
      const component = document.getElementById(componentId);

      if (component && isInsideContainer(SELECTION_CONTAINER_ID, componentId)) {
        component.style.display = canShow ? "block" : "none";
        component.innerText = "";

        const yellowLabel = document.createElement("strong");
        let yellowAmount = value;
        if (!yellowAmount) {
          let bonusValue = 0;
          if (bonusPlan === 1) {
            if (amount >= 9) {
              bonusValue = BASE_VALUES[1];
            } else {
              bonusValue = parseInt(
                String(amount / BONUS_PLAN_VALUES[bonusPlan][1])
              );
            }
            // TODO: Improve to a more generic rule
          } else if (bonusPlan === 2) {
            if (amount >= 8) {
              bonusValue = BONUS_PLAN_VALUES[bonusPlan][1];
            } else if (amount >= 4) {
              bonusValue = BONUS_PLAN_VALUES[bonusPlan][1] / 2;
            }
          }

          yellowAmount = `+${bonusValue}`;
        }

        yellowLabel.innerText = yellowAmount;
        yellowLabel.style.color = YELLOW_COLOR;
        component.appendChild(yellowLabel);
        component.appendChild(document.createTextNode(` ${text}`));
      }
    }
  }
  useEffect(handleBonusesVisibility, [amount, bonusPlan]);

  function addReviewButtonEvent() {
    const reviewButton = document.getElementById(REVIEW_BUTTON_ID);
    if (
      !reviewButton ||
      !isInsideContainer(SELECTION_CONTAINER_ID, REVIEW_BUTTON_ID)
    ) {
      return;
    }

    reviewButton.addEventListener("click", handleOrderClick);

    return () => {
      reviewButton.removeEventListener("click", handleOrderClick);
    };
  }
  useEffect(addReviewButtonEvent, [handleOrderClick]);

  return null;
}
