import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@/contexts/use-navigate";
import { useUser } from "@account-kit/react";
import {
  HASH_LABEL_ID,
  SUCCESS_CONTAINER_ID,
  USER_REFERRAL_LABEL_ID,
} from "../config";
import { shortenAddress } from "@/utils/shorten-address";
import { getUserReferralCode } from "@/actions/get-user-referral-code";
import { getEncryptedData } from "@/utils/get-encrypted-data";
import { OperationResultType } from "@/types";

export function SuccessContainer() {
  const { navigate, searchParams } = useNavigate();
  const [referralCode, setReferralCode] = useState("");

  const user = useUser();
  const operationResult = searchParams.get("operationResult");
  const { hash, email } = getEncryptedData<OperationResultType>(
    operationResult || ""
  );

  function fetchReferralCode() {
    const shouldProceed = user && user.address && operationResult;
    if (!shouldProceed) return;

    (async () => {
      const userCode = await getUserReferralCode(user?.address, email);
      setReferralCode(userCode);
    })();
  }
  useEffect(fetchReferralCode, [user, email, operationResult]);

  function changeContainerVisibility() {
    const container = document.getElementById(SUCCESS_CONTAINER_ID);
    if (!container) return;

    const shouldShow = user && operationResult;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeContainerVisibility, [user, operationResult]);

  const handleReferralCopy = useCallback(() => {
    navigator.clipboard.writeText(referralCode);
  }, [referralCode]);

  function handleReferralLabelEvent() {
    if (referralCode.length === 0) return;

    const referralLabel = document.getElementById(USER_REFERRAL_LABEL_ID);
    if (!referralLabel) return;

    referralLabel.addEventListener("click", handleReferralCopy);
    return () => {
      referralLabel.removeEventListener("click", handleReferralCopy);
    };
  }
  useEffect(handleReferralLabelEvent, [referralCode, handleReferralCopy]);

  const handleHashClick = useCallback(() => {
    const explorerLink =
      import.meta.env.VITE_ENVIRONMENT === "production"
        ? "arbiscan.io"
        : "sepolia.arbiscan.io";
    window.open(`https://${explorerLink}/tx/${hash}`, "_blank");
  }, [hash]);

  function updateLabels() {
    const hashLabel = document.getElementById(HASH_LABEL_ID);
    if (hashLabel) {
      hashLabel.innerText = shortenAddress(hash || "");
      hashLabel.addEventListener("click", handleHashClick);
    }

    const referralLabel = document.getElementById(USER_REFERRAL_LABEL_ID);
    if (referralLabel) referralLabel.innerText = referralCode || "...";

    return () => {
      if (hashLabel) {
        hashLabel.removeEventListener("click", handleHashClick);
      }
    };
  }
  useEffect(updateLabels, [hash, handleHashClick, referralCode]);

  const shareButtonEvent = useCallback(
    (event: Event) => {
      event.preventDefault();
      if (referralCode.length === 0) return;

      window.open(
        `https://x.com/intent/post?text=I%27m+officially+an+%24EARNM+%40SmartN0des+holder%21+%0A%0A%40EARNMrewards+has+8M%2B+connected+wallets+with+%248B%2B+in+connected+assets%2C+and+represents+5%25+of+all+transactions+on+POL%21+%0A%0AUse+my+referral+code+for+a+25%25+bonus%3A+${referralCode}+%0A%0Aearnm.com%2Fsmartnodes`,
        "_blank"
      );
    },
    [referralCode]
  );

  const buyMoreButtonEvent = useCallback(
    (event: Event) => {
      event.preventDefault();

      navigate({ query: new URLSearchParams() });
    },
    [navigate]
  );

  function openSeaButtonEvent(event: Event) {
    event.preventDefault();

    window.open("https://opensea.io/collection/earnm-smartnodes", "_blank");
  }

  function addButtonEvents() {
    const buttons = document.querySelectorAll(`#${SUCCESS_CONTAINER_ID} a`);
    if (buttons.length === 0) return;

    const events = [shareButtonEvent, buyMoreButtonEvent, openSeaButtonEvent];
    for (const [index, event] of events.entries()) {
      buttons[index].addEventListener("click", event);
    }

    return () => {
      for (const [index, event] of events.entries()) {
        buttons[index].removeEventListener("click", event);
      }
    };
  }
  useEffect(addButtonEvents, [buyMoreButtonEvent, shareButtonEvent]);

  return null;
}
