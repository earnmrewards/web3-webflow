import { useHistory } from "@/hooks/staking/use-history";
import {
  explorerUrl,
  MAX_ITEMS_PER_PAGE,
  nftCollectionUrl,
} from "../../config";
import { shortenAddress } from "@/utils/shorten-address";
import { CheckGreen } from "@/assets/icons/check-green";
import { useModal } from "@/contexts/use-modal";
import { z } from "zod";
import { historyResponse } from "@/types/staking";
import { EarnM } from "@/assets/icons/earnm";

interface HistoryListProps {
  page: number;
}

type HistoryNodes = z.infer<typeof historyResponse>["data"][number]["nodes"];

const typeName = {
  claim: "Claimed",
  stake: "Staked",
  unstake: "Unstaked",
};

export function HistoryList({ page }: HistoryListProps) {
  const { data } = useHistory({ page, take: MAX_ITEMS_PER_PAGE });
  const { setIsOpen } = useModal();

  function getNodeProperties(nodes: HistoryNodes) {
    if (nodes.length === 1) {
      return {
        href: `${nftCollectionUrl}/${nodes[0].id}`,
        target: "_blank",
      };
    }

    return {
      href: undefined,
      target: "_self",
    };
  }

  function handleSingleNodeClick(nodes: HistoryNodes) {
    if (nodes.length === 1) return;

    setIsOpen(true);
  }

  return (
    <>
      <div className="mt-3 pr-2 grid py-0 grid-cols-1 gap-4 md:max-h-[490px] overflow-y-auto custom-scrollbar">
        {data &&
          data.history.map(
            (
              { actionDate, hash, actionType, amount, nodes, reward },
              index
            ) => (
              <div
                key={index}
                className="min-w-fit w-full flex flex-row justify-between gap-4 border border-[#C5C5C5] rounded-2xl p-5 overflow-x-auto custom-thin-scrollbar"
              >
                <div className="flex flex-col">
                  <span className="text-block-24 font-galano whitespace-nowrap">
                    Date
                  </span>
                  <span className="heading-text-table text-white font-bold">
                    {new Date(actionDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <span className="text-block-24 font-galano">Hash</span>
                  <a
                    href={`${explorerUrl}/${hash}`}
                    target="_blank"
                    className="heading-text-table text-white font-bold underline"
                  >
                    {shortenAddress(hash)}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-block-24 font-galano whitespace-nowrap">
                    Node IDs
                  </span>
                  <a
                    className="heading-text-table text-white font-bold underline cursor-pointer whitespace-nowrap"
                    {...getNodeProperties(nodes)}
                    onClick={() => handleSingleNodeClick(nodes)}
                  >
                    {nodes.length === 1 ? nodes[0].id : "View List"}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-block-24 font-galano whitespace-nowrap">
                    Amount of Nodes
                  </span>
                  <span className="heading-text-table text-white font-bold">
                    {amount.toLocaleString()}
                  </span>
                </div>

                {actionType === "claim" && reward && (
                  <div className="flex flex-col">
                    <span className="text-block-24 font-galano whitespace-nowrap">
                      Rewards
                    </span>
                    <div className="flex items-center gap-1">
                      <EarnM />
                      <span className="heading-text-table text-white font-bold">
                        {reward.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-block-24 font-galano whitespace-nowrap">
                    Action
                  </span>
                  <div className="flex items-center gap-2 px-3 py-0.5 bg-[#00420F] rounded-full">
                    <CheckGreen className="w-3.5 h-3.5" />
                    <span className="heading-text-table font-bold text-[#00D632] capitalize text-sm">
                      {typeName[actionType]}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
}
