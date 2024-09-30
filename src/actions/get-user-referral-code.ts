import { Address } from "../types";

interface Response {
  referral_code: string;
}

const UNKNOWN_CODE = "Unknown";

export async function getUserReferralCode(address: Address) {
  try {
    const request = await fetch(
      `https://g5vv4opzusgzy4ectn3twhtmsm0iyrlt.lambda-url.us-west-2.on.aws?address=${address}`,
      {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_LAMBDA_KEY,
        },
      }
    );
    const response = (await request.json()) as Response;
    if (!response || response.referral_code) {
      return UNKNOWN_CODE;
    }

    return response.referral_code;
  } catch (error) {
    return UNKNOWN_CODE;
  }
}
