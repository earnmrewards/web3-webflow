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
  mintTxnHash: "0x123",
  wallet: "0x123",
  amount: 1,
  price: 100,
  bonusType: 1,
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

  it("should throw InvalidPayloadError if amount is lower then 1", async () => {
    const lowerAmount = { ...validUserData, amount: 0 };

    await expect(storeUserData(lowerAmount)).rejects.toThrow(
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
