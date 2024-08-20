import { api } from "../services/api";

interface Response {
  mintFeeWei: string;
}

export async function calculateMintFee(amount: number): Promise<string> {
  const { data, status } = await api.get<Response>(
    `/smartnodes/mintfee?amount=${amount}`
  );
  if (status !== 200 || !data) {
    return "140000000000000000";
  }

  return data.mintFeeWei;
}
