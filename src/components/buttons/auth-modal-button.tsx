import { useAuthModal, useUser } from "@account-kit/react";
import { useEffect } from "react";

const COMPONENT_ID = "web3-auth-modal-button";

export function AuthModalButton() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(
      `[id='${COMPONENT_ID}']`
    );
    for (const button of buttons) {
      button.style.display = user ? "none" : "block";

      button.addEventListener("click", openAuthModal);
    }

    return () => {
      for (const button of buttons) {
        button.removeEventListener("click", openAuthModal);
      }
    };
  }, [openAuthModal, user]);

  return null;
}
