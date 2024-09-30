import { api } from "../services/api";
import { Address } from "../types";

interface Response {
  referral_code: string;
}

const UNKNOWN_CODE = "Unknown";

export async function getUserReferralCode(address: Address) {
  const { data } = await api.get<Response>(
    `/smartnodes/referral_code?address=${address}&email=wilson.macedo@modemobile.com`
  );
  if (!data) {
    return UNKNOWN_CODE;
  }

  return data.referral_code;
}
