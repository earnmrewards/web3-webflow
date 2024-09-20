import { useEffect } from "react";
import { useUser } from "@account-kit/react";
import { BASE_VALUES } from "./config";
import { useNavigate } from "../../contexts/use-navigate";

const ORDER_CONTAINER_ID = "web3-smart-nodes-order";
const BACK_BUTTON_ID = "web3-smart-nodes-navigate-back";
const QUANTITY_LABEL_ID = "web3-smart-nodes-final-amount";
const SMART_NODES_LABEL_ID = "web3-smart-nodes-final-bonus";
const EARN_PHONE_LABEL_ID = "web3-smart-nodes-final-phone";
// const REVIEW_BUTTON_ID = "web3-smart-nodes-order-review-button";

export function OrderContainer() {
  const user = useUser();
  const { back, searchParams } = useNavigate();

  const amount = Number(searchParams.get("amount"));

  function changeContainerVisibility() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container) return;

    container.style.display = amount <= 0 || !user ? "none" : "flex";
  }
  useEffect(changeContainerVisibility, [user, amount]);

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

    const quantityLabel = document.getElementById(QUANTITY_LABEL_ID);
    if (!quantityLabel) return;

    quantityLabel.innerText = String(amount);

    const smartNodesLabel = document.getElementById(SMART_NODES_LABEL_ID);
    if (smartNodesLabel) {
      smartNodesLabel.innerText = parseInt(
        String(amount >= BASE_VALUES[1] ? amount / BASE_VALUES[1] : 0)
      ).toString();
    }

    const earnPhoneLabel = document.getElementById(EARN_PHONE_LABEL_ID);
    if (earnPhoneLabel) {
      earnPhoneLabel.innerText = amount >= BASE_VALUES[2] ? "Yes" : "No";
    }
  }
  useEffect(handleLabelsValue, [amount]);

  return null;
}
