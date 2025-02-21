import SmartNodeImage from "@/assets/images/smart-node.png";
import { MAX_ITEMS_PER_PAGE } from "../config";

export function StakingTableGridSkeleton() {
  return (
    <div className="grid py-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[490px] overflow-y-auto">
      {new Array(MAX_ITEMS_PER_PAGE).fill(0).map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-2 border border-[#C5C5C5] rounded-lg"
        >
          <div className="flex flex-col">
            <span className="text-block-24">ID</span>
            <div className="mt-1 mb-2 h-5 w-12 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
          </div>
          <img src={SmartNodeImage} alt="Smart Node" />
        </div>
      ))}
    </div>
  );
}
