import { useLogout, useUser } from "@account-kit/react";
import { useEffect } from "react";

const BUTTON_ID = "web3-logout-button";

export function LogoutButton() {
  const user = useUser();
  const { logout } = useLogout();

  useEffect(() => {
    const button = document.getElementById(BUTTON_ID);
    if (!button) return;

    button.style.display = user ? "" : "none";
    button.onclick = () => {
      logout();
    };
  }, [logout, user]);

  return null;
}
