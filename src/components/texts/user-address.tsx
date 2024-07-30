import { useUser } from "@account-kit/react";
import { useEffect } from "react";
import { shortenAddress } from "../../utils/shorten-address";

const COMPONENT_ID = "web3-user-address";

export function UserAddress() {
  const user = useUser();

  useEffect(() => {
    const textField = document.getElementById(COMPONENT_ID);
    if (!textField) return;

    textField.textContent = user
      ? shortenAddress(user.address)
      : "Not Connected";
  }, [user]);

  return null;
}
