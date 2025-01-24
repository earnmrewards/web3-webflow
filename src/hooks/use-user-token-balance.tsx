import { genericErc20 } from "@/config/contracts/token-exchange/generic-erc20";
import { useBundlerClient, useChain, useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";

const tokenAddresses = {
  earnm: import.meta.env
    .VITE_OLD_TOKEN_EXCHANGE_CONTRACT_ADDRESS as `0x${string}`,
  stormx: import.meta.env.VITE_OLD_TOKEN_STMX_CONTRACT_ADDRESS as `0x${string}`,
  earnmv2: import.meta.env.VITE_NEW_EARNM_TOKEN_ADDRESS,
};

export function useUserTokenBalance(token: keyof typeof tokenAddresses) {
  const user = useUser();
  const { chain } = useChain();
  const { readContract } = useBundlerClient();

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
    queryKey: ["token-balance", token, user?.address, chain],
    queryFn: getBalance,
    initialData: 0,

    enabled: !!user && !!token,
  });
}
