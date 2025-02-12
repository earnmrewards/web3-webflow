import { useAuthModal, useChain, useUser } from "@account-kit/react";
import {
  AMOUNT_TO_GET_LABEL_ID,
  CONVERSION_RATE,
  CONVERSION_RATE_LABEL_ID,
  EARNM_TOKEN_IMAGE_CDN_URL,
  EXCHANGE_BUTTON_COMPONENT_ID,
  EXCHANGE_CONTAINER_ID,
  LOADER_CONTAINER_ID,
  NETWORK_SELECTOR_COMPONENT_ID,
  RESULT_CONVERTED_VALUE_COMPONENT_ID,
  RESULT_VALUE_COMPONENT_ID,
  SPINNER_COMPONENT_ID,
  STMX_TOKEN_IMAGE_CDN_URL,
  SWAP_SUCCESS_CONTAINER_ID,
  TOKEN_IMAGE_COMPONENT_ID,
  TOKEN_IMAGE_CONTAINER_ID,
  TOKEN_SELECTOR_COMPONENT_ID,
} from "./config";
import { useCallback, useEffect, useState } from "react";
import { blockNativeSubmitEvent } from "@/utils/block-native-submit-event";
import { useTokenExchange } from "@/hooks/use-token-exchange";
import { getNetwork, NetworkType } from "@/types/network";
import { ERROR_COMPONENT_ID } from "../global-config";

export function ExchangeContainer() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();

  const [selectedToken, setSelectedToken] = useState(0);
  const [selectedNetwork, setSelectedNetwork] =
    useState<NetworkType>("arbitrum");
  const [amount, setAmount] = useState(0);

  const { setChain } = useChain();

  const { trigger, error, finished, loading } = useTokenExchange({
    network: selectedNetwork,
    token: selectedToken === 0 ? "earnm" : "stormx",
    amount,
  });

  function updateTokenImage() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const imageContainer = container.querySelector(
      `#${TOKEN_IMAGE_CONTAINER_ID}`
    ) as HTMLDivElement;
    if (imageContainer) {
      imageContainer.style.backgroundColor = user ? "white" : "#eee";
      imageContainer.style.opacity = user ? "1" : "0.7";
    }

    const images: NodeListOf<HTMLImageElement> = container.querySelectorAll(
      `#${TOKEN_IMAGE_COMPONENT_ID}`
    );
    for (const image of images) {
      image.src =
        selectedToken === 0
          ? EARNM_TOKEN_IMAGE_CDN_URL
          : STMX_TOKEN_IMAGE_CDN_URL;
    }
  }
  useEffect(updateTokenImage, [user, selectedToken]);

  const updateToken = useCallback(
    (event: Event) => {
      const target = event.target as HTMLSelectElement;
      setSelectedToken(target.value === "earnm" ? 0 : 1);
      if (target.value === "stormx") {
        setSelectedNetwork("ethereum");
      }

      const chain = getNetwork(
        target.value === "earnm" ? selectedNetwork : "ethereum"
      );
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
      const value = target.value as NetworkType;

      setSelectedNetwork(value);

      const chain = getNetwork(value);
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

    const value = (amount * CONVERSION_RATE[selectedToken]).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );
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

    const spinner = container.querySelector(
      `#${SPINNER_COMPONENT_ID}`
    ) as HTMLImageElement;
    if (!spinner) return;

    const animateClassName = "animate-spin";
    if (!spinner.classList.contains(animateClassName)) {
      spinner.classList.add(animateClassName);
    }

    const shouldShowSpinner = loading && !finished;
    spinner.style.display = shouldShowSpinner ? "block" : "none";
  }
  useEffect(updateLoaderComponentVisibility, [finished, loading]);

  function updateSwapModalVisibility() {
    const container = document.getElementById(LOADER_CONTAINER_ID);
    if (!container) return;

    const modal = container.querySelector(
      `#${SWAP_SUCCESS_CONTAINER_ID}`
    ) as HTMLDivElement;
    if (!modal) return;

    modal.style.display = finished ? "flex" : "none";

    const resultValue = container.querySelector(
      `#${RESULT_VALUE_COMPONENT_ID}`
    ) as HTMLDivElement;
    if (resultValue) {
      const finalValue = amount.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      const tokenName = selectedToken === 0 ? "EARNM" : "STMX";

      resultValue.innerText = `${finalValue} ${tokenName}`;
    }

    const resultConvertedValue = container.querySelector(
      `#${RESULT_CONVERTED_VALUE_COMPONENT_ID}`
    ) as HTMLDivElement;
    if (resultConvertedValue) {
      const value = (amount * CONVERSION_RATE[selectedToken]).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      );

      resultConvertedValue.innerText = `${value} EARNM (V2)`;
    }
  }
  useEffect(updateSwapModalVisibility, [finished, amount, selectedToken]);

  function updateNetworkForAsset() {
    if (selectedToken === 0) return;

    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const select = container.querySelector(
      `#${NETWORK_SELECTOR_COMPONENT_ID}`
    ) as HTMLSelectElement;
    if (!select) return;

    select.selectedIndex = 3; // Ethereum Index
  }
  useEffect(updateNetworkForAsset, [selectedToken]);

  function updateConversionRateLabel() {
    const container = document.getElementById(EXCHANGE_CONTAINER_ID);
    if (!container) return;

    const rateContainer = container.querySelector(
      `#${CONVERSION_RATE_LABEL_ID}`
    ) as HTMLElement;
    if (!rateContainer) return;

    const currentToken = selectedToken === 0 ? "$EARNM" : "$STRMX";
    const rateValue = user ? CONVERSION_RATE[selectedToken] : "---";
    rateContainer.innerText = `1 ${currentToken} = ${rateValue} $EARNM v2`;
  }
  useEffect(updateConversionRateLabel, [selectedToken, user]);

  return null;
}
