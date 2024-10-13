import { describe, expect, it } from "vitest";
import { getEncryptedData } from "./get-encrypted-data";

type Data = { email: string; hash: string };

describe("getEncryptedData", () => {
  it("should correctly decrypt and parse valid encrypted data", () => {
    const data = { email: "test@test.test", hash: "0x123" };
    const jsonData = JSON.stringify(data);
    const encryptedData = btoa(jsonData);

    const result = getEncryptedData<Data>(encryptedData);

    expect(result).toEqual(data);
  });

  it("should return an error object if the encrypted string cannot be parsed", () => {
    const invalidEncryptedData = btoa("This is not valid JSON");

    const result = getEncryptedData<Data>(invalidEncryptedData);

    expect(result).toEqual({ error: expect.anything() });
  });

  it("should handle empty string input", () => {
    const emptyEncryptedData = btoa("");

    const result = getEncryptedData<Data>(emptyEncryptedData);

    expect(result).toEqual({ error: expect.anything() });
  });

  it("should handle non-base64-encoded strings", () => {
    const nonBase64String = "notBase64Encoded";

    const result = getEncryptedData<Data>(nonBase64String);

    expect(result).toEqual({ error: expect.anything() });
  });

  it("should handle missing or invalid properties in the encrypted JSON", () => {
    const mockedInvalidData = { name: "john" };
    const encryptedInvalidData = btoa(JSON.stringify(mockedInvalidData));

    const result = getEncryptedData<{ name: string }>(encryptedInvalidData);

    expect(result).toEqual(mockedInvalidData);
  });
});
