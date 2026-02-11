import { MAX_ITEMS_PER_PAGE } from "../../config";

export function HistoryListSkeleton() {
  return (
    <ul
      data-testid="history-list-skeleton"
      className="mt-3 pr-2 grid py-0 grid-cols-1 gap-4 max-h-[490px] overflow-y-auto custom-scrollbar"
    >
      {new Array(MAX_ITEMS_PER_PAGE).fill(0).map((_, index) => (
        <li
          key={`skeleton-${index}`}
          className="min-w-fit w-full flex flex-row justify-between gap-4 border border-[#C5C5C5] rounded-2xl p-5 overflow-x-auto custom-thin-scrollbar"
        >
          <div className="flex flex-col">
            <span className="text-block-24">Date</span>
            <div className="mt-1 h-6 w-12 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
          </div>
          <div className="flex flex-col text-nowrap">
            <span className="text-block-24">Hash</span>
            <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-block-24">Node IDs</span>
            <div className="flex items-center gap-1">
              <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-block-24">Amount of Nodes</span>
            <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-block-24">Action</span>
            <div className="mt-1 h-6 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}
