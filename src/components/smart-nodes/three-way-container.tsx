import { useEffect, useState } from "react";

const CONTAINER_COMPONENT_ID = "web3-smart-nodes-selection";
const SMART_NODES_VALUE_ID = "web3-smart-nodes-amount";
const EARN_PHONE_VALUE_ID = "web3-smart-nodes-phone-amount";
const BASE_VALUES = [1, 3, 6];

export function ThreeWayContainer() {
  const [amount, setAmount] = useState(1);

  function handleClickOption(index: number) {
    setAmount(BASE_VALUES[index]);
  }

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const value = parseInt(target.value);
    if (isNaN(value)) return;

    setAmount(value);
  }

  useEffect(() => {
    const container = document.getElementById(CONTAINER_COMPONENT_ID);
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
  }, []);

  useEffect(() => {
    const container = document.getElementById(CONTAINER_COMPONENT_ID);
    if (!container) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.value = String(amount);
  }, [amount]);

  useEffect(() => {
    const container = document.getElementById(CONTAINER_COMPONENT_ID);
    if (!container) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.addEventListener("input", handleInputChange);

    return () => {
      input.removeEventListener("input", handleInputChange);
    };
  }, []);

  useEffect(() => {
    const hasSmartNodes = amount >= BASE_VALUES[1];
    const smartNodesSpan = document.getElementById(SMART_NODES_VALUE_ID);
    if (smartNodesSpan) {
      smartNodesSpan.style.display = hasSmartNodes ? "block" : "none";
    }

    const hasEarnPhone = amount >= BASE_VALUES[2];
    const earnPhoneSpan = document.getElementById(EARN_PHONE_VALUE_ID);
    if (earnPhoneSpan) {
      earnPhoneSpan.style.display = hasEarnPhone ? "block" : "none";
    }
  }, [amount]);

  return null;
}
