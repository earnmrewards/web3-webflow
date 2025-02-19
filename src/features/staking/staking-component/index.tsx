import { useEffect, useState } from "react";
import { STAKING_COMPONENT_ID } from "../config";
import { createPortal } from "react-dom";

import { StakingSelector } from "./staking-selector";
import { StakeOption, ViewType } from "./types";
import { StakingTableList } from "./staking-table-list";
import { StakingPagination } from "./staking-pagination";
import { StakingTableGrid } from "./staking-table-grid";
import { StakingViewSelector } from "./staking-view-selector";
import { StakingTrigger } from "./staking-trigger";

export function StakingComponent() {
  const [component, setComponent] = useState<HTMLElement | null>(null);
  const [stakeOption, setStakeOption] = useState<StakeOption>("available");
  const [viewType, setViewType] = useState<ViewType>("list");
  const [page, setPage] = useState(1);
  const [selectionMode, setSelectionMode] = useState(false);

  useEffect(() => {
    const component = document.getElementById(
      STAKING_COMPONENT_ID
    ) as HTMLElement;
    if (!component) return;

    setComponent(component);
  }, []);

  if (!component) return null;

  return createPortal(
    <>
      <StakingSelector
        stakeOption={stakeOption}
        setStakeOption={setStakeOption}
        setPage={setPage}
        setSelectionMode={setSelectionMode}
      />

      <StakingViewSelector viewType={viewType} setViewType={setViewType} />

      {viewType === "list" ? (
        <StakingTableList
          page={page}
          stakeOption={stakeOption}
          viewType={viewType}
          setViewType={setViewType}
        />
      ) : (
        <StakingTableGrid page={page} stakeOption={stakeOption} />
      )}

      <StakingPagination
        stakeOption={stakeOption}
        page={page}
        setPage={setPage}
      />

      <StakingTrigger
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        stakeOption={stakeOption}
      />
    </>,
    component
  );
}
