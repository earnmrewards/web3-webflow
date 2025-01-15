import { abi, CONTRACT_ADDRESS } from "@/config/contracts/token-exchange";
import { genericErc20 } from "@/config/contracts/token-exchange/generic-erc20";
import { Storage, useStore } from "@/contexts/use-store";
import { isInsufficientFundsError } from "@/errors/is-insufficient-funds-error";
import { isInternalError } from "@/errors/is-internal-error";
import { isRejectedError } from "@/errors/is-rejected-error";
import { TOKEN_EXCHANGE_STORAGE_KEY } from "@/features/token-exchange/config";
import { networkDef } from "@/types/network";
import {
  useBundlerClient,
  useChain,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { etherToWei } from "essential-eth";
import { useCallback, useEffect, useState } from "react";
import { encodeFunctionData } from "viem";
import { z } from "zod";

const exchangeSchema = z.object({
  token: z.enum(["earnm", "stormx"]),
  amount: z.number().positive(),
  network: z.enum(Object.keys(networkDef) as [keyof typeof networkDef]),
});

type ExchangeType = z.infer<typeof exchangeSchema>;

export function useTokenExchange({ token, amount, network }: ExchangeType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [ongoing, setOngoing] = useState(false);

  const store = useStore();

  const { setChain } = useChain();
  const { client } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({ client });
  const { waitForTransactionReceipt, chain } = useBundlerClient();

  const getSelectedChain = useCallback(() => {
    const { mainnet, testnet } =
      networkDef[token === "stormx" ? "ethereum" : network];

    return import.meta.env.VITE_ENVIRONMENT === "production"
      ? mainnet
      : testnet;
  }, [network, token]);

  function getApproveHash() {
    const storage = store.get<string>(
      TOKEN_EXCHANGE_STORAGE_KEY,
      Storage.LOCAL
    );
    if (!storage) return;
    const { approveHash, amount: storedAmount } = storage;

    return !!approveHash && Number(storedAmount) === amount;
  }

  const triggerExchange = useCallback(async () => {
    if (ongoing) return;
    setOngoing(true);

    try {
      const tokenContractAddress = (
        token === "stormx"
          ? import.meta.env.VITE_OLD_TOKEN_STMX_CONTRACT_ADDRESS
          : import.meta.env.VITE_OLD_TOKEN_EXCHANGE_CONTRACT_ADDRESS
      ) as `0x${string}`;

      const amountInWei = etherToWei(amount);

      // TODO: Upgrade to allowance function validator
      if (!getApproveHash()) {
        const { hash } = await sendUserOperationAsync({
          uo: {
            target: tokenContractAddress,
            data: encodeFunctionData({
              abi: genericErc20,
              functionName: "approve",
              args: [CONTRACT_ADDRESS, amountInWei],
            }),
          },
        });

        store.set(
          TOKEN_EXCHANGE_STORAGE_KEY,
          { approveHash: hash, amount },
          Storage.LOCAL
        );
        await waitForTransactionReceipt({ hash });
        console.log({ hash });
      }

      console.log({
        target: CONTRACT_ADDRESS,
        tokenContract: tokenContractAddress,
        amountInWei: BigInt(amountInWei.toString()),
      });

      const { hash: convertHash } = await sendUserOperationAsync({
        uo: {
          target: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi,
            functionName: "convert",
            args: [tokenContractAddress, BigInt(amountInWei.toString())],
          }),
        },
      });

      console.log({ convertHash });
    } catch (error) {
      console.log(error);
      if (isInternalError(error)) {
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
      store.del(TOKEN_EXCHANGE_STORAGE_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, waitForTransactionReceipt, ongoing, store, getApproveHash]);

  useEffect(() => {
    if (!loading) return;

    const selectedChain = getSelectedChain();
    if (selectedChain.id !== chain.id) {
      return;
    }

    triggerExchange();
  }, [chain, loading, getSelectedChain, triggerExchange]);

  function trigger() {
    const { success } = exchangeSchema.safeParse({ token, amount, network });
    if (!success) {
      setError("Oops! Looks like you filled amount with invalid value.");
      return;
    }

    setLoading(true);
    setChain({ chain: getSelectedChain() });
  }

  return { trigger, loading, error };
}
