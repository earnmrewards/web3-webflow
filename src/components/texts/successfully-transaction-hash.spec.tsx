import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SuccessfullyTransactionHash } from "./successfully-transaction-hash";

const COMPONENT_ID = "web3-transaction-hash";
const baseUrl = "http://localhost/";

describe("SuccessfullyTransactionHash", () => {
  it("should display the transaction hash when present in the URL", () => {
    const hash = "0x1234567890abcdef";
    window.location = { href: `${baseUrl}?txHash=${hash}` } as any;

    const textField = document.createElement("span");
    textField.id = COMPONENT_ID;
    document.body.appendChild(textField);

    render(<SuccessfullyTransactionHash />);

    expect(textField.textContent).toBe(hash);

    document.body.removeChild(textField);
  });

  it(`should display "Not Found" when no transaction hash is present in the URL`, () => {
    window.location = { href: baseUrl } as any;

    const textField = document.createElement("span");
    textField.id = COMPONENT_ID;
    document.body.appendChild(textField);

    render(<SuccessfullyTransactionHash />);

    expect(textField.textContent).toBe("Not found");

    document.body.removeChild(textField);
  });

  it("should handle the absence of transaction hash text field gracefully", () => {
    render(<SuccessfullyTransactionHash />);
  });
});
