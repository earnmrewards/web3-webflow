import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  polygon,
  polygonAmoy,
  sepolia,
} from "@account-kit/infra";

export const networkDef = {
  arbitrum: {
    mainnet: arbitrum,
    testnet: arbitrumSepolia,
  },
  polygon: {
    mainnet: polygon,
    testnet: polygonAmoy,
  },
  base: {
    mainnet: base,
    testnet: baseSepolia,
  },
  ethereum: {
    mainnet,
    testnet: sepolia,
  },
};

export type NetworkType = keyof typeof networkDef;

export function getNetwork(network: NetworkType) {
  const { mainnet, testnet } = networkDef[network];

  return import.meta.env.VITE_ENVIRONMENT === "production" ? mainnet : testnet;
}
