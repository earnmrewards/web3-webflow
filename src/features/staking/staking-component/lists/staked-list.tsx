import { EarnM } from "@/assets/icons/earnm";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { Dispatch, SetStateAction } from "react";
import { MAX_ITEMS_PER_PAGE } from "../../config";
import { CheckIcon } from "@/assets/icons/check";

interface StakedListProps {
  page: number;
  selectionMode: boolean;
  selectedNodes: number[];
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
}

export function StakedList({
  page,
  selectionMode,
  selectedNodes,
  setSelectedNodes,
}: StakedListProps) {
  const { data: stakedNodes } = useStakedNodes({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });

  function isSelected(id: number) {
    return selectedNodes.includes(id);
  }

  function handleSelect(id: number) {
    if (!selectionMode) return;

    if (isSelected(id)) {
      setSelectedNodes(selectedNodes.filter((node) => node !== id));
    } else {
      setSelectedNodes([...selectedNodes, id]);
    }
  }

  return (
    <div className="mt-3 pr-2 grid py-0 grid-cols-1 gap-4 md:max-h-[490px] overflow-y-auto custom-scrollbar">
      {stakedNodes &&
        stakedNodes.nodes.map(({ tokenId, stakedAt, reward }) => (
          <div
            key={tokenId}
            data-selected={isSelected(tokenId)}
            data-mode={selectionMode}
            className="min-w-fit w-full flex flex-row justify-between gap-4 border border-[#C5C5C5] data-[selected=true]:border-[#00D632] rounded-2xl p-5 data-[mode=true]:cursor-pointer overflow-x-auto custom-thin-scrollbar"
            onClick={() => handleSelect(tokenId)}
          >
            {selectionMode && (
              <div className="flex items-center justify-center max-w-20">
                <div
                  data-selected={isSelected(tokenId)}
                  className="flex items-center justify-center w-5 h-5 rounded-md bg-[#C5C5C5] data-[selected=true]:bg-[#00D632]"
                >
                  {isSelected(tokenId) && (
                    <CheckIcon className="w-3.5 h-3.5 color-white" />
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-block-24 font-galano whitespace-nowrap">
                SmartNode ID
              </span>
              <span className="heading-text-table text-white font-bold">
                {tokenId}
              </span>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-block-24 font-galano">Staked on</span>
              <span className="heading-text-table text-white font-bold">
                {new Date(stakedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-block-24 font-galano whitespace-nowrap">
                Withdrawable Now
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
          </div>
        ))}
    </div>
  );
}
