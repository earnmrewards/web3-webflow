import { useUser } from "@account-kit/react";
import {
  EXCHANGE_BUTTON_COMPONENT_ID,
  EXCHANGE_CONTAINER_ID,
  NETWORK_SELECTOR_COMPONENT_ID,
  TOKEN_SELECTION_CONTAINER_ID,
} from "./config";
import { useCallback, useEffect, useState } from "react";
import { blockNativeSubmitEvent } from "@/utils/block-native-submit-event";
import { useTokenExchange } from "@/hooks/use-token-exchange";

export function ExchangeContainer() {
  const user = useUser();
  const [selectedToken, setSelectedToken] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState("polygon");
  const [amount, setAmount] = useState(0);

  const { trigger } = useTokenExchange();

  function containerVisibility() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    container.style.display = user ? "block" : "none";
  }
  useEffect(containerVisibility, [user]);

  function updateToken(index: number) {
    setSelectedToken(index);
  }

  function handleSelectedToken() {
    const container = document.getElementById(TOKEN_SELECTION_CONTAINER_ID);
    if (!container) return;

    const buttons = container.querySelectorAll("button");
    if (buttons.length !== 2) return;

    for (const [index, button] of buttons.entries()) {
      button.addEventListener("click", () => updateToken(index));
    }

    return () => {
      for (const [index, button] of buttons.entries()) {
        button.removeEventListener("click", () => updateToken(index));
      }
    };
  }
  useEffect(handleSelectedToken, []);

  function updateButtonColor() {
    const container = document.getElementById(TOKEN_SELECTION_CONTAINER_ID);
    if (!container) return;

    const buttons = container.querySelectorAll("button");
    if (buttons.length !== 2) return;

    for (const [index, button] of buttons.entries()) {
      if (index === selectedToken) {
        button.classList.add("bg-gray-300");
      } else {
        button.classList.remove("bg-gray-300");
      }
    }
  }
  useEffect(updateButtonColor, [selectedToken]);

  const updateNetwork = useCallback((event: Event) => {
    const target = event.target as HTMLSelectElement;

    setSelectedNetwork(target.value);
  }, []);

  function handleSelectorInteraction() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const selector = container.querySelector(
      `#${NETWORK_SELECTOR_COMPONENT_ID}`
    ) as HTMLSelectElement;
    if (!selector) return;

    selector.disabled = selectedToken === 1;

    selector.addEventListener("change", updateNetwork);

    return () => {
      selector.removeEventListener("change", updateNetwork);
    };
  }
  useEffect(handleSelectorInteraction, [selectedToken, updateNetwork]);

  const exchangeToken = useCallback(() => {
    const network = selectedToken === 0 ? selectedNetwork : "ethereum";
    const token = selectedToken === 0 ? "earnm" : "stormx";
    console.log({ network, token, amount });
    trigger();
  }, [selectedNetwork, selectedToken, amount, trigger]);

  function handleExchange() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const button = container.querySelector(`#${EXCHANGE_BUTTON_COMPONENT_ID}`);
    if (!button) return;

    button.addEventListener("click", exchangeToken);

    return () => {
      button.removeEventListener("click", exchangeToken);
    };
  }
  useEffect(handleExchange, [exchangeToken]);

  function handleInputEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedAmount = Number(target.value);
    if (isNaN(selectedAmount)) return;

    setAmount(selectedAmount);
  }

  function addInputEvent() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const input = container.querySelector("input");
    if (!input) return;

    input.addEventListener("keypress", blockNativeSubmitEvent);
    input.addEventListener("input", handleInputEvent);

    return () => {
      input.removeEventListener("keypress", blockNativeSubmitEvent);
      input.removeEventListener("input", handleInputEvent);
    };
  }
  useEffect(addInputEvent, []);

  return null;
}
