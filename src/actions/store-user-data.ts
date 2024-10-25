import { z } from "zod";
import { InvalidPayloadError } from "./errors/invalid-payload-error";
import { api } from "@/services/api";
import { getUserReferralCode } from "./get-user-referral-code";

const requestSchema = z.object({
  referralCode: z.string().optional(),
  email: z.string().email(),
  mintTxnHash: z.string().trim().max(2048),
  wallet: z.string(),
  amount: z.number().positive(),
  price: z.number(),
  bonusType: z.number(),
});

type RequestType = z.infer<typeof requestSchema>;

export async function storeUserData(userData: RequestType) {
  const { data, success } = requestSchema.safeParse(userData);
  if (!success) {
    throw new InvalidPayloadError();
  }

  try {
    const referralCode = await getUserReferralCode(data.wallet, data.email);
    if (!referralCode) {
      throw new Error();
    }

    const { data: response } = await api.post("/smartnodes", {
      ...data,
      userReferralCode: referralCode,
    });

    return response;
  } catch {
    return null;
  }
}
