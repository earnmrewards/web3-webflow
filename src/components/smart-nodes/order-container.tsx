import { useEffect, useState } from "react";
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
  const [, setReferralCode] = useState("");
  const [, setEmail] = useState("");

  const amount = Number(searchParams.get("amount"));

  function changeContainerVisibility() {
    const container = document.getElementById(ORDER_CONTAINER_ID);
    if (!container) return;

    container.style.display = amount <= 0 || !user ? "none" : "block";
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

    const labels = [
      {
        id: QUANTITY_LABEL_ID,
        value: amount,
      },
      {
        id: SMART_NODES_LABEL_ID,
        value: parseInt(
          String(amount >= BASE_VALUES[1] ? amount / BASE_VALUES[1] : 0)
        ),
      },
      {
        id: EARN_PHONE_LABEL_ID,
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

  // useEffect(() => {
  //   const button = document.getElementById(REVIEW_BUTTON_ID);
  //   if (!button) return;

  //   button.addEventListener("click", (event) => {
  //     event.preventDefault();

  //     console.log(referralCode);
  //     console.log(email);
  //   });

  //   return () => {
  //     button.removeEventListener("click", (event) => {
  //       event.preventDefault();

  //       console.log(referralCode);
  //       console.log(email);
  //     });
  //   };
  // }, [referralCode, email]);

  return null;
}
