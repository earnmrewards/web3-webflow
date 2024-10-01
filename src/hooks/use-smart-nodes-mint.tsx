import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { useState } from "react";
import { z } from "zod";
import { isInsufficientFundsError } from "../errors/is-insufficient-funds-error";
import { isRejectedError } from "../errors/is-rejected-error";
import { encodeFunctionData, parseEther } from "viem";
import { useNavigate } from "../contexts/use-navigate";
import { calculateMintFee } from "../actions/calculate-mint-fee";
import { storeUserData } from "../actions/store-user-data";
import { encryptData } from "../utils/encrypt-data";
import { abi, CONTRACT_ADDRESS } from "../config/contracts/smart-nodes";

const mintSchema = z.object({
  referralCode: z.string().optional(),
  email: z.string().email(),
  amount: z.number().positive(),
  bonusType: z.number(),
});

type MintType = z.infer<typeof mintSchema>;

export function useSmartNodesMint({
  email,
  referralCode,
  amount,
  bonusType,
}: MintType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useUser();
  const { navigate } = useNavigate();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const { sendUserOperationAsync } = useSendUserOperation({ client });

  async function mint(event: Event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error } = mintSchema.safeParse({
      email,
      referralCode,
      amount,
      bonusType,
    });
    if (error) {
      setError("Oops! It looks like you didn't fill in the email correctly");
      setLoading(false);
      return;
    }

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

      const mintFee = await calculateMintFee(amount);
      const mintFeeWithPrecision = Number(mintFee) / 10 ** 18;

      const { hash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "mint",
            args: [amount, bonusType],
          }),
          value: parseEther(String(mintFeeWithPrecision)),
        },
      });

      await storeUserData({
        email,
        referralCode,
        mintTxnHash: hash,
        amount,
        wallet: user.address,
      });

      const operationResult = encryptData({ hash, email });
      navigate({ query: new URLSearchParams({ operationResult }) });
    } catch (error) {
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
