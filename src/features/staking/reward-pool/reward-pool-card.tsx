import { useCountdown } from "@/components/use-countdown";

interface RewardPoolCardProps {
  month: string;
  year: number;
  toBeFilledAt?: string;
  reward?: number;
  csv?: string;
}

export function RewardPoolCard({
  month,
  year,
  toBeFilledAt,
  reward,
  csv,
}: RewardPoolCardProps) {
  const { timeLeft } = useCountdown(toBeFilledAt || "");

  const shouldShowReward = !!reward;

  return (
    <div
      id="w-node-_7268edfa-b76d-877e-7adb-9b6dd10ae2ca-71367837"
      className="div-block-266"
    >
      <div className="text-block-24">
        {month} {year}
      </div>
      <a
        data-active={shouldShowReward}
        className="text-block-25 data-[active=true]:underline data-[active=false]:text-sm"
        href={shouldShowReward ? csv : undefined}
        target={shouldShowReward ? "_blank" : undefined}
      >
        {shouldShowReward ? reward : timeLeft}
      </a>
    </div>
  );
}
