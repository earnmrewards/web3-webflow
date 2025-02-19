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
import { useUser } from "@account-kit/react";
import { StakingEmptyTable } from "./staking-empty-table";
import { StakingNodesSelector } from "./staking-nodes-selector";

export function StakingComponent() {
  const user = useUser();

  const [component, setComponent] = useState<HTMLElement | null>(null);
  const [stakeOption, setStakeOption] = useState<StakeOption>("available");
  const [viewType, setViewType] = useState<ViewType>("list");
  const [page, setPage] = useState(1);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);

  useEffect(() => {
    const component = document.getElementById(
      STAKING_COMPONENT_ID
    ) as HTMLElement;
    if (!component) return;

    setComponent(component);
  }, []);

  useEffect(() => {
    const component = document.getElementById(STAKING_COMPONENT_ID);
    if (!component) return;

    component.style.display = user ? "block" : "none";
  }, [user]);

  if (!component) return null;

  return createPortal(
    <>
      <StakingSelector
        stakeOption={stakeOption}
        setStakeOption={setStakeOption}
        setPage={setPage}
        setSelectionMode={setSelectionMode}
        setSelectedNodes={setSelectedNodes}
      />

      <StakingViewSelector
        viewType={viewType}
        setViewType={setViewType}
        selectionMode={selectionMode}
      />
      <StakingNodesSelector
        stakeOption={stakeOption}
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        selectedNodes={selectedNodes}
        setSelectedNodes={setSelectedNodes}
      />

      {viewType === "list" ? (
        <StakingTableList
          page={page}
          stakeOption={stakeOption}
          viewType={viewType}
          setViewType={setViewType}
          selectionMode={selectionMode}
          selectedNodes={selectedNodes}
          setSelectedNodes={setSelectedNodes}
        />
      ) : (
        <StakingTableGrid
          page={page}
          stakeOption={stakeOption}
          selectedNodes={selectedNodes}
          setSelectedNodes={setSelectedNodes}
          selectionMode={selectionMode}
        />
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
        setSelectedNodes={setSelectedNodes}
      />

      <StakingEmptyTable stakeOption={stakeOption} />
    </>,
    component
  );
}
