import { useAuthModal, useUser } from "@account-kit/react";
import { useEffect } from "react";

const COMPONENT_ID = "web3-auth-modal-button";

export function AuthModalButton() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const button = document.getElementById(COMPONENT_ID);
    if (!button) return;

    button.style.display = user ? "none" : "block";

    button.onclick = () => {
      openAuthModal();
    };
  }, [openAuthModal, user]);

  return null;
}
