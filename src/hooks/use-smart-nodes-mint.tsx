import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { useState } from "react";
import { z } from "zod";
import { isInsufficientFundsError } from "../errors/is-insufficient-funds-error";
import { isRejectedError } from "../errors/is-rejected-error";
import { encodeFunctionData } from "viem";
import { useNavigate } from "../contexts/use-navigate";
import { calculateMintFee } from "../actions/calculate-mint-fee";
import { storeUserData } from "../actions/store-user-data";
import { encryptData } from "../utils/encrypt-data";
import { abi, CONTRACT_ADDRESS } from "../config/contracts/smart-nodes";
import { useStore } from "../contexts/use-store";
import {
  SMART_NODES_TIERS_VALUE,
  STORAGE_KEY,
} from "../components/smart-nodes/config";
import { validateNetwork } from "@/utils/validate-network";

const mintSchema = z.object({
  referralCode: z.string().optional(),
  amount: z.number().positive(),
  bonusType: z.number(),
});

type MintType = z.infer<typeof mintSchema>;

export function useSmartNodesMint({
  referralCode,
  amount,
  bonusType,
}: MintType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useUser();
  const store = useStore();
  const { navigate } = useNavigate();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const { sendUserOperationAsync } = useSendUserOperation({ client });

  function getUnitPrice() {
    const tierLabel = document.querySelector(".tier-letter") as HTMLSpanElement;
    let tier = "S";
    if (tierLabel) {
      tier = tierLabel.innerText;
    }

    const availableTiers = Object.keys(SMART_NODES_TIERS_VALUE);
    const priceKey = !availableTiers.includes(tier) ? availableTiers[0] : tier;
    const priceValue = SMART_NODES_TIERS_VALUE[priceKey];

    return priceValue;
  }

  async function mint(event: Event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error } = mintSchema.safeParse({
      referralCode,
      amount,
      bonusType,
    });
    if (error) {
      setError("Oops! It looks like you didn't fill in the email correctly");
      setLoading(false);
      return;
    }

    const storage = store.get<string>(STORAGE_KEY);
    if (!storage) throw new Error();
    const { email } = storage;

    const params = new URL(window.location.href).searchParams;
    const testFlag = "testSuccessModalOption";
    if (params.get(testFlag)) {
      setTimeout(() => {
        const operationResult = encryptData({
          hash: "0x123456789abcdef",
          email,
        });

        navigate({
          query: new URLSearchParams({ operationResult }),
        });
        setLoading(false);
      }, 3 * 1000); // 3s
      return;
    }

    try {
      if (!user) throw new Error();

      const usingRightNetwork = await validateNetwork("arbitrum");
      if (!usingRightNetwork) {
        setError(`Oops! Looks like you're using a wrong network`);
        setLoading(false);
        return;
      }

      const mintFeeWei = await calculateMintFee(amount);
      const { hash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "mint",
            args: [amount, bonusType],
          }),
          value: BigInt(mintFeeWei),
        },
      });

      const unitPrice = getUnitPrice();
      await storeUserData({
        email,
        referralCode,
        mintTxnHash: hash,
        amount,
        wallet: user.address,
        price: unitPrice,
        bonusType,
      });

      const operationResult = encryptData({ hash, email });
      navigate({ query: new URLSearchParams({ operationResult }) });
    } catch (error) {
      if (params.get("debugging")) {
        console.log(error);
      }
      if (isInsufficientFundsError(error)) {
        setError(
          "Oops! You do not have sufficient funds to complete your purchase."
        );
      } else if (isRejectedError(error)) {
        setError("Oops! Looks like you rejected the transaction signature.");
      } else {
        setError(
          "Oops! Looks like an error occurred while trying to complete your purchase."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return { mint, loading, error };
}
