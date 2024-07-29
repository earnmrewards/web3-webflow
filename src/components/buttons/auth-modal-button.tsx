import { useAuthModal } from "@account-kit/react";
import { useEffect } from "react";

const BUTTON_ID = "web3-auth-modal-button";

export function AuthModalButton() {
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const button = document.getElementById(BUTTON_ID);
    if (!button) return;

    button.onclick = () => {
      openAuthModal();
    };
  }, [openAuthModal]);

  return null;
}
