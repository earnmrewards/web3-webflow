import { useUser } from "@account-kit/react";
import { useCallback, useEffect, useState } from "react";
import {
  BASE_VALUES,
  EMAIL_CONTAINER_ID,
  ERROR_COMPONENT_ID,
  STORAGE_KEY,
} from "../config";
import { useStore } from "@/contexts/use-store";
import { emailSubmission } from "@/actions/email-submission";
import { usePartner } from "@/contexts/use-partner";
import { useNavigate } from "@/contexts/use-navigate";

export function EmailContainer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const user = useUser();
  const store = useStore();
  const { data, loading } = usePartner();
  const { searchParams } = useNavigate();

  const bonusPlan = Number(searchParams.get("bonusPlan")) || 1;

  function changeContainerVisibility() {
    const container = document.getElementById(EMAIL_CONTAINER_ID);
    if (!container) return;

    const storedEmail = store.get(STORAGE_KEY);
    const shouldShow =
      !storedEmail && !loading && data && data.availableSmartNodes > 0;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeContainerVisibility, [user, store, loading, data]);

  function addOptionsButtonEvent() {
    const container = document.getElementById(EMAIL_CONTAINER_ID);
    if (!container) return;

    const buttons = container.getElementsByTagName("a");
    if (buttons.length === 0) return;

    for (const [index, button] of Array.from(buttons).entries()) {
      if (index >= BASE_VALUES.length) continue;

      if (bonusPlan === 2) {
        const spans = button.querySelectorAll(
          ".free-things-para"
        ) as NodeListOf<HTMLSpanElement>;
        for (const span of spans) {
          if (span.innerText.includes("+2")) {
            span.innerText = "+4";
          }
        }

        const bolderNumber = button.querySelector(
          `.bolder-smartnode-number`
        ) as HTMLElement;
        if (!bolderNumber) return;

        const planValue: Record<string, string> = {
          three: "four",
          six: "eight",
        };

        Object.keys(planValue).forEach((key) => {
          if (button.innerText.toLowerCase().includes(key)) {
            bolderNumber.innerText = planValue[key].toUpperCase();
          }
        });
      }
    }
  }
  useEffect(addOptionsButtonEvent, [bonusPlan]);

  function blockNativeSubmitEvent(event: KeyboardEvent) {
    if (event.key === "Enter") event.preventDefault();
  }

  const handleInput = useCallback((event: Event) => {
    const target = event.target as HTMLInputElement;

    setEmail(target.value);
  }, []);

  function addInputEvent() {
    const container = document.getElementById(EMAIL_CONTAINER_ID);
    if (!container) return;

    const inputs = container.getElementsByTagName("input");
    const input = inputs[0];
    if (!input) return;

    input.addEventListener("keypress", blockNativeSubmitEvent);
    input.addEventListener("input", handleInput);
    return () => {
      input.removeEventListener("keypress", blockNativeSubmitEvent);
      input.removeEventListener("input", handleInput);
    };
  }
  useEffect(addInputEvent, [handleInput]);

  const handleSubmitEvent = useCallback(async () => {
    if (email.length === 0) return;
    setError("");

    const response = await emailSubmission({
      email,
      url: window.location.href,
    });
    if (!response) {
      setError("Oops! You must provide a valid email");
      return;
    }

    store.set(STORAGE_KEY, { email });
  }, [email, store]);

  function addSubmitEvent() {
    const container = document.getElementById(EMAIL_CONTAINER_ID);
    if (!container) return;

    const buttons = container.getElementsByTagName("a");
    const submitButton = buttons[buttons.length - 1];
    if (!submitButton) return;

    submitButton.addEventListener("click", handleSubmitEvent);
    return () => {
      submitButton.removeEventListener("click", handleSubmitEvent);
    };
  }
  useEffect(addSubmitEvent, [handleSubmitEvent]);

  function showErrorText() {
    const textLabels: NodeListOf<HTMLParagraphElement> =
      document.querySelectorAll(`#${ERROR_COMPONENT_ID}`);
    if (textLabels.length === 0) return;

    for (const label of textLabels) {
      label.innerText = error;
    }
  }
  useEffect(showErrorText, [error]);

  return null;
}
