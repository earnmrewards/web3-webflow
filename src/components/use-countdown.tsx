import { useUser } from "@account-kit/react";
import { useEffect, useState } from "react";

interface CountdownProps {
  stopTimer?: boolean;
}

export function useCountdown({ stopTimer }: CountdownProps) {
  const user = useUser();

  const [timeLeft, setTimeLeft] = useState(calculateCountdown());

  function calculateCountdown() {
    const now = new Date();

    // 00:00:00 GMT+0000
    const nextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0)
    );

    const diffInSeconds = Math.floor(
      (nextMonth.getTime() - now.getTime()) / 1000
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
  }

  useEffect(() => {
    if (!user || stopTimer) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, [user, stopTimer]);

  return { timeLeft };
}
