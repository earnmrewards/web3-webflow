import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "./api";

describe("api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("get case", () => {
    it("should return data and status on a successful GET request", async () => {
      const mockResponse = { key: "value" };
      const mockStatus = 200;

      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
          status: mockStatus,
        } as Response)
      );

      const { data, status } = await api.get<typeof mockResponse>("/test");

      expect(data).toEqual(mockResponse);
      expect(status).toEqual(mockStatus);
    });

    it("should return only status on a failed GET request", async () => {
      const mockStatus = 500;

      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.reject("Failed to parse JSON"),
          status: mockStatus,
        } as Response)
      );

      const { data, status } = await api.get("/test");

      expect(data).toBeUndefined();
      expect(status).toEqual(mockStatus);
    });
  });

  describe("post case", () => {
    it("should return data and status on a successful POST request", async () => {
      const mockResponse = { key: "value" };
      const mockStatus = 201;
      const mockBody = { name: "test" };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
          status: mockStatus,
        } as Response)
      );

      const { data, status } = await api.post<
        typeof mockResponse,
        typeof mockBody
      >("/test", mockBody);

      expect(data).toEqual(mockResponse);
      expect(status).toEqual(mockStatus);
    });

    it("should return only status on a failed POST request", async () => {
      const mockStatus = 400;
      const mockBody = { name: "test" };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.reject("Failed to parse JSON"),
          status: mockStatus,
        } as Response)
      );

      const { data, status } = await api.post("/test", mockBody);

      expect(data).toBeUndefined();
      expect(status).toEqual(mockStatus);
    });
  });
});
