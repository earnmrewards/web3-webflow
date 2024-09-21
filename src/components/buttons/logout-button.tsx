import { useLogout, useUser } from "@account-kit/react";
import { useCallback, useEffect } from "react";
import { useStore } from "../../contexts/use-store";

const COMPONENT_ID = "web3-logout-button";

export function LogoutButton() {
  const user = useUser();
  const { logout } = useLogout();
  const { clearStore } = useStore();

  const handleLogout = useCallback(() => {
    clearStore();
    logout();
  }, [clearStore, logout]);

  useEffect(() => {
    const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(
      `[id='${COMPONENT_ID}']`
    );
    for (const button of buttons) {
      button.style.display = user ? "block" : "none";
      if (!user) return;

      button.addEventListener("click", handleLogout);
    }

    return () => {
      for (const button of buttons) {
        button.removeEventListener("click", handleLogout);
      }
    };
  }, [logout, user, clearStore, handleLogout]);

  return null;
}
