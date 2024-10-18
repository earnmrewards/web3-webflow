interface Response {
  [key: string]: {
    usd: number;
  };
}

export async function getConversionRate(pair = "ethereum") {
  const request = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${pair}&vs_currencies=usd`
  );
  if (request.status !== 200)
    throw new Error("failed to fetch the conversion rate");

  const response = (await request.json()) as Response;
  if (!response[pair]) throw new Error("failed to fetch the pair data");

  return response[pair].usd;
}
