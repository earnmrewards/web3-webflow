import { useUser } from "@account-kit/react";
import { useCallback, useEffect } from "react";
import { shortenAddress } from "../../utils/shorten-address";
import { validateFeature } from "@/utils/validate-feature";

const COMPONENT_ID = "web3-user-address";

export function UserAddress() {
  const user = useUser();

  function getDisconnectedText() {
    const isExchangeFeature = validateFeature("token-exchange");
    if (!isExchangeFeature) {
      return "Not connected";
    }

    return "Buy $EARNM";
  }

  const addCopyEvent = useCallback(() => {
    navigator.clipboard.writeText(user?.address || "");
  }, [user]);

  useEffect(() => {
    const textFields: NodeListOf<HTMLElement> = document.querySelectorAll(
      `[id='${COMPONENT_ID}']`
    );
    for (const textField of textFields) {
      textField.innerText = user
        ? shortenAddress(user.address)
        : getDisconnectedText();

      textField.addEventListener("click", addCopyEvent);
    }

    return () => {
      for (const textField of textFields) {
        textField.removeEventListener("click", addCopyEvent);
      }
    };
  }, [user, addCopyEvent]);

  return null;
}
