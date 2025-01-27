import { genericErc20 } from "@/config/contracts/token-exchange/generic-erc20";
import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { useCustomBundler } from "./web3/use-custom-bundler";
import { networkDef } from "@/types/network";

const tokenAddresses = {
  earnm: import.meta.env
    .VITE_OLD_TOKEN_EXCHANGE_CONTRACT_ADDRESS as `0x${string}`,
  stormx: import.meta.env.VITE_OLD_TOKEN_STMX_CONTRACT_ADDRESS as `0x${string}`,
  earnmv2: import.meta.env.VITE_NEW_EARNM_TOKEN_ADDRESS,
};

const tokenNetwork: Record<
  keyof typeof tokenAddresses,
  keyof typeof networkDef
> = {
  earnm: "polygon",
  stormx: "ethereum",
  earnmv2: "polygon",
};

export function useUserTokenBalance(token: keyof typeof tokenAddresses) {
  const user = useUser();

  const { readContract } = useCustomBundler({
    chain: tokenNetwork[token],
  });

  async function getBalance() {
    if (!user) return;

    try {
      const balance = await readContract({
        address: tokenAddresses[token],
        abi: genericErc20,
        functionName: "balanceOf",
        args: [user.address],
      });

      return Number(balance) / 10 ** 18;
    } catch (error) {
      return 0;
    }
  }

  return useQuery({
    queryKey: ["token-balance", token, user?.address],
    queryFn: getBalance,
    initialData: 0,

    enabled: !!user && !!token,
  });
}
