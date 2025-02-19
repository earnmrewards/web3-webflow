import { GridIcon } from "@/assets/icons/grid";
import { ListIcon } from "@/assets/icons/list";
import { ViewType } from "./types";
import { Dispatch, useEffect, useState } from "react";
import { SetStateAction } from "react";
import { STAKING_VIEW_SELECTOR_ID } from "../config";
import { createPortal } from "react-dom";

interface StakingViewSelectorProps {
  viewType: ViewType;
  setViewType: Dispatch<SetStateAction<ViewType>>;
  selectionMode: boolean;
}

export function StakingViewSelector({
  viewType,
  setViewType,
  selectionMode,
}: StakingViewSelectorProps) {
  const [viewSelectorComponent, setViewSelectorComponent] =
    useState<HTMLElement | null>(null);

  function handleViewTypeChange(type: ViewType) {
    setViewType(type);
  }

  useEffect(() => {
    const component = document.getElementById(STAKING_VIEW_SELECTOR_ID);
    if (!component) return;

    setViewSelectorComponent(component as HTMLElement);
  }, []);

  if (!viewSelectorComponent) return null;

  return createPortal(
    <div
      className={`h-12 w-full flex items-center justify-end gap-2 ${
        selectionMode ? "hidden" : ""
      }`}
    >
      <ListIcon
        className="w-5 h-5 cursor-pointer"
        color={viewType === "list" ? "#02D632" : "white"}
        onClick={() => handleViewTypeChange("list")}
      />
      <GridIcon
        className="w-5 h-5 cursor-pointer"
        color={viewType === "grid" ? "#02D632" : "white"}
        onClick={() => handleViewTypeChange("grid")}
      />
    </div>,
    viewSelectorComponent
  );
}
