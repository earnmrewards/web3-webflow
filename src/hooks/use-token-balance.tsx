import { genericErc20 } from "@/config/contracts/token-exchange/generic-erc20";
import { useCustomBundler } from "./web3/use-custom-bundler";
import { useUser } from "@account-kit/react";
import { Address } from "@/types";
import { useQuery } from "@tanstack/react-query";

type TokenType = "earnm" | "stormx" | "earnmv2";

type TokenContractType = {
  [token in TokenType]: {
    eth: Address;
    pol?: Address;
  };
};

export function useTokenBalance(token: TokenType) {
  const user = useUser();

  const { readContract: arbRc } = useCustomBundler({
    chain: "arbitrum",
  });

  const { readContract: baseRc } = useCustomBundler({
    chain: "base",
  });

  const { readContract: ethRc } = useCustomBundler({
    chain: "ethereum",
  });

  const { readContract: polRc } = useCustomBundler({
    chain: "polygon",
  });

  const tokenContract: TokenContractType = {
    earnm: {
      eth: import.meta.env.VITE_EARNM_OLD_ETH_ADDRESS,
      pol: import.meta.env.VITE_EARNM_OLD_POL_ADDRESS,
    },
    stormx: {
      eth: import.meta.env.VITE_STORMX_ADDRESS,
    },
    earnmv2: {
      eth: import.meta.env.VITE_EARNM_NEW_ETH_ADDRESS,
      pol: import.meta.env.VITE_EARNM_NEW_POL_ADDRESS,
    },
  };

  async function getBalance() {
    if (!user) return 0;

    const selectedToken = tokenContract[token];

    const ethBalances = await Promise.all(
      [arbRc, baseRc, ethRc].map(async (readContract) => {
        try {
          const balance = await readContract({
            address: selectedToken.eth,
            abi: genericErc20,
            functionName: "balanceOf",
            args: [user.address],
          });
          return Number(balance) / 10 ** 18;
        } catch {
          return 0;
        }
      })
    );

    const ethBalance = ethBalances.reduce((acc, balance) => acc + balance, 0);

    let polBalance = 0;
    if (selectedToken.pol) {
      const polBalances = await Promise.all(
        [polRc].map(async (readContract) => {
          try {
            const balance = await readContract({
              address: selectedToken.pol as Address,
              abi: genericErc20,
              functionName: "balanceOf",
              args: [user.address],
            });
            return Number(balance) / 10 ** 18;
          } catch {
            return 0;
          }
        })
      );

      polBalance = polBalances.reduce((acc, balance) => acc + balance, 0);
    }

    return ethBalance + polBalance;
  }

  return useQuery({
    queryKey: ["token-balance", token, user?.address],
    queryFn: getBalance,
    initialData: 0,
    enabled: !!user,
  });
}
