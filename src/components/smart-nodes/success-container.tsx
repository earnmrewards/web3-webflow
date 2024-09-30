import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "../../contexts/use-navigate";
import { useUser } from "@account-kit/react";
import {
  HASH_LABEL_ID,
  SUCCESS_CONTAINER_ID,
  USER_REFERRAL_LABEL_ID,
} from "./config";
import { shortenAddress } from "../../utils/shorten-address";

export function SuccessContainer() {
  const { navigate, searchParams } = useNavigate();
  const [referralCode, setReferralCode] = useState("");

  const user = useUser();
  const hash = searchParams.get("hash");

  useEffect(() => {
    (async () => {
      const request = await fetch(
        `https://g5vv4opzusgzy4ectn3twhtmsm0iyrlt.lambda-url.us-west-2.on.aws?address=${user?.address}`,
        {
          method: "GET",
          headers: {
            "x-api-key": import.meta.env.VITE_LAMBDA_KEY,
          },
        }
      );
      const response = (await request.json()) as Record<string, string>;
      if (!response || !response["referral_code"]) {
        setReferralCode("Unknown");
        return;
      }

      setReferralCode(response["referral_code"]);
    })();
  }, [user?.address]);

  function changeContainerVisibility() {
    const container = document.getElementById(SUCCESS_CONTAINER_ID);
    if (!container) return;

    const shouldShow = user && hash;
    container.style.display = shouldShow ? "block" : "none";
  }
  useEffect(changeContainerVisibility, [user, hash]);

  const handleCopyEvent = useCallback(() => {
    navigator.clipboard.writeText(hash || "");
  }, [hash]);

  function updateLabels() {
    const hashLabel = document.getElementById(HASH_LABEL_ID);
    if (hashLabel) {
      hashLabel.innerText = shortenAddress(hash || "");
      hashLabel.addEventListener("click", handleCopyEvent);
    }

    const referralLabel = document.getElementById(USER_REFERRAL_LABEL_ID);
    if (referralLabel) referralLabel.innerText = referralCode;

    return () => {
      if (hashLabel) {
        hashLabel.removeEventListener("click", handleCopyEvent);
      }
    };
  }
  useEffect(updateLabels, [hash, handleCopyEvent, referralCode]);

  function shareButtonEvent(event: Event) {
    event.preventDefault();

    // TODO: Get the referral code from a API
    const referralCode = "Coming Soon";
    window.open(
      `https://x.com/intent/tweet?text=I%20just%20got%20whitelisted%20for%20%24EARNM%27s%20upcoming%20%40SmartN0des%20sale!%20%0A%0A%40EARNMrewards%20has%208M%2B%20connected%20wallets%20with%20%248B%2B%20in%20connected%20assets%2C%20and%20represents%205%25%20of%20all%20transactions%20on%20POL!%20%0A%0AUse%20my%20referral%20code%20for%20a%2025%25%20bonus%3A%20${referralCode}%20%0A%0Aearnm.com/smartnodes`,
      "_blank"
    );
  }

  const buyMoreButtonEvent = useCallback(
    (event: Event) => {
      event.preventDefault();

      navigate({ query: new URLSearchParams() });
    },
    [navigate]
  );

  function openSeaButtonEvent(event: Event) {
    event.preventDefault();

    window.open("https://opensea.io/collection/smart-nodes", "_blank");
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
  useEffect(addButtonEvents, [buyMoreButtonEvent]);

  return null;
}
