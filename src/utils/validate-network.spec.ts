import { networkDef, NetworkType } from "@/types/network";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { validateNetwork } from "./validate-network";

describe("validateNetwork", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should return true if the chainId matches the expected mainnet id in production", async () => {
    process.env.VITE_ENVIRONMENT = "production";

    const network: NetworkType = "arbitrum";
    const chainId = networkDef[network].mainnet.id;

    const result = await validateNetwork(network, chainId);
    expect(result).toBe(true);
  });

  it("should return true if the chainId matches the expected testnet id in staging", async () => {
    process.env.VITE_ENVIRONMENT = "development";

    const network: NetworkType = "polygon";
    const chainId = networkDef[network].testnet.id;

    const result = await validateNetwork(network, chainId);
    expect(result).toBe(true);
  });

  it("should return false if the chainId does not match the expected id", async () => {
    process.env.VITE_ENVIRONMENT = "production";

    const network: NetworkType = "base";
    const invalidChainId = 9999;

    const result = await validateNetwork(network, invalidChainId);
    expect(result).toBe(false);
  });
});
