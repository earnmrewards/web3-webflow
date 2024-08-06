import { useUser } from "@account-kit/react";
import { useEffect, useState } from "react";
import { useStore } from "../../hooks/use-store";
import { useMint } from "../../hooks/use-mint";

const FORM_COMPONENT_ID = "web3-mint-form";
const ERROR_COMPONENT_ID = "web3-error-text";
const LOADING_COMPONENT_ID = "web3-loading-container";

enum Input {
  AMOUNT,
  CODE,
  EMAIL,
}

export function MintForm() {
  const user = useUser();
  const { getTransactionHash } = useStore();

  const [amount, setAmount] = useState(0);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const { mint, error, loading } = useMint({ amount, code, email });

  function handleInputChange(event: Event, input: Input) {
    const target = event.target as HTMLInputElement;

    switch (input) {
      case Input.AMOUNT: {
        let value = parseInt(target.value);
        if (isNaN(value)) return;

        if (value > 10) value = 10;

        setAmount(value);
        break;
      }
      case Input.CODE: {
        setCode(target.value);
        break;
      }
      case Input.EMAIL: {
        setEmail(target.value);
        break;
      }
    }
  }

  useEffect(() => {
    const form = document.getElementById(FORM_COMPONENT_ID) as HTMLFormElement;
    if (!form) return;

    form.style.display = user && !getTransactionHash() ? "flex" : "none";
    if (!user) return;

    const inputs = form.querySelectorAll("input");
    if (inputs.length < 3) return;

    form.addEventListener("submit", mint);

    inputs.forEach((input, index) => {
      input.addEventListener("input", (event) =>
        handleInputChange(event, index)
      );
    });

    return () => {
      form.removeEventListener("submit", mint);
      inputs.forEach((input, index) => {
        input.removeEventListener("input", (event) =>
          handleInputChange(event, index)
        );
      });
    };
  }, [user, mint, getTransactionHash]);

  useEffect(() => {
    const textField = document.getElementById(ERROR_COMPONENT_ID);
    if (!textField) return;

    textField.textContent = error;
  }, [error]);

  useEffect(() => {
    const container = document.getElementById(LOADING_COMPONENT_ID);
    if (!container) return;

    container.style.display = loading ? "block" : "none";
  }, [loading]);

  return null;
}
