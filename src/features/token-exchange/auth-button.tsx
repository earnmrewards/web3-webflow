import { useLogout, useUser } from "@account-kit/react";
import { AUTH_BUTTON_COMPONENT_ID } from "./config";
import { shortenAddress } from "@/utils/shorten-address";
import { useCallback, useEffect } from "react";

export function AuthButton() {
  const user = useUser();
  const { logout } = useLogout();

  function changeText() {
    const anchor = document.getElementById(
      AUTH_BUTTON_COMPONENT_ID
    ) as HTMLAnchorElement;
    if (!anchor) return;

    anchor.innerHTML = user
      ? shortenAddress(user.address)
      : `Buy <span class="text-span-70">$EARNM</span>`;

    if (user) {
      anchor.removeAttribute("href");
      anchor.removeAttribute("target");
    } else {
      anchor.href = "https://www.earnm.com/imo";
      anchor.target = "_blank";
    }
  }
  useEffect(changeText, [user]);

  const handleClick = useCallback(() => {
    if (!user) return;

    logout();
  }, [user, logout]);

  function logoutUser() {
    const button = document.getElementById(
      AUTH_BUTTON_COMPONENT_ID
    ) as HTMLButtonElement;
    if (!button) return;

    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
    };
  }
  useEffect(logoutUser, [handleClick]);

  return null;
}
