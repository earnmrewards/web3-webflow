import { MAX_ITEMS_PER_PAGE } from "../config";
import { StakeOption } from "./types";

interface StakingTableListSkeletonProps {
  option: StakeOption;
}

export function StakingTableListSkeleton({
  option,
}: StakingTableListSkeletonProps) {
  if (option === "staked") {
    return (
      <div className="grid py-0 grid-cols-1 gap-4">
        {new Array(MAX_ITEMS_PER_PAGE).fill(0).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="flex items-center border border-[#C5C5C5] rounded-2xl p-2 space-x-4"
          >
            <div className="flex flex-col">
              <span className="text-block-24">ID</span>
              <div className="mt-1 h-6 w-12 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
            </div>
            <div className="flex flex-col text-nowrap">
              <span className="text-block-24">Purchased Date</span>
              <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid py-0 grid-cols-6 gap-4">
      {new Array(MAX_ITEMS_PER_PAGE).fill(0).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex flex-col border border-[#C5C5C5] rounded-2xl p-2 space-y-2"
        >
          <div className="flex flex-col">
            <span className="text-block-24">ID</span>
            <div className="mt-1 h-6 w-12 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
          </div>
          <div className="flex flex-col text-nowrap">
            <span className="text-block-24">Purchased Date</span>
            <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
