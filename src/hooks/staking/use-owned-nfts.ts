import { useUser } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const responseSchema = z.object({
  ownedNfts: z.array(
    z.object({
      contractAddress: z.string(),
      tokenId: z.string(),
    })
  ),
});

export function useOwnedNFTs() {
  const user = useUser();

  async function getOwnedNFTs() {
    if (!user) return;

    const url = new URL(
      `${import.meta.env.VITE_ALCHEMY_ARB_RPC_URL}/nft/v3/${
        import.meta.env.VITE_ALCHEMY_API_KEY
      }/getNFTsForOwner`
    );
    url.searchParams.append("owner", user.address);
    url.searchParams.append("withMetadata", "false");

    const request = await fetch(url.toString());
    if (request.status !== 200) {
      console.error("Failed to fetch the owned nfts", {
        status: request.status,
      });
      return [];
    }

    const response = await request.json();
    const parsedResponse = responseSchema.safeParse(response);
    if (!parsedResponse.success) {
      console.error("A wrong response body was coming from owned nft list");
      return [];
    }

    const snTokens = parsedResponse.data.ownedNfts.filter(
      (tokens) =>
        tokens.contractAddress ===
        import.meta.env.VITE_SMART_NODES_CONTRACT_ADDRESS
    );

    return snTokens;
  }

  return useQuery({
    queryKey: ["owned-nfts", user?.address],
    queryFn: getOwnedNFTs,
    initialData: [],
    enabled: !!user,
  });
}
