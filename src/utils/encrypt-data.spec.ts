import { describe, it, expect } from "vitest";
import { encryptData } from "./encrypt-data";

describe("encryptData", () => {
  it("should correctly encode data to a base64 string", () => {
    const data = { email: "test@test.test" };
    const jsonData = JSON.stringify(data);
    const expectedBase64 = btoa(jsonData);

    expect(encryptData(data)).toBe(expectedBase64);
  });
});
