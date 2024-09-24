import { EstimateGasExecutionError, RpcRequestError } from "viem";
import { describe, expect, it } from "vitest";
import { isInsufficientFundsError } from "./is-insufficient-funds-error";

class MockRpcRequestError extends RpcRequestError {
  constructor(public metaMessages: string[] = []) {
    super({
      body: { error: metaMessages },
      error: { code: 500, message: "mocked error" },
      url: "https://error.com",
    });
  }
}

describe("isInsufficientFundsError", () => {
  it("should return true if error is an instance of EstimateGasExecutionError", () => {
    const error = new EstimateGasExecutionError({} as any, {} as any);
    expect(isInsufficientFundsError(error)).toBe(true);
  });

  it("should return true if error is an instance of RpcRequestError with 'eth_estimateUserOperationGas' in metaMessages", () => {
    const estimateErrorName = "eth_estimateUserOperationGas";
    const error = new MockRpcRequestError([estimateErrorName]);
    expect(isInsufficientFundsError(error)).toBe(estimateErrorName);
  });

  it("should return false if error is an instance of RpcRequestError without 'eth_estimateUserOperationGas' in metaMessages", () => {
    const error = new MockRpcRequestError(["eth_error"]);
    expect(isInsufficientFundsError(error)).toBe(false);
  });

  it("should return false if error is not related to EstimateGasExecutionError or RpcRequestError", () => {
    const error = new Error("generic error");
    expect(isInsufficientFundsError(error)).toBe(false);
  });

  it("should return false if error is RpcRequestError but metaMessages is undefined", () => {
    const error = new MockRpcRequestError(undefined);
    expect(isInsufficientFundsError(error)).toBe(false);
  });
});
