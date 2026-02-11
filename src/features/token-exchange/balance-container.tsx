import { useEffect } from "react";
import {
  EARNM_V1_BALANCE_LABEL_ID,
  EARNM_V2_BALANCE_LABEL_ID,
  STMX_BALANCE_LABEL_ID,
} from "./config";
import { useTokenBalance } from "@/hooks/use-token-balance";

type TokenDataType = [number | undefined, string, boolean][];

export function BalanceContainer() {
  const { data: earnmBalance, isFetching: isEarnmFetching } =
    useTokenBalance("earnm");
  const { data: earnmv2Balance, isFetching: isEarnmv2Fetching } =
    useTokenBalance("earnmv2");
  const { data: stormxBalance, isFetching: isStormxFetching } =
    useTokenBalance("stormx");

  useEffect(() => {
    const tokens: TokenDataType = [
      [earnmBalance, EARNM_V1_BALANCE_LABEL_ID, isEarnmFetching],
      [earnmv2Balance, EARNM_V2_BALANCE_LABEL_ID, isEarnmv2Fetching],
      [stormxBalance, STMX_BALANCE_LABEL_ID, isStormxFetching],
    ];

    tokens.forEach(([balance, id, fetching]) => {
      const label = document.getElementById(id);
      if (!label) return;

      if (fetching) {
        label.innerText = "...";
        return;
      }

      if (!balance) {
        label.innerText = "---";
        return;
      }

      label.innerText = String(
        balance.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? 0
      );
    });
  }, [
    earnmBalance,
    earnmv2Balance,
    stormxBalance,
    isEarnmFetching,
    isEarnmv2Fetching,
    isStormxFetching,
  ]);

  return null;
}
