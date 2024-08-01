import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { useCallback, useEffect, useState } from "react";
import { encodeFunctionData } from "viem";
import { abi } from "../../config/abi";
import { storeUserData } from "../../actions/store-user-data";

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
  const { client } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({
    client,
    onSuccess: ({ hash }) => onSuccessSubmit(hash),
  });

  const [amount, setAmount] = useState(0);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = useCallback(
    async (event: Event) => {
      event.preventDefault();
      setLoading(true);

      try {
        setError("");

        await sendUserOperationAsync({
          uo: {
            target: "0x012Ed2176f79862850629077774C4a27ec09484b",
            data: encodeFunctionData({
              abi,
              functionName: "mintTo",
              args: [user?.address as `0x${string}`],
            }),
          },
        });
        storeUserData(amount, code, email);
      } catch (error) {
        setError("SmartNode purchase failed");
      } finally {
        setLoading(false);
      }
    },
    [sendUserOperationAsync, user, amount, code, email]
  );

  function onSuccessSubmit(hash: string) {
    const baseUrl = new URL(window.location.href);
    baseUrl.searchParams.append("txHash", hash);

    window.location.replace(baseUrl);
  }

  useEffect(() => {
    const form = document.getElementById(FORM_COMPONENT_ID) as HTMLFormElement;
    if (!form) return;

    form.style.display = user ? "flex" : "none";
    if (!user) return;

    const inputs = form.querySelectorAll("input");
    if (inputs.length < 3) return;

    form.addEventListener("submit", handleSubmit);

    inputs.forEach((input, index) => {
      input.addEventListener("input", (event) =>
        handleInputChange(event, index)
      );
    });

    return () => {
      form.removeEventListener("submit", handleSubmit);
      inputs.forEach((input, index) => {
        input.removeEventListener("input", (event) =>
          handleInputChange(event, index)
        );
      });
    };
  }, [user, handleSubmit]);

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
