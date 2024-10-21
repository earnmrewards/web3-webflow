import { api } from "@/services/api";

interface Response {
  referral_code: string;
}

const UNKNOWN_CODE = "Unknown";

export async function getUserReferralCode(address?: string, email?: string) {
  if (!address || !email) return UNKNOWN_CODE;

  const { data } = await api.get<Response>(
    `/smartnodes/referral_code?address=${address}&email=${email}`
  );
  if (!data) return UNKNOWN_CODE;

  return data.referral_code;
}
