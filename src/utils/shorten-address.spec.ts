import { describe, expect, it } from "vitest";
import { shortenAddress } from "./shorten-address";

const address = "0x1234567890abcdef";
const sut = shortenAddress;

describe("shortenAddress", () => {
  it("should return the full address when offset is zero", () => {
    expect(sut(address, 0)).toBe(address);
  });

  it("should return the shortened address with default offset", () => {
    expect(sut(address)).toBe("0x123...bcdef");
  });

  it("should return the shortened address with custom offset", () => {
    const offset = 3;
    expect(sut(address, offset)).toBe("0x1...def");
  });

  it("should handle short address correctly", () => {
    const shortAddress = "0x123";
    expect(sut(shortAddress)).toBe(shortAddress);
  });
});
