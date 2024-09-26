import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_LABEL,
  ERROR_COMPONENT_ID,
  FORM_ID,
  FORM_INITIAL_LABEL_VALUE,
  FORM_LOADING_LABEL_VALUE,
  MINTED_LABEL,
  REVENUE_LABEL,
  SUCCESS_COMPONENT_ID,
} from "./config";
import { getDashboardData } from "../../../actions/get-dashboard-data";

export function PartnerDashboard() {
  const [referralCode, setReferralCode] = useState("");

  const [revenue, setRevenue] = useState<number | null>(null);
  const [smartNodes, setSmartNodes] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function blockNativeTypeEvent(event: KeyboardEvent) {
    if (event.key === "Enter") event.preventDefault();
  }

  const handleReferralCode = useCallback((event: Event) => {
    const target = event.target as HTMLInputElement;

    setReferralCode(target.value);
  }, []);

  const submitCodeEvent = useCallback(
    async (event: Event) => {
      event.preventDefault();
      setLoading(true);
      setError(false);

      try {
        const { smartnodes, revenue } = await getDashboardData(referralCode);

        setRevenue(revenue);
        setSmartNodes(smartnodes);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [referralCode]
  );

  function addInputEvent() {
    const form = document.getElementById(FORM_ID);
    if (!form) return;

    const inputs = form.querySelectorAll("input");
    if (inputs.length === 0) return;

    const codeInput = inputs[0];
    const submitInput = inputs[1];

    codeInput.addEventListener("keypress", blockNativeTypeEvent);
    codeInput.addEventListener("input", handleReferralCode);
    submitInput.addEventListener("click", submitCodeEvent);

    submitInput.value = loading
      ? FORM_LOADING_LABEL_VALUE
      : FORM_INITIAL_LABEL_VALUE;

    return () => {
      codeInput.removeEventListener("keypress", blockNativeTypeEvent);
      codeInput.removeEventListener("input", handleReferralCode);
      submitInput.removeEventListener("click", submitCodeEvent);
    };
  }
  useEffect(addInputEvent, [handleReferralCode, submitCodeEvent, loading]);

  function changeComponentVisibility() {
    const successComponent = document.querySelector(
      `.${SUCCESS_COMPONENT_ID}`
    ) as HTMLDivElement;
    if (successComponent) {
      const shouldShow = !loading && !error && revenue !== null;
      successComponent.style.display = shouldShow ? "block" : "none";
    }

    const errorComponent = document.getElementById(ERROR_COMPONENT_ID);
    if (errorComponent) {
      errorComponent.style.display = error ? "block" : "none";
    }

    const formComponent = document.getElementById(FORM_ID);
    if (formComponent) {
      const shouldShow = revenue === null;
      formComponent.style.display = shouldShow ? "grid" : "none";
    }
  }
  useEffect(changeComponentVisibility, [loading, error, revenue]);

  function updateDashboardData() {
    const mintedLabel = document.getElementById(MINTED_LABEL);
    if (mintedLabel) {
      mintedLabel.innerText = smartNodes
        ? smartNodes.toLocaleString()
        : EMPTY_LABEL;
    }

    const revenueLabel = document.getElementById(REVENUE_LABEL);
    if (revenueLabel) {
      revenueLabel.innerText = revenue
        ? revenue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : EMPTY_LABEL;
    }
  }
  useEffect(updateDashboardData, [smartNodes, revenue]);

  return null;
}
