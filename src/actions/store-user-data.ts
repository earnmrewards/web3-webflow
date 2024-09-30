import { z } from "zod";
import { InvalidPayloadError } from "./errors/invalid-payload-error";
import { api } from "../services/api";

const requestSchema = z.object({
  referralCode: z.string().optional(),
  email: z.string().email(),
  mintTxnHash: z.string().trim().max(2048),
  wallet: z.string(),
  amount: z.number().positive(),
});

type RequestType = z.infer<typeof requestSchema>;

export async function storeUserData(userData: RequestType) {
  const { data, success } = requestSchema.safeParse(userData);
  if (!success) {
    throw new InvalidPayloadError();
  }

  const { data: response } = await api.post("/smartnodes", data);

  return response;
}
