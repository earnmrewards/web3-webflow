import { useAuthModal, useChain, useUser } from "@account-kit/react";
import {
  AMOUNT_TO_GET_LABEL_ID,
  EXCHANGE_BUTTON_COMPONENT_ID,
  EXCHANGE_CONTAINER_ID,
  LOADER_CONTAINER_ID,
  NETWORK_SELECTOR_COMPONENT_ID,
  SWAP_SUCCESS_CONTAINER_ID,
  TOKEN_SELECTOR_COMPONENT_ID,
} from "./config";
import { useCallback, useEffect, useState } from "react";
import { blockNativeSubmitEvent } from "@/utils/block-native-submit-event";
import { useTokenExchange } from "@/hooks/use-token-exchange";
import { networkDef, NetworkType } from "@/types/network";
import { ERROR_COMPONENT_ID } from "../global-config";

export function ExchangeContainer() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();

  const [selectedToken, setSelectedToken] = useState(0);
  const [selectedNetwork, setSelectedNetwork] =
    useState<NetworkType>("polygon");
  const [amount, setAmount] = useState(0);

  const { setChain } = useChain();

  const { trigger, error, finished, loading } = useTokenExchange({
    network: selectedNetwork,
    token: selectedToken === 0 ? "earnm" : "stormx",
    amount,
  });

  const updateToken = useCallback(
    (event: Event) => {
      const target = event.target as HTMLSelectElement;
      setSelectedToken(target.value === "earnm" ? 0 : 1);

      const { mainnet, testnet } =
        networkDef[target.value === "earnm" ? selectedNetwork : "ethereum"];
      const chain =
        import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet;

      setChain({ chain });
    },
    [selectedNetwork, setChain]
  );

  function handleSelectedToken() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const selector = container.querySelector(
      `#${TOKEN_SELECTOR_COMPONENT_ID}`
    ) as HTMLSelectElement;
    if (!selector) return;

    selector.disabled = user ? false : true;
    selector.addEventListener("change", updateToken);

    return () => {
      selector.removeEventListener("change", updateToken);
    };
  }
  useEffect(handleSelectedToken, [updateToken, user]);

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

    if (!user) {
      selector.disabled = true;
      return;
    }

    selector.disabled = selectedToken === 1;

    selector.addEventListener("change", updateNetwork);

    return () => {
      selector.removeEventListener("change", updateNetwork);
    };
  }
  useEffect(handleSelectorInteraction, [selectedToken, updateNetwork, user]);

  function handleExchange() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const button = container.querySelector(
      `#${EXCHANGE_BUTTON_COMPONENT_ID}`
    ) as HTMLButtonElement;
    if (!button) return;

    button.innerText = user ? "Swap Now" : "Connect Wallet";

    button.addEventListener("click", user ? trigger : openAuthModal);
    return () => {
      button.removeEventListener("click", user ? trigger : openAuthModal);
    };
  }
  useEffect(handleExchange, [trigger, user, openAuthModal]);

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

    input.disabled = user ? false : true;

    input.addEventListener("keypress", blockNativeSubmitEvent);
    input.addEventListener("input", handleInputEvent);

    return () => {
      input.removeEventListener("keypress", blockNativeSubmitEvent);
      input.removeEventListener("input", handleInputEvent);
    };
  }
  useEffect(addInputEvent, [user]);

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
    const label = document.getElementById(AMOUNT_TO_GET_LABEL_ID);
    if (!label) return;

    const conversionRate = selectedToken === 0 ? 0.7 : 0.12;
    const value = (amount * conversionRate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    label.innerText = value;
  }
  useEffect(updateConversionValue, [amount, selectedToken]);

  function updateLoaderComponentVisibility() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const loader = container.querySelector(
      `#${LOADER_CONTAINER_ID}`
    ) as HTMLDivElement;
    if (!loader) return;

    const shouldShow =
      finished || (!finished && loading) || (finished && loading);

    loader.style.display = shouldShow ? "flex" : "none";
  }
  useEffect(updateLoaderComponentVisibility, [finished, loading]);

  function updateSwapModalVisibility() {
    const container = document.getElementById(LOADER_CONTAINER_ID);
    if (!container) return;

    const modal = container.querySelector(
      `#${SWAP_SUCCESS_CONTAINER_ID}`
    ) as HTMLDivElement;
    if (!modal) return;

    modal.style.display = finished ? "block" : "none";
  }
  useEffect(updateSwapModalVisibility, [finished]);

  return null;
}
