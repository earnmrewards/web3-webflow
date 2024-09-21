import { useUser } from "@account-kit/react";
import { useEffect } from "react";
import { shortenAddress } from "../../utils/shorten-address";

const COMPONENT_ID = "web3-user-address";

export function UserAddress() {
  const user = useUser();

  useEffect(() => {
    const textFields: NodeListOf<HTMLElement> = document.querySelectorAll(
      `[id='${COMPONENT_ID}']`
    );
    for (const textField of textFields) {
      textField.innerText = user
        ? shortenAddress(user.address)
        : "Not Connected";
    }
  }, [user]);

  return null;
}
