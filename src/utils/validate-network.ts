const networkId = {
  arbitrum: {
    mainnet: 42161,
    testnet: 421614,
  },
};

export async function validateNetwork(
  network: keyof typeof networkId,
  chainId: number
) {
  const { mainnet, testnet } = networkId[network];
  const validChainId =
    import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet;

  return chainId === validChainId;
}
