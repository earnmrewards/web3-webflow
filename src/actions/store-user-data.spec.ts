import { describe, expect, it, Mock, vi } from "vitest";
import { api } from "../services/api";
import { storeUserData } from "./store-user-data";
import { InvalidPayloadError } from "./errors/invalid-payload-error";

vi.mock("../services/api", () => ({
  api: {
    post: vi.fn(),
  },
}));

const validUserData = {
  referralCode: "ABC123",
  email: "test@test.com",
  tokenIds: ["token1", "token2"],
  mintTxnHash: "0x123",
  wallet: "0x123",
};

describe("storeUserData case", () => {
  it("should call the API with valid user data and return the response", async () => {
    const mockApiResponse = { success: true };

    (api.post as Mock).mockResolvedValueOnce({
      data: mockApiResponse,
    });

    const result = await storeUserData(validUserData);

    expect(result).toEqual(mockApiResponse);
  });

  it("should throw InvalidPayloadError if userData is invalid", async () => {
    const invalidUserData = { ...validUserData, email: "invalid-email" };

    await expect(storeUserData(invalidUserData)).rejects.toThrow(
      InvalidPayloadError
    );
  });

  it("should throw InvalidPayloadError if tokenIds are less then 1 or more then 10", async () => {
    const emptyIds = { ...validUserData, tokenIds: [] };
    const overloadIds = {
      ...validUserData,
      tokenIds: new Array(11).fill("0x123"),
    };

    await expect(storeUserData(emptyIds)).rejects.toThrow(InvalidPayloadError);
    await expect(storeUserData(overloadIds)).rejects.toThrow(
      InvalidPayloadError
    );
  });

  it("should throw InvalidPayloadError if mintTxnHash exceeds max length", async () => {
    const invalidUserData = { ...validUserData, mintTxnHash: "a".repeat(2049) };

    await expect(storeUserData(invalidUserData)).rejects.toThrow(
      InvalidPayloadError
    );
  });
});
