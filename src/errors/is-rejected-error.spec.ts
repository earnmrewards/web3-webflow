import { BaseError, TransactionExecutionError } from "viem";
import { describe, expect, it } from "vitest";
import { isRejectedError } from "./is-rejected-error";

class MockTransactionExecutionError extends TransactionExecutionError {
  constructor(public shortMessage: string = "") {
    super(new BaseError(shortMessage), {} as any);
  }
}

describe("isRejectedError", () => {
  it("should return true if error is an instance of TransactionExecutionError and contains rejected in shortMessage", () => {
    const error = new MockTransactionExecutionError("Transaction was rejected");
    expect(isRejectedError(error)).toBe(true);
  });

  it("should return false if error is an instance of TransactionExecutionError but does not contain rejected in shortMessage", () => {
    const error = new MockTransactionExecutionError("Generic error");
    expect(isRejectedError(error)).toBe(false);
  });

  it("should return false if error is not an instance of TransactionExecutionError", () => {
    const error = new Error("Generic error");
    expect(isRejectedError(error)).toBe(false);
  });
});
