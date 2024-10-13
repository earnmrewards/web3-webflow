import { z } from "zod";
import { api } from "@/services/api";
import { InvalidReferralCode } from "./errors/invalid-referral-code";

const responseSchema = z.object({
  revenue: z.number(),
  smartnodes: z.number(),
  referralCode: z.string(),
});

type ResponseType = z.infer<typeof responseSchema>;

export async function getDashboardData(
  referralCode: string
): Promise<ResponseType> {
  const { data, status } = await api.get<ResponseType>(
    `/smartnodes/summary?referralCode=${referralCode}`
  );
  if (status !== 200 || !data) {
    throw new InvalidReferralCode();
  }

  return data;
}
