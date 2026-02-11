import { networkDef, NetworkType } from "@/types/network";

export async function validateNetwork(network: NetworkType, chainId: number) {
  const { mainnet, testnet } = networkDef[network];
  const validChain =
    import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet;

  return chainId === validChain.id;
}
