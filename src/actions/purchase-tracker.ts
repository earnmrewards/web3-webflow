import { z } from "zod";

const schema = z.object({
  partnerId: z.string(),
  transactionHash: z.string(),
  totalInEth: z.number(),
  totalInUsd: z.number(),
  quantity: z.number(),
  bonusPlan: z.number(),
  wallet: z.string(),
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
}: PurchaseTrackerType) {
  // TODO: Add a way to change the x-api-key in the api service
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        partnerId,
        transactionHash,
        totalInEth,
        totalInUsd,
        quantity,
        bonusPlan,
        wallet,
      };
      console.log({ data });
      resolve(true);
    }, 3 * 1000);
  });

  // const request = await fetch(
  //   `${
  //     import.meta.env.VITE_SMART_NODES_PARTNER_API
  //   }/api/v1/smartnodes/transaction`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "x-api-key": partnerId,
  //     },
  //     body: JSON.stringify({
  //       transaction_hash: transactionHash,
  //       eth_amount: totalInEth,
  //       usd_amount: totalInUsd,
  //       quantity,
  //       bonus_plan,
  //       wallet,
  //     }),
  //   }
  // );

  // return request.status === 201;
}
