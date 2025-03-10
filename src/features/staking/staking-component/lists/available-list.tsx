import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { MAX_ITEMS_PER_PAGE } from "../../config";
import { Dispatch, SetStateAction } from "react";
import { CheckIcon } from "@/assets/icons/check";

interface AvailableListProps {
  page: number;
  selectionMode: boolean;
  selectedNodes: number[];
  setSelectedNodes: Dispatch<SetStateAction<number[]>>;
}

export function AvailableList({
  page,
  selectionMode,
  selectedNodes,
  setSelectedNodes,
}: AvailableListProps) {
  const { data: heldNodes } = useHeldNodes({
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
    <div className="mt-3 grid py-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {heldNodes &&
        heldNodes.nodes.map(({ tokenId, receivedAt }) => (
          <div
            key={tokenId}
            data-mode={selectionMode}
            data-selected={isSelected(tokenId)}
            className="flex flex-col border border-[#C5C5C5] data-[selected=true]:border-[#00D632] rounded-2xl p-3 space-y-2 data-[mode=true]:cursor-pointer"
            onClick={() => handleSelect(tokenId)}
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-block-24 font-galano">SmartNode ID</span>
                <span className="heading-text-table text-white font-bold">
                  {tokenId}
                </span>
              </div>
              {selectionMode && (
                <div
                  data-selected={isSelected(tokenId)}
                  className="ml-2 flex items-center justify-center w-5 h-5 rounded-md bg-[#C5C5C5] data-[selected=true]:bg-[#00D632]"
                >
                  {isSelected(tokenId) && (
                    <CheckIcon className="w-3.5 h-3.5 color-white" />
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col text-nowrap">
              <span className="text-block-24">Received Date</span>
              <span className="heading-text-table text-white font-bold">
                {new Date(receivedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
