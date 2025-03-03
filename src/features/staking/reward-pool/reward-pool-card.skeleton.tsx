import { useMemo } from "react";
import { months } from "../config";

interface RewardPoolCardSkeletonProps {
  index: number;
  nullable: boolean;
}

export function RewardPoolCardSkeleton({
  index,
  nullable = false,
}: RewardPoolCardSkeletonProps) {
  const month = useMemo(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth() - 1;

    const monthIndex = (currentMonthIndex + index) % months.length;

    return months[monthIndex];
  }, [index]);

  const year = useMemo(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth() - 1;
    const currentYear = currentDate.getFullYear();

    const yearOffset = Math.floor((currentMonthIndex + index) / months.length);
    const displayYear = currentYear + yearOffset;

    return displayYear;
  }, [index]);

  return (
    <div
      id="w-node-_7268edfa-b76d-877e-7adb-9b6dd10ae2ca-71367837"
      className="div-block-266"
    >
      <div className="text-block-24">
        {month} {year}
      </div>
      {nullable ? (
        <a className="text-block-25">---</a>
      ) : (
        <div className="mt-2 h-4 w-24 bg-[#C5C5C5]/20 animate-pulse rounded-full"></div>
      )}
    </div>
  );
}
