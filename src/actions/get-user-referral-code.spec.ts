import { api } from "@/services/api";
import { describe, expect, it, Mock, vi } from "vitest";
import { getUserReferralCode } from "./get-user-referral-code";

vi.mock("@/services/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("getUserReferralCode", () => {
  const mockAddress = "0x123";
  const mockEmail = "test@t.com";
  const mockReferralCode = "ref123";

  it("should return the referral code when API responds with data", async () => {
    (api.get as Mock).mockResolvedValueOnce({
      data: { referral_code: mockReferralCode },
    });

    const result = await getUserReferralCode(mockAddress, mockEmail);

    expect(result).toBe(mockReferralCode);
    expect(api.get).toHaveBeenCalledWith(
      `/smartnodes/referral_code?address=${mockAddress}&email=${mockEmail}`
    );
  });

  it("should return 'Unknown' when the address is missing", async () => {
    const result = await getUserReferralCode(undefined, mockEmail);

    expect(result).toBe("Unknown");
  });

  it("should return 'Unknown' when the email is missing", async () => {
    const result = await getUserReferralCode(mockAddress, undefined);

    expect(result).toBe("Unknown");
  });

  it("should return 'Unknown' when the API response data is undefined", async () => {
    (api.get as Mock).mockResolvedValueOnce({ data: undefined });

    const result = await getUserReferralCode(mockAddress, mockEmail);

    expect(result).toBe("Unknown");
  });
});
