import { useUser } from "@account-kit/react";
import { useCallback, useEffect, useState } from "react";

export function useCountdown(finalTime: string) {
  const user = useUser();

  const calculateCountdown = useCallback(() => {
    if (finalTime.length === 0) return "";

    const now = new Date();

    const finalDate = new Date(finalTime);

    const diffInSeconds = Math.floor(
      (finalDate.getTime() - now.getTime()) / 1000
    );

    const days = Math.floor(diffInSeconds / (60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (diffInSeconds % 60).toString().padStart(2, "0");

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, [finalTime]);

  const [timeLeft, setTimeLeft] = useState(calculateCountdown());

  useEffect(() => {
    if (!user) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, [user, calculateCountdown]);

  return { timeLeft };
}
