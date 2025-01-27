import { useMemo } from "react";
import { createBundlerClient } from "@aa-sdk/core";
import { alchemy } from "@account-kit/infra";
import { networkDef } from "@/types/network";

interface CustomBundlerProps {
  chain: keyof typeof networkDef;
}

export function useCustomBundler({ chain }: CustomBundlerProps) {
  const { mainnet, testnet } = networkDef[chain];

  const client = useMemo(() => {
    return createBundlerClient({
      chain:
        import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet,
      transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    });
  }, [mainnet, testnet]);

  return client;
}
