import { useCallback, useEffect, useState } from "react";
import { useUser } from "@account-kit/react";
import {
  AMOUNT_FINAL_LABEL_ID,
  BACK_BUTTON_ID,
  BASE_VALUES,
  BONUS_FINAL_LABEL_ID,
  CHECKBOX_BUTTON_ID,
  ERROR_COMPONENT_ID,
  LOADING_COMPONENT_ID,
  ORDER_CONTAINER_ID,
  ORDER_REVIEW_BUTTON_ID,
  PHONE_FINAL_LABEL_ID,
  STORAGE_KEY,
  TOTAL_NODES_LABEL_ID,
  UNIT_NODE_LABEL_ID,
} from "./config";
import { useNavigate } from "../../contexts/use-navigate";
import { useSmartNodesMint } from "../../hooks/use-smart-nodes-mint";
import { getValueByTier } from "./get-value-by-tier";
import { useStore } from "../../contexts/use-store";

export function OrderContainer() {
  const [referralCode, setReferralCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [price, setPrice] = useState(0);

  const user = useUser();
  const store = useStore();
  const { back, searchParams } = useNavigate();
  const amount = Number(searchParams.get("amount"));
  const hasOperationResult = !!searchParams.get("operationResult");
  const bonusType = Number(searchParams.get("bonusType")) || 1;

  const { mint, error, loading } = useSmartNodesMint({
    referralCode,
    amount,
    bonusType,
    price,
  });

  function changeContainerVisibility() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container) return;

    const storedEmail = store.get(STORAGE_KEY);
    const shouldShow = user && amount > 0 && !hasOperationResult && storedEmail;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeContainerVisibility, [
    user,
    amount,
    hasOperationResult,
    store,
  ]);

  function addBackButtonEvent() {
    if (amount <= 0) return;

    const backButton = document.getElementById(BACK_BUTTON_ID);
    if (!backButton) return;

    backButton.addEventListener("click", back);

    return () => {
      backButton.removeEventListener("click", back);
    };
  }
  useEffect(addBackButtonEvent, [amount, back]);

  function handleSmartNodeValue() {
    const tierLabel = document.querySelector(".tier-letter") as HTMLSpanElement;
    let tier = "S";
    if (tierLabel) {
      tier = tierLabel.innerText;
    }

    const priceValue = getValueByTier(tier);
    const unitPriceLabel = document.getElementById(UNIT_NODE_LABEL_ID);
    if (unitPriceLabel) {
      unitPriceLabel.innerText = priceValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      setPrice(priceValue);
    }

    const totalPriceLabel = document.getElementById(TOTAL_NODES_LABEL_ID);
    if (!totalPriceLabel) return;

    totalPriceLabel.innerText = (amount * priceValue).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  useEffect(handleSmartNodeValue, [amount]);

  function handleLabelsValue() {
    if (amount <= 0) return;

    const labels = [
      {
        id: AMOUNT_FINAL_LABEL_ID,
        value: amount,
      },
      {
        id: BONUS_FINAL_LABEL_ID,
        value: parseInt(
          String(amount >= BASE_VALUES[1] ? amount / BASE_VALUES[1] : 0)
        ),
      },
      {
        id: PHONE_FINAL_LABEL_ID,
        value: amount >= BASE_VALUES[1] ? "Yes" : "No",
      },
    ];

    for (const { id, value } of labels) {
      const component = document.getElementById(id);
      if (!component) continue;

      component.innerText = String(value);
    }
  }
  useEffect(handleLabelsValue, [amount]);

  function handleInputEvent(event: Event) {
    const target = event.target as HTMLInputElement;

    setReferralCode(target.value);
  }

  function blockNativeSubmitEvent(event: KeyboardEvent) {
    if (event.key === "Enter") event.preventDefault();
  }

  function addInputEvent() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.addEventListener("keypress", blockNativeSubmitEvent);
    input.addEventListener("input", handleInputEvent);

    return () => {
      input.removeEventListener("keypress", blockNativeSubmitEvent);
      input.removeEventListener("input", handleInputEvent);
    };
  }
  useEffect(addInputEvent, []);

  function handleCheckboxEvent() {
    setAgreed((prev) => !prev);
  }

  function checkboxButtonEvent() {
    const checkbox = document.getElementById(CHECKBOX_BUTTON_ID);
    if (!checkbox) return;

    checkbox.addEventListener("click", handleCheckboxEvent);

    return () => {
      checkbox.removeEventListener("click", handleCheckboxEvent);
    };
  }
  useEffect(checkboxButtonEvent, []);

  const handleReviewButton = useCallback(
    (event: Event) => {
      if (!agreed) return;
      mint(event);
    },
    [mint, agreed]
  );

  function reviewOrderButtonEvent() {
    const button = document.getElementById(ORDER_REVIEW_BUTTON_ID);
    if (!button) return;

    button.addEventListener("click", handleReviewButton);

    return () => {
      button.removeEventListener("click", handleReviewButton);
    };
  }
  useEffect(reviewOrderButtonEvent, [handleReviewButton]);

  function reviewOrderButtonBackgroundHandler() {
    const button = document.getElementById(ORDER_REVIEW_BUTTON_ID);
    if (!button) return;

    button.style.backgroundColor = agreed ? "#f9fd30" : "#98997D";
    button.style.cursor = agreed ? "pointer" : "not-allowed";
  }
  useEffect(reviewOrderButtonBackgroundHandler, [agreed]);

  function showErrorText() {
    const textLabels: NodeListOf<HTMLParagraphElement> =
      document.querySelectorAll(`#${ERROR_COMPONENT_ID}`);
    if (textLabels.length === 0) return;

    for (const label of textLabels) {
      label.innerText = error;
    }
  }
  useEffect(showErrorText, [error]);

  function showLoadingContainer() {
    const container = document.getElementById(LOADING_COMPONENT_ID);
    if (!container) return;

    container.style.display = loading ? "block" : "none";
  }
  useEffect(showLoadingContainer, [loading]);

  return null;
}
