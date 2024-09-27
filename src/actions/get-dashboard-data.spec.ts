import { describe, expect, it, Mock, vi } from "vitest";
import { api } from "../services/api";
import { getDashboardData } from "./get-dashboard-data";
import { InvalidReferralCode } from "./errors/invalid-referral-code";

vi.mock("../services/api");

const validReferralCode = "validCode";
const invalidReferralCode = "invalidCode";

describe("getDashboardData", () => {
  it("should return the dashboard data on a successful API call", async () => {
    const mockResponse = {
      revenue: 500,
      smartnodes: 10,
      referralCode: validReferralCode,
    };

    (api.get as Mock).mockResolvedValue({
      status: 200,
      data: mockResponse,
    });

    const result = await getDashboardData(validReferralCode);
    expect(result).toEqual(mockResponse);
    expect(api.get).toHaveBeenCalledWith(
      `/smartnodes/summary?referralCode=${validReferralCode}`
    );
  });

  it("should throw InvalidReferralCode error if status is not 200", async () => {
    (api.get as Mock).mockResolvedValue({
      status: 500,
      data: null,
    });

    await expect(getDashboardData(invalidReferralCode)).rejects.toThrow(
      InvalidReferralCode
    );
    expect(api.get).toHaveBeenCalledWith(
      `/smartnodes/summary?referralCode=${invalidReferralCode}`
    );
  });

  it("should throw InvalidReferralCode error if data is invalid", async () => {
    (api.get as Mock).mockResolvedValue({
      status: 200,
      data: null,
    });

    await expect(getDashboardData(invalidReferralCode)).rejects.toThrow(
      InvalidReferralCode
    );
    expect(api.get).toHaveBeenCalledWith(
      `/smartnodes/summary?referralCode=${invalidReferralCode}`
    );
  });
});
