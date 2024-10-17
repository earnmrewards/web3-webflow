import { usePartner } from "@/contexts/use-partner";
import { useEffect, useState } from "react";
import {
  ORDER_AMOUNT_LABEL_ID,
  ORDER_BONUS_LABEL_ID,
  ORDER_BUTTON_ID,
  ORDER_CONTAINER_ID,
} from "./config";
import { useSmartNodesPartnerTransfer } from "@/hooks/use-smart-nodes-partner-transfer";
import { ERROR_COMPONENT_ID, LOADING_COMPONENT_ID } from "../config";

export function OrderContainer() {
  const [selectedAmount, setSelectedAmount] = useState(1);

  const { data, loading: partnerDataLoading } = usePartner();
  const { transfer, loading, error } = useSmartNodesPartnerTransfer({
    amount: selectedAmount,
  });

  function changeVisibility() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container) return;

    const shouldShow =
      !partnerDataLoading && data && data.availableSmartNodes > 0;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeVisibility, [data, partnerDataLoading]);

  function updateAmount() {
    const label = document.getElementById(ORDER_AMOUNT_LABEL_ID);
    if (!label) return;

    label.innerText = String(data?.availableSmartNodes);
  }
  useEffect(updateAmount, [data]);

  function updateBonus() {
    const label = document.getElementById(ORDER_BONUS_LABEL_ID);
    if (!label) return;

    const bonusValue = parseInt(
      String(selectedAmount >= 3 ? selectedAmount / 3 : 0)
    );

    label.innerText = String(bonusValue);
  }
  useEffect(updateBonus, [selectedAmount]);

  function handleInputEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    const newAmount = Number(target.value);
    if (isNaN(newAmount)) return;

    setSelectedAmount(newAmount);
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

    input.value = "1";

    input.addEventListener("keypress", blockNativeSubmitEvent);
    input.addEventListener("input", handleInputEvent);
    return () => {
      input.removeEventListener("keypress", blockNativeSubmitEvent);
      input.removeEventListener("input", handleInputEvent);
    };
  }
  useEffect(addInputEvent, []);

  function handleButton() {
    const button = document.getElementById(ORDER_BUTTON_ID);
    if (!button) return;

    button.addEventListener("click", transfer);
    return () => {
      button.removeEventListener("click", transfer);
    };
  }
  useEffect(handleButton, [transfer]);

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
