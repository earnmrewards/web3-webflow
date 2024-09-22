import { useCallback, useEffect, useState } from "react";
import { isInsideContainer } from "../../utils/is-inside-container";
import { useUser } from "@account-kit/react";
import { BASE_VALUES, YELLOW_COLOR } from "./config";
import { useNavigate } from "../../contexts/use-navigate";

const SELECTION_CONTAINER_ID = "web3-smart-nodes-selection";
const SMART_NODES_VALUE_ID = "web3-smart-nodes-amount";
const EARN_PHONE_VALUE_ID = "web3-smart-nodes-phone-amount";
const LOWER_VALUE_ID = "web3-smart-nodes-lower-value";
const REVIEW_BUTTON_ID = "web3-smart-nodes-review-button";

export function ThreeWayContainer() {
  const [amount, setAmount] = useState(1);
  const user = useUser();
  const { navigate, searchParams } = useNavigate();

  const queryAmount = Number(searchParams.get("amount"));

  function handleClickOption(index: number) {
    setAmount(BASE_VALUES[index]);
  }

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const value = parseInt(target.value);
    if (isNaN(value)) return;

    setAmount(value);
  }

  const handleOrderClick = useCallback(() => {
    const searchParams = new URLSearchParams({ amount: String(amount) });
    navigate({ query: searchParams });
  }, [amount, navigate]);

  function changeContainerVisibility() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container) return;

    container.style.display = queryAmount > 0 || !user ? "none" : "block";
  }
  useEffect(changeContainerVisibility, [user, queryAmount]);

  function addOptionsButtonEvent() {
    const container = document.getElementById(SELECTION_CONTAINER_ID);
    if (!container) return;

    const buttons = document.getElementsByTagName("button");
    if (buttons.length === 0) return;

    for (const [index, button] of Array.from(buttons).entries()) {
      if (index >= BASE_VALUES.length) return;

      button.addEventListener("click", () => handleClickOption(index));
    }

    return () => {
      for (const [index, button] of Array.from(buttons).entries()) {
        if (index >= BASE_VALUES.length) return;

        button.removeEventListener("click", () => handleClickOption(index));
      }
    };
  }
  useEffect(addOptionsButtonEvent, []);

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
    if (!container) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.addEventListener("input", handleInputChange);

    return () => {
      input.removeEventListener("input", handleInputChange);
    };
  }
  useEffect(addInputEvent, []);

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
      const canShow = amount >= BASE_VALUES[baseValueIndex];
      const component = document.getElementById(componentId);

      if (component && isInsideContainer(SELECTION_CONTAINER_ID, componentId)) {
        component.style.display = canShow ? "block" : "none";
        component.innerText = "";

        const yellowLabel = document.createElement("strong");
        let yellowAmount = value;
        if (!yellowAmount) {
          yellowAmount = `+${parseInt(String(amount / BASE_VALUES[1]))}`;
        }

        yellowLabel.innerText = yellowAmount;
        yellowLabel.style.color = YELLOW_COLOR;
        component.appendChild(yellowLabel);
        component.appendChild(document.createTextNode(` ${text}`));
      }
    }
  }
  useEffect(handleBonusesVisibility, [amount]);

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
