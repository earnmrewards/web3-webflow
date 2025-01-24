import { useChain, useUser } from "@account-kit/react";
import {
  AMOUNT_TO_GET_LABEL_ID,
  EXCHANGE_BUTTON_COMPONENT_ID,
  EXCHANGE_CONTAINER_ID,
  NETWORK_SELECTOR_COMPONENT_ID,
  TOKEN_SELECTION_CONTAINER_ID,
} from "./config";
import { useCallback, useEffect, useState } from "react";
import { blockNativeSubmitEvent } from "@/utils/block-native-submit-event";
import { useTokenExchange } from "@/hooks/use-token-exchange";
import { networkDef, NetworkType } from "@/types/network";
import { ERROR_COMPONENT_ID } from "../global-config";

export function ExchangeContainer() {
  const user = useUser();
  const [selectedToken, setSelectedToken] = useState(0);
  const [selectedNetwork, setSelectedNetwork] =
    useState<NetworkType>("polygon");
  const [amount, setAmount] = useState(0);

  const { setChain } = useChain();

  const { trigger, error } = useTokenExchange({
    network: selectedNetwork,
    token: selectedToken === 0 ? "earnm" : "stormx",
    amount,
  });

  function containerVisibility() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    container.style.display = user ? "block" : "none";
  }
  useEffect(containerVisibility, [user]);

  const updateToken = useCallback(
    (index: number) => {
      setSelectedToken(index);

      const { mainnet, testnet } =
        networkDef[index === 0 ? selectedNetwork : "ethereum"];
      const chain =
        import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet;

      setChain({ chain });
    },
    [setChain, selectedNetwork]
  );

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
  useEffect(handleSelectedToken, [updateToken]);

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

  const updateNetwork = useCallback(
    (event: Event) => {
      const target = event.target as HTMLSelectElement;

      setSelectedNetwork(target.value as NetworkType);

      const { mainnet, testnet } = networkDef[target.value as NetworkType];
      const chain =
        import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet;

      setChain({ chain });
    },
    [setChain]
  );

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

  function handleExchange() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const button = container.querySelector(`#${EXCHANGE_BUTTON_COMPONENT_ID}`);
    if (!button) return;

    button.addEventListener("click", trigger);

    return () => {
      button.removeEventListener("click", trigger);
    };
  }
  useEffect(handleExchange, [trigger]);

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

  function showErrorText() {
    const textLabels: NodeListOf<HTMLParagraphElement> =
      document.querySelectorAll(`#${ERROR_COMPONENT_ID}`);
    if (textLabels.length === 0) return;

    for (const label of textLabels) {
      label.innerText = error;
    }
  }
  useEffect(showErrorText, [error]);

  function updateConversionValue() {
    const input = document.getElementById(
      AMOUNT_TO_GET_LABEL_ID
    ) as HTMLInputElement;
    if (!input) return;

    const conversionRate = selectedToken === 0 ? 0.7 : 0.12;

    input.value = String((amount * conversionRate).toFixed(2));
  }
  useEffect(updateConversionValue, [amount, selectedToken]);

  return null;
}
