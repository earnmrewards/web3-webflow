import SmartNodeImage from "@/assets/images/smart-node.png";

export function StakingTableGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 max-h-[540px] overflow-y-auto">
      {new Array(6).fill(0).map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-2 border border-[#C5C5C5] rounded-lg"
        >
          <div className="flex flex-col">
            <span className="text-block-24">ID</span>
            <div className="mt-1 h-6 w-12 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
          </div>
          <img src={SmartNodeImage} alt="Smart Node" />
        </div>
      ))}
    </div>
  );
}
