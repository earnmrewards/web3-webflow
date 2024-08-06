import { useLogout, useUser } from "@account-kit/react";
import { useEffect } from "react";
import { useStore } from "../../hooks/use-store";

const COMPONENT_ID = "web3-logout-button";

export function LogoutButton() {
  const user = useUser();
  const { logout } = useLogout();
  const { clearStore } = useStore();

  useEffect(() => {
    const button = document.getElementById(COMPONENT_ID);
    if (!button) return;

    button.style.display = user ? "block" : "none";
    if (!user) return;

    button.onclick = () => {
      clearStore();
      logout();
    };
  }, [logout, user, clearStore]);

  return null;
}
