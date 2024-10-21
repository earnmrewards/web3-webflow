import { z } from "zod";

const schema = z.object({
  partnerId: z.string(),
  transactionHash: z.string(),
  totalInEth: z.number(),
  totalInUsd: z.number(),
  quantity: z.number(),
  bonusPlan: z.number(),
  wallet: z.string(),
  email: z.string().email(),
  userReferralCode: z.string(),
  transactionReferralCode: z.string(),
});

type PurchaseTrackerType = z.infer<typeof schema>;

export async function purchaseTracker({
  partnerId,
  transactionHash,
  totalInEth,
  totalInUsd,
  quantity,
  bonusPlan,
  wallet,
  email,
  userReferralCode,
  transactionReferralCode,
}: PurchaseTrackerType) {
  // TODO: Add a way to change the x-api-key in the api service
  const request = await fetch(
    `${import.meta.env.VITE_SMART_NODES_PARTNER_API}/smartnodes/transaction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": partnerId,
      },
      body: JSON.stringify({
        transaction_hash: transactionHash,
        eth_amount: totalInEth,
        usd_amount: totalInUsd,
        quantity,
        bonus_plan: bonusPlan,
        wallet,
        email,
        user_referral_code: userReferralCode,
        transaction_referral_code: transactionReferralCode,
      }),
    }
  );

  return request.status === 201;
}
