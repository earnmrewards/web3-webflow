import { getConversionRate } from "@/actions/get-conversion-rate";
import { purchaseTracker } from "@/actions/purchase-tracker";
import { STORAGE_KEY } from "@/components/smart-nodes/config";
import { useNavigate } from "@/contexts/use-navigate";
import { usePartner } from "@/contexts/use-partner";
import { useStore } from "@/contexts/use-store";
import { isInsufficientFundsError } from "@/errors/is-insufficient-funds-error";
import { isRejectedError } from "@/errors/is-rejected-error";
import { encryptData } from "@/utils/encrypt-data";
import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { ethers } from "ethers";
import { useState } from "react";
import { z } from "zod";

const transferSchema = z.object({
  amount: z.number(),
  bonusType: z.number(),
});

type TransferType = z.infer<typeof transferSchema>;

export function useSmartNodesPartnerTransfer({
  amount,
  bonusType,
}: TransferType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data, getPartnerId } = usePartner();
  const user = useUser();
  const store = useStore();
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

  async function validateNetwork() {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const { chainId } = await provider.getNetwork();

    return chainId === 421614n;
  }

  async function transfer(event: Event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error } = transferSchema.safeParse({
      amount,
      bonusType,
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

    const storage = store.get<string>(STORAGE_KEY);
    if (!storage) {
      setError("Oops! Error to retrieve your email");
      setLoading(false);
      return;
    }
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
    }

    try {
      const usingRightNetwork = await validateNetwork();
      if (!usingRightNetwork) {
        setError(`Oops! Looks like you're using a wrong network`);
        setLoading(false);
        return;
      }

      const partnerId = getPartnerId();
      if (!user || !data || !partnerId) throw new Error();

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
        partnerId,
        transactionHash: hash as string,
        totalInEth,
        totalInUsd,
        quantity: amount,
        bonusPlan: bonusType,
        wallet: user?.address,
      });

      const operationResult = encryptData({ hash, email });
      navigate({ query: new URLSearchParams({ operationResult }) });
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
