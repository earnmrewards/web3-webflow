import { describe, expect, it, Mock, vi } from "vitest";

import { api } from "../services/api";
import { calculateMintFee } from "./calculate-mint-fee";

vi.mock("../services/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("calculateMintFee case", () => {
  it("should return the mint fee from the API when the status is 200", async () => {
    const mockAmount = 1;
    const mockMintFee = "10";
    const mockResponse = { mintFeeWei: mockMintFee };

    (api.get as Mock).mockResolvedValueOnce({
      data: mockResponse,
      status: 200,
    });

    const result = await calculateMintFee(mockAmount);

    expect(result).toBe(mockMintFee);
    expect(api.get).toHaveBeenCalledWith(
      `/smartnodes/mintfee?amount=${mockAmount}`
    );
  });

  it("should return the default mint fee when the status is not 200", async () => {
    (api.get as Mock).mockResolvedValueOnce({
      status: 500,
    });

    const result = await calculateMintFee(1);

    expect(result).toBe("140000000000000000");
  });

  it("should return the default mint fee when data is undefined", async () => {
    (api.get as Mock).mockResolvedValueOnce({
      status: 200,
    });

    const result = await calculateMintFee(1);

    expect(result).toBe("140000000000000000");
  });
});
