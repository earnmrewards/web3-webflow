import { useUser } from "@account-kit/react";
import { useCallback, useEffect } from "react";
import { shortenAddress } from "../../utils/shorten-address";

const COMPONENT_ID = "web3-user-address";

export function UserAddress() {
  const user = useUser();

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
        : "Not Connected";

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
