import { useHistory } from "@/hooks/staking/use-history";
import {
  explorerUrl,
  MAX_ITEMS_PER_PAGE,
  nftCollectionUrl,
} from "../../config";
import { shortenAddress } from "@/utils/shorten-address";
import { useModal } from "@/contexts/use-modal";
import { InvertedCoin } from "@/assets/icons/inverted-coin";

interface HistoryListProps {
  page: number;
}

type HistoryNodes = number[];

const typeName = {
  claim: "Claimed",
  stake: "Staked",
  unstake: "Unstaked",
};

export function HistoryList({ page }: HistoryListProps) {
  const { data } = useHistory({ page, take: MAX_ITEMS_PER_PAGE });
  const { setIsOpen, setSelectedHash } = useModal();

  function getNodeProperties(nodes: HistoryNodes) {
    if (nodes.length === 1) {
      return {
        href: `${nftCollectionUrl}/${nodes[0]}`,
        target: "_blank",
      };
    }

    return {
      href: undefined,
      target: "_self",
    };
  }

  function handleSingleNodeClick(nodes: HistoryNodes, hash: string) {
    if (nodes.length === 1) return;

    setSelectedHash(hash);
    setIsOpen(true);
  }

  return (
    <>
      <ul className="mt-3 pr-2 grid py-0 grid-cols-1 gap-4 md:max-h-[490px] overflow-y-auto custom-scrollbar">
        {data &&
          data.history.map(
            (
              {
                actionTimestamp,
                hash,
                actionType,
                smartNodeIds,
                claimedAmountEther,
              },
              index
            ) => (
              <li
                key={index}
                className="min-w-fit w-full flex flex-row items-center justify-center border border-[#C5C5C5] rounded-2xl p-5"
              >
                <div className="flex flex-1 justify-center">
                  <div className="flex flex-col w-24">
                    <span className="text-block-24 font-galano whitespace-nowrap">
                      Date
                    </span>
                    <span className="heading-text-table text-white font-bold">
                      {new Date(actionTimestamp * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 justify-center">
                  <div className="flex flex-col w-32">
                    <span className="text-block-24 font-galano">Hash</span>
                    <a
                      href={`${explorerUrl}/${hash}`}
                      target="_blank"
                      className="heading-text-table text-white font-bold underline"
                    >
                      {shortenAddress(hash)}
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 justify-center">
                  <div className="flex flex-col w-24">
                    <span className="text-block-24 font-galano whitespace-nowrap">
                      Node IDs
                    </span>
                    <a
                      className="heading-text-table text-white font-bold underline cursor-pointer whitespace-nowrap"
                      {...getNodeProperties(smartNodeIds)}
                      onClick={() => handleSingleNodeClick(smartNodeIds, hash)}
                    >
                      {smartNodeIds.length === 1
                        ? smartNodeIds[0]
                        : "View List"}
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 justify-center">
                  <div className="flex flex-col w-32">
                    <span className="text-block-24 font-galano whitespace-nowrap">
                      Amount of Nodes
                    </span>
                    <span className="heading-text-table text-white font-bold">
                      {smartNodeIds.length.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 justify-start">
                  <div className="flex flex-col w-fit">
                    <span className="text-block-24 font-galano whitespace-nowrap">
                      Action
                    </span>
                    <div className="flex items-center gap-2 px-3 py-0.5 bg-[#00420F] rounded-full">
                      <div className="flex items-center gap-1 text-[#00D632] font-bold">
                        <span className="heading-text-table capitalize text-sm">
                          {typeName[actionType]}
                        </span>
                        {actionType === "claim" && (
                          <>
                            <span className="text-xs">+</span>
                            <InvertedCoin className="w-4 h-4" />
                            {claimedAmountEther.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
      </ul>
    </>
  );
}
