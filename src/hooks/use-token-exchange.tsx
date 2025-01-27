import { abi, CONTRACT_ADDRESS } from "@/config/contracts/token-exchange";
import { genericErc20 } from "@/config/contracts/token-exchange/generic-erc20";
import { isInsufficientFundsError } from "@/errors/is-insufficient-funds-error";
import { isInternalError } from "@/errors/is-internal-error";
import { isRejectedError } from "@/errors/is-rejected-error";
import { getNetwork, networkDef, NetworkType } from "@/types/network";
import {
  useChain,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { etherToWei, TinyBig } from "essential-eth";
import { useCallback, useEffect, useState } from "react";
import { encodeFunctionData } from "viem";
import { z } from "zod";
import { useCustomBundler } from "./web3/use-custom-bundler";

const exchangeSchema = z.object({
  token: z.enum(["earnm", "stormx"]),
  amount: z.number().positive(),
  network: z.enum(Object.keys(networkDef) as [NetworkType]),
});

type ExchangeType = z.infer<typeof exchangeSchema>;

export function useTokenExchange({ token, amount, network }: ExchangeType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [ongoing, setOngoing] = useState(false);
  const [finished, setFinished] = useState(false);

  const { setChain } = useChain();
  const { client, address } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({ client });
  const { waitForTransactionReceipt, chain, readContract } = useCustomBundler({
    chain: network,
  });

  function getOldTokenContractAddress() {
    if (token === "stormx") return import.meta.env.VITE_STORMX_ADDRESS;

    return network === "polygon"
      ? import.meta.env.VITE_EARNM_OLD_POL_ADDRESS
      : import.meta.env.VITE_EARNM_OLD_ETH_ADDRESS;
  }

  async function validateBalance() {
    if (!address) return false;

    const balance = await readContract({
      address: getOldTokenContractAddress(),
      abi: genericErc20,
      functionName: "balanceOf",
      args: [address],
    });
    const balanceWithPrecision = Number(balance) / 10 ** 18;
    if (balanceWithPrecision === 0) return false;

    return balanceWithPrecision > amount;
  }

  async function validateAllowance(amountInWei: TinyBig) {
    const allowance = await readContract({
      address: getOldTokenContractAddress(),
      abi: genericErc20,
      functionName: "allowance",
      args: [address, import.meta.env.VITE_TOKEN_EXCHANGE_CONTRACT_ADDRESS],
    });
    const convertedAllowance = Number(allowance);
    if (convertedAllowance === 0) return false;

    return amountInWei.eq(convertedAllowance);
  }

  const triggerExchange = useCallback(async () => {
    if (ongoing) return;
    setOngoing(true);
    setError("");

    try {
      const hasValidBalance = await validateBalance();
      if (!hasValidBalance) {
        throw new Error("invalidBalance");
      }

      const amountInWei = etherToWei(amount);

      const hasValidAllowance = await validateAllowance(amountInWei);
      if (!hasValidAllowance) {
        const { hash } = await sendUserOperationAsync({
          uo: {
            target: getOldTokenContractAddress(),
            data: encodeFunctionData({
              abi: genericErc20,
              functionName: "approve",
              args: [CONTRACT_ADDRESS, amountInWei],
            }),
          },
        });

        await waitForTransactionReceipt({ hash });
      }

      await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "convert",
            args: [
              getOldTokenContractAddress(),
              BigInt(amountInWei.toString()),
            ],
          }),
        },
      });

      setFinished(true);
    } catch (error) {
      if (error instanceof Error && error.message.includes("invalidBalance")) {
        setError(
          `Oops! Looks like you don't have enough balance to make this exchange.`
        );
      } else if (isInternalError(error)) {
        setError("Oops! Looks like an internal error happens.");
      } else if (isInsufficientFundsError(error)) {
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
      setOngoing(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, waitForTransactionReceipt, ongoing]);

  useEffect(() => {
    if (!loading) return;

    const selectedChain = getNetwork(token === "stormx" ? "ethereum" : network);
    if (selectedChain.id !== chain.id) {
      return;
    }

    triggerExchange();
  }, [chain, loading, network, token, triggerExchange]);

  function trigger() {
    const { success } = exchangeSchema.safeParse({ token, amount, network });
    if (!success) {
      setError("Oops! Looks like you filled amount with invalid value.");
      return;
    }

    setLoading(true);
    const selectedChain = getNetwork(token === "stormx" ? "ethereum" : network);
    setChain({ chain: selectedChain });
  }

  return { trigger, loading, error, finished };
}
