import { EarnM } from "@/assets/icons/earnm";
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
      <div className="mt-3 pr-2 grid py-0 grid-cols-1 gap-4 max-h-[490px] overflow-y-auto custom-scrollbar">
        {new Array(MAX_ITEMS_PER_PAGE).fill(0).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="grid grid-cols-2 md:grid-cols-4 border border-[#C5C5C5] rounded-2xl p-5"
          >
            <div className="flex flex-col">
              <span className="text-block-24">SmartNode ID</span>
              <div className="mt-1 h-6 w-12 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
            </div>
            <div className="flex flex-col text-nowrap">
              <span className="text-block-24">Staked on</span>
              <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-block-24">Withdrawable Now</span>
              <div className="flex items-center gap-1">
                <EarnM />
                <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-block-24">More Rewards In</span>
              <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 grid py-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {new Array(MAX_ITEMS_PER_PAGE).fill(0).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex flex-col border border-[#C5C5C5] rounded-2xl p-2 space-y-2"
        >
          <div className="flex flex-col">
            <span className="text-block-24">SmartNode ID</span>
            <div className="mt-1 h-6 w-12 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
          </div>
          <div className="flex flex-col text-nowrap">
            <span className="text-block-24">Received Date</span>
            <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
