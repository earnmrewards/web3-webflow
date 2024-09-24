import { EstimateGasExecutionError, RpcRequestError } from "viem";

export function isInsufficientFundsError(error: unknown) {
  if (error instanceof EstimateGasExecutionError) return true;
  if (error instanceof RpcRequestError) {
    // Only for Alchemy Provider
    const gasFunctionName = "eth_estimateUserOperationGas";
    const foundFunctionInMessages = error.metaMessages?.find((message) =>
      message.includes(gasFunctionName)
    );

    return foundFunctionInMessages || false;
  }

  return false;
}
