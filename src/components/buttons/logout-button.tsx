import { useLogout, useUser } from "@account-kit/react";
import { useCallback, useEffect } from "react";

const COMPONENT_ID = "web3-logout-button";
const SALE_COMPONENT_ID = "sale";

export function LogoutButton() {
  const user = useUser();
  const { logout } = useLogout();

  const handleLogout = useCallback(() => {
    const saleComponent = document.getElementById(SALE_COMPONENT_ID);
    if (saleComponent) {
      saleComponent.scrollIntoView({ behavior: "smooth" });
    }

    logout();
  }, [logout]);

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
  }, [logout, user, handleLogout]);

  return null;
}
