import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import { SuccessfullyTransactionHash } from "./successfully-transaction-hash";
import { useStore } from "../../contexts/use-store";

const COMPONENT_ID = "web3-transaction-hash";

vi.mock("../../contexts/use-store", () => ({
  useStore: vi.fn(),
}));

describe("SuccessfullyTransactionHash", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display the transaction hash when present", () => {
    const mockedHash = "0x1234567890abcdef";
    (useStore as Mock).mockReturnValue({
      getTransactionHash: () => mockedHash,
    });

    const textField = document.createElement("span");
    textField.id = COMPONENT_ID;
    document.body.appendChild(textField);

    render(<SuccessfullyTransactionHash />);

    expect(textField.textContent).toBe(mockedHash);

    document.body.removeChild(textField);
  });

  it(`should display "Not Found" when no transaction hash is present`, () => {
    (useStore as Mock).mockReturnValue({
      getTransactionHash: () => null,
    });

    const textField = document.createElement("span");
    textField.id = COMPONENT_ID;
    document.body.appendChild(textField);

    render(<SuccessfullyTransactionHash />);

    expect(textField.textContent).toBe("...");

    document.body.removeChild(textField);
  });

  it("should handle the absence of transaction hash text field gracefully", () => {
    render(<SuccessfullyTransactionHash />);
  });
});
