import { describe, expect, it, Mock, vi } from "vitest";

import { api } from "../services/api";
import { calculateMintFee } from "./calculate-mint-fee";

vi.mock("@/services/api", () => ({
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

  it("should throw an error when the status is not 200", async () => {
    (api.get as Mock).mockResolvedValueOnce({
      status: 500,
    });

    await expect(calculateMintFee(1)).rejects.toThrow(Error);
    expect(api.get).toHaveBeenCalledWith(`/smartnodes/mintfee?amount=1`);
  });

  it("should throw an error when data is undefined", async () => {
    (api.get as Mock).mockResolvedValueOnce({
      data: undefined,
      status: 200,
    });

    await expect(calculateMintFee(1)).rejects.toThrow(Error);
    expect(api.get).toHaveBeenCalledWith(`/smartnodes/mintfee?amount=1`);
  });

  it("should throw an error if the API call fails", async () => {
    (api.get as Mock).mockRejectedValueOnce(new Error("Network Error"));

    await expect(calculateMintFee(1)).rejects.toThrow("Network Error");
    expect(api.get).toHaveBeenCalledWith(`/smartnodes/mintfee?amount=1`);
  });
});
