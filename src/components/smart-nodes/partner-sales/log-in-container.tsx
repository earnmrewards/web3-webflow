import { useUser } from "@account-kit/react";
import { BASE_VALUES, LOG_IN_CONTAINER_ID, STORAGE_KEY } from "../config";
import { useEffect } from "react";
import { usePartner } from "@/contexts/use-partner";
import { useStore } from "@/contexts/use-store";
import { useNavigate } from "@/contexts/use-navigate";

export function LogInContainer() {
  const user = useUser();
  const store = useStore();
  const { data, loading } = usePartner();
  const { searchParams } = useNavigate();

  const bonusPlan = Number(searchParams.get("bonusPlan")) || 1;

  function changeVisibility() {
    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    if (!container) return;

    const storedEmail = store.get(STORAGE_KEY);
    const shouldShow =
      !user && storedEmail && !loading && data && data.availableSmartNodes > 0;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeVisibility, [user, data, loading, store]);

  function addOptionsButtonEvent() {
    const container = document.getElementById(LOG_IN_CONTAINER_ID);
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

  return null;
}
