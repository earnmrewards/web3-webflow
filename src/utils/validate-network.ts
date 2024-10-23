import { ethers } from "ethers";

const networkId = {
  arbitrum: {
    mainnet: 42161n,
    testnet: 421614n,
  },
};

export async function validateNetwork(network: keyof typeof networkId) {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const { chainId } = await provider.getNetwork();

  const { mainnet, testnet } = networkId[network];
  const validChainId =
    import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet;

  return chainId === validChainId;
}
