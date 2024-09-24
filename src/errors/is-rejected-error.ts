import { TransactionExecutionError } from "viem";

export function isRejectedError(error: unknown) {
  if (error instanceof TransactionExecutionError) {
    const rejectedArg = "rejected";
    const foundRejectedMessage = error.shortMessage.includes(rejectedArg);
    return foundRejectedMessage;
  }

  return false;
}
