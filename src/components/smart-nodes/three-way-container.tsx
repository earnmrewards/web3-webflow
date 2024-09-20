import { useCallback, useEffect, useState } from "react";
import { isInsideContainer } from "../../utils/is-inside-container";
import { useUser } from "@account-kit/react";
import { BASE_VALUES } from "./config";
import { useNavigate } from "../../contexts/use-navigate";

const SELECTION_CONTAINER_ID = "web3-smart-nodes-selection";
const SMART_NODES_VALUE_ID = "web3-smart-nodes-amount";
const EARN_PHONE_VALUE_ID = "web3-smart-nodes-phone-amount";
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

    container.style.display = queryAmount > 0 || !user ? "none" : "flex";
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

  function handleBonusLabelVisibility() {
    const hasSmartNodes = amount >= BASE_VALUES[1];
    const smartNodesSpan = document.getElementById(SMART_NODES_VALUE_ID);
    if (
      smartNodesSpan &&
      isInsideContainer(SELECTION_CONTAINER_ID, SMART_NODES_VALUE_ID)
    ) {
      smartNodesSpan.style.display = hasSmartNodes ? "block" : "none";
    }

    const hasEarnPhone = amount >= BASE_VALUES[2];
    const earnPhoneSpan = document.getElementById(EARN_PHONE_VALUE_ID);
    if (
      earnPhoneSpan &&
      isInsideContainer(SELECTION_CONTAINER_ID, SMART_NODES_VALUE_ID)
    ) {
      earnPhoneSpan.style.display = hasEarnPhone ? "block" : "none";
    }
  }
  useEffect(handleBonusLabelVisibility, [amount]);

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
