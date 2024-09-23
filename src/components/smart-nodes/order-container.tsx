import { useEffect, useState } from "react";
import { useUser } from "@account-kit/react";
import {
  AMOUNT_FINAL_LABEL_ID,
  BACK_BUTTON_ID,
  BASE_VALUES,
  BONUS_FINAL_LABEL_ID,
  ERROR_COMPONENT_ID,
  LOADING_COMPONENT_ID,
  ORDER_CONTAINER_ID,
  ORDER_REVIEW_BUTTON_ID,
  PHONE_FINAL_LABEL_ID,
} from "./config";
import { useNavigate } from "../../contexts/use-navigate";
import { useSmartNodesMint } from "../../hooks/use-smart-nodes-mint";

export function OrderContainer() {
  const [referralCode, setReferralCode] = useState("");
  const [email, setEmail] = useState("");

  const user = useUser();
  const { back, searchParams } = useNavigate();
  const amount = Number(searchParams.get("amount"));
  const hasHash = !!searchParams.get("hash");

  const { mint, error, loading } = useSmartNodesMint({
    email,
    referralCode,
    amount,
  });

  function changeContainerVisibility() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container) return;

    const shouldShow = user && amount > 0 && !hasHash;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeContainerVisibility, [user, amount, hasHash]);

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

  function handleInputEvent(event: Event, index: number) {
    const target = event.target as HTMLInputElement;

    index === 0 ? setReferralCode(target.value) : setEmail(target.value);
  }

  function addInputEvent() {
    const inputs = document.querySelectorAll(`#${ORDER_CONTAINER_ID} input`);
    if (inputs.length < 2) return;

    inputs.forEach((input, index) => {
      input.addEventListener("input", (event) =>
        handleInputEvent(event, index)
      );
    });

    return () => {
      inputs.forEach((input, index) => {
        input.removeEventListener("input", (event) =>
          handleInputEvent(event, index)
        );
      });
    };
  }
  useEffect(addInputEvent, []);

  function reviewOrderButtonEvent() {
    const button = document.getElementById(ORDER_REVIEW_BUTTON_ID);
    if (!button) return;

    button.addEventListener("click", mint);

    return () => {
      button.removeEventListener("click", mint);
    };
  }
  useEffect(reviewOrderButtonEvent, [mint]);

  function showErrorText() {
    const textLabel = document.getElementById(ERROR_COMPONENT_ID);
    if (!textLabel) return;

    textLabel.innerText = error;
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
