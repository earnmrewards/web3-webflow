import { api } from "@/services/api";
import { describe, expect, it, Mock, vi } from "vitest";
import { emailSubmission } from "./email-submission";

vi.mock("@/services/api", () => ({
  api: {
    post: vi.fn(),
  },
}));

describe("emailSubmission", () => {
  const mockRequest = {
    email: "test@t.com",
    url: "https://earnm.com",
  };

  it("should return true when the API response status is 200", async () => {
    (api.post as Mock).mockResolvedValueOnce({ status: 200 });

    const result = await emailSubmission(mockRequest);

    expect(result).toBe(true);
    expect(api.post).toHaveBeenCalledWith(
      "/submit",
      mockRequest,
      "SMART_NODES"
    );
  });

  it("should return false when the API response status is not 200", async () => {
    (api.post as Mock).mockResolvedValueOnce({ status: 500 });

    const result = await emailSubmission(mockRequest);

    expect(result).toBe(false);
    expect(api.post).toHaveBeenCalledWith(
      "/submit",
      mockRequest,
      "SMART_NODES"
    );
  });

  it("should return false when the API request throws an error", async () => {
    (api.post as Mock).mockRejectedValueOnce(new Error("Network Error"));

    const result = await emailSubmission(mockRequest);

    expect(result).toBe(false);
    expect(api.post).toHaveBeenCalledWith(
      "/submit",
      mockRequest,
      "SMART_NODES"
    );
  });
});
