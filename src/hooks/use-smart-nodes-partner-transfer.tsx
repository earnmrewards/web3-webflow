import { getConversionRate } from "@/actions/get-conversion-rate";
import { purchaseTracker } from "@/actions/purchase-tracker";
import { useNavigate } from "@/contexts/use-navigate";
import { usePartner } from "@/contexts/use-partner";
import { isInsufficientFundsError } from "@/errors/is-insufficient-funds-error";
import { isRejectedError } from "@/errors/is-rejected-error";
import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { useState } from "react";
import { z } from "zod";

const transferSchema = z.object({
  amount: z.number(),
});

type TransferType = z.infer<typeof transferSchema>;

export function useSmartNodesPartnerTransfer({ amount }: TransferType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data } = usePartner();
  const user = useUser();
  const { navigate } = useNavigate();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const { sendUserOperationAsync } = useSendUserOperation({ client });

  function validateAmount() {
    if (!data) return false;

    const { maxSmartNodes } = data;
    const bonusValue = parseInt(String(amount >= 3 ? amount / 3 : 0));
    if (amount + bonusValue > maxSmartNodes) {
      return false;
    }

    return true;
  }

  async function transfer(event: Event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error } = transferSchema.safeParse({
      amount,
    });
    if (error) {
      setError("Oops! It looks like you didn't fill in the amount correctly");
      setLoading(false);
      return;
    }

    if (!validateAmount()) {
      setError(
        "Oops! It looks like you are trying to buy more than we have available."
      );
      setLoading(false);
      return;
    }

    const params = new URL(window.location.href).searchParams;
    const testFlag = "testSuccessModalOption";
    if (params.get(testFlag)) {
      setTimeout(() => {
        navigate({
          query: new URLSearchParams({ success: "true" }),
        });
      }, 3 * 1000); // 3s
    }

    try {
      if (!user || !data) throw new Error();
      const { currentPrice, paymentsWallet } = data;

      const totalInUsd = currentPrice * amount;
      const conversionRate = await getConversionRate();
      const totalInEth = totalInUsd / conversionRate;

      const weiValue = BigInt(Math.floor(totalInEth * 10 ** 18));

      const { hash } = await sendUserOperationAsync({
        uo: {
          target: paymentsWallet as `0x${string}`,
          data: "0x",
          value: weiValue,
        },
      });

      const status = await purchaseTracker({
        partnerId: data.referralCode,
        transactionHash: hash as string,
        totalInEth,
        totalInUsd,
        quantity: amount,
        bonusPlan: 1,
        wallet: user?.address,
      });
      if (!status) {
        setError(
          "Oops! Looks like an error occurred while trying to complete your purchase."
        );
      }
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

  return { transfer, error, loading };
}
