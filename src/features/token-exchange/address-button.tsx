import { useLogout, useUser } from "@account-kit/react";
import { ADDRESS_BUTTON_COMPONENT_ID } from "./config";
import { shortenAddress } from "@/utils/shorten-address";
import { useCallback, useEffect } from "react";

export function AddressButton() {
  const user = useUser();
  const { logout } = useLogout();

  const handleClick = useCallback(() => {
    if (!user) return;

    logout();
  }, [user, logout]);

  function changeText() {
    const anchors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
      `#${ADDRESS_BUTTON_COMPONENT_ID}`
    );
    for (const anchor of anchors) {
      anchor.innerHTML = user
        ? `<span class="text-span-70">${shortenAddress(user.address)}</span>`
        : `Buy <span class="text-span-70">$EARNM</span>`;

      if (user) {
        anchor.removeAttribute("href");
        anchor.removeAttribute("target");
      } else {
        anchor.href = "https://www.earnm.com/imo";
        anchor.target = "_blank";
      }

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
