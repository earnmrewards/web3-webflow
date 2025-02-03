import { useAuthModal, useLogout, useUser } from "@account-kit/react";
import { ADDRESS_BUTTON_COMPONENT_ID } from "./config";
import { shortenAddress } from "@/utils/shorten-address";
import { useCallback, useEffect } from "react";

export function AddressButton() {
  const user = useUser();
  const { logout } = useLogout();
  const { openAuthModal } = useAuthModal();

  const handleClick = useCallback(() => {
    if (user) {
      logout();
      return;
    }

    openAuthModal();
  }, [user, logout, openAuthModal]);

  function changeText() {
    const anchors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
      `#${ADDRESS_BUTTON_COMPONENT_ID}`
    );
    for (const anchor of anchors) {
      anchor.innerHTML = `<span class="text-span-70">${
        user ? shortenAddress(user.address) : "Connect Wallet"
      }</span>`;

      anchor.addEventListener("click", handleClick);
    }

    return () => {
      for (const anchor of anchors) {
        anchor.removeEventListener("click", handleClick);
      }
    };
  }
  useEffect(changeText, [user, handleClick]);

  return null;
}
