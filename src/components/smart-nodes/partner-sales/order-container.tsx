import { usePartner } from "@/contexts/use-partner";
import { useCallback, useEffect, useState } from "react";
import {
  ORDER_AMOUNT_LABEL_ID,
  ORDER_CONTAINER_ID,
  ORDER_TOTAL_COST_ID,
  ORDER_UNIT_PRICE_ID,
} from "./config";
import { useSmartNodesPartnerTransfer } from "@/hooks/use-smart-nodes-partner-transfer";
import {
  AMOUNT_FINAL_LABEL_ID,
  BACK_BUTTON_ID,
  BASE_VALUES,
  BONUS_FINAL_LABEL_ID,
  CHECKBOX_BUTTON_ID,
  ERROR_COMPONENT_ID,
  LOADING_COMPONENT_ID,
  ORDER_REVIEW_BUTTON_ID,
  PHONE_FINAL_LABEL_ID,
  STORAGE_KEY,
} from "../config";
import { useUser } from "@account-kit/react";
import { useNavigate } from "@/contexts/use-navigate";
import { useStore } from "@/contexts/use-store";

export function OrderContainer() {
  const [referralCode, setReferralCode] = useState("");
  const [agreed, setAgreed] = useState(false);

  const { searchParams } = useNavigate();

  const amount = Number(searchParams.get("amount"));
  const hasOperationResult = !!searchParams.get("operationResult");
  const bonusPlan = Number(searchParams.get("bonusPlan")) || 1;

  const { back } = useNavigate();
  const user = useUser();
  const store = useStore();
  const { data, loading: partnerDataLoading } = usePartner();
  const { transfer, loading, error } = useSmartNodesPartnerTransfer({
    referralCode,
    amount,
    bonusPlan,
  });

  function changeVisibility() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container) return;

    const storedEmail = store.get(STORAGE_KEY);
    const notSoldOut =
      !partnerDataLoading && data && data.availableSmartNodes > 0;
    const shouldShow =
      user && notSoldOut && amount > 0 && !hasOperationResult && storedEmail;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeVisibility, [
    user,
    data,
    partnerDataLoading,
    hasOperationResult,
    amount,
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

  function updateAmount() {
    if (!data) return;

    const amountLabel = document.getElementById(ORDER_AMOUNT_LABEL_ID);
    if (amountLabel) {
      amountLabel.innerText = data.availableSmartNodes.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    const unitLabel = document.getElementById(ORDER_UNIT_PRICE_ID);
    if (unitLabel) {
      unitLabel.innerText = data.currentPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    const costLabel = document.getElementById(ORDER_TOTAL_COST_ID);
    if (costLabel) {
      const totalCost = amount * data.currentPrice;
      costLabel.innerText = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
  }
  useEffect(updateAmount, [data, amount]);

  function updateBonus() {
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
  useEffect(updateBonus, [amount]);

  function handleInputEvent(event: Event) {
    const target = event.target as HTMLInputElement;

    setReferralCode(target.value);
  }

  function blockNativeSubmitEvent(event: KeyboardEvent) {
    if (event.key === "Enter") event.preventDefault();
  }

  function addInputEvent() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container || !data) return;

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
  useEffect(addInputEvent, [data]);

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
      transfer(event);
    },
    [transfer, agreed]
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
