import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { StakingTableList } from "./staking-table-list";
import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { useHistory } from "@/hooks/staking/use-history";
import "@testing-library/jest-dom";

import type { ViewType } from "../types";
import { render, screen } from "@testing-library/react";
import { STAKING_TABLE_COMPONENT_ID } from "../../config";

vi.mock("@/hooks/staking/use-held-nodes");
vi.mock("@/hooks/staking/use-staked-nodes");
vi.mock("@/hooks/staking/use-history");

describe("StakingTableList", () => {
  const defaultProps = {
    page: 1,
    stakeOption: "available" as const,
    viewType: "list" as ViewType,
    setViewType: vi.fn(),
    selectionMode: false,
    selectedNodes: [],
    setSelectedNodes: vi.fn(),
  };

  beforeEach(() => {
    const portalElement = document.createElement("div");
    portalElement.setAttribute("id", STAKING_TABLE_COMPONENT_ID);
    document.body.appendChild(portalElement);

    vi.mocked(useHeldNodes).mockReturnValue({
      data: undefined,
      loading: false,
    });
    vi.mocked(useStakedNodes).mockReturnValue({
      data: undefined,
      loading: false,
    });
    vi.mocked(useHistory).mockReturnValue({
      data: undefined,
      loading: false,
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render AvailableListSkeleton when loading held nodes", () => {
    vi.mocked(useHeldNodes).mockReturnValue({
      data: undefined,
      loading: true,
    });

    render(<StakingTableList {...defaultProps} stakeOption="available" />);

    expect(screen.getByTestId("available-list-skeleton")).toBeInTheDocument();
  });

  it("should render StakedListSkeleton when loading staked nodes", () => {
    vi.mocked(useStakedNodes).mockReturnValue({
      data: undefined,
      loading: true,
    });

    render(<StakingTableList {...defaultProps} stakeOption="staked" />);

    expect(screen.getByTestId("staked-list-skeleton")).toBeInTheDocument();
  });

  it("should render HistoryListSkeleton when loading history", () => {
    vi.mocked(useHistory).mockReturnValue({
      data: undefined,
      loading: true,
    });

    render(<StakingTableList {...defaultProps} stakeOption="history" />);

    expect(screen.getByTestId("history-list-skeleton")).toBeInTheDocument();
  });

  it("should render AvailableList when stakeOption is available and not loading", () => {
    render(<StakingTableList {...defaultProps} stakeOption="available" />);

    expect(screen.getByTestId("available-list")).toBeInTheDocument();
  });

  it("should render StakedList when stakeOption is staked and not loading", () => {
    render(<StakingTableList {...defaultProps} stakeOption="staked" />);

    expect(screen.getByTestId("staked-list")).toBeInTheDocument();
  });

  it("should render HistoryList when stakeOption is history and not loading", () => {
    render(<StakingTableList {...defaultProps} stakeOption="history" />);

    expect(screen.getByTestId("history-list")).toBeInTheDocument();
  });

  it("should return null when table component is not found", () => {
    document.body.innerHTML = "";

    const { container } = render(<StakingTableList {...defaultProps} />);

    expect(container.firstChild).toBeNull();
  });
});
