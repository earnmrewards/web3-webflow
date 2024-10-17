import { z } from "zod";

const schema = z.object({
  referralCode: z.string(),
  name: z.string(),
  maxSmartNodes: z.number().positive(),
  availableSmartNodes: z.number(),
  paymentsWallet: z.string(),
  currentPrice: z.number().positive(),
});

type ResponseType = z.infer<typeof schema>;

export async function getPartnerData(
  partnerId: string
): Promise<ResponseType | null> {
  // TODO: Add a way to change the x-api-key in the api service
  const request = await fetch(
    `${import.meta.env.VITE_SMART_NODES_PARTNER_API}/smartnodes/partner`,
    {
      method: "GET",
      headers: {
        "x-api-key": partnerId,
      },
    }
  );
  if (request.status !== 200) {
    return null;
  }

  const response = await request.json();

  return {
    availableSmartNodes: response.available_smartnodes,
    currentPrice: response.current_price,
    maxSmartNodes: response.max_smartnodes,
    name: response.name,
    paymentsWallet: response.payments_wallet,
    referralCode: response.referral_code,
  } as ResponseType;

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     const data: ResponseType = {
  //       referralCode: "CODE_123",
  //       name: "Test Partner",
  //       maxSmartNodes: 100,
  //       availableSmartNodes: 10,
  //       paymentsWallet: "0x5f3122bf7602986e68581a03395E1FcE42536a2D",
  //       currentPrice: 10,
  //     };

  //     partnerId;

  //     resolve(data);
  //   }, 1500);
  // });
}
