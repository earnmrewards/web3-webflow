import { EstimateGasExecutionError } from "viem";

export function isInternalError(error: unknown) {
  if (error instanceof EstimateGasExecutionError) {
    const errorMatch = "An internal error was received.";

    return error.message.includes(errorMatch);
  }

  return false;
}
