import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HistoryList } from "./history-list";
import { useHistory } from "@/hooks/staking/use-history";
import { useModal } from "@/contexts/use-modal";

vi.mock("@/hooks/staking/use-history");
vi.mock("@/contexts/use-modal");

const mockHistory = {
  history: [
    {
      actionTimestamp: 1704067200, // 2024-01-01
      hash: "0x123...abc",
      actionType: "stake",
      smartNodeIds: [1],
      claimedAmountEther: 0,
    },
    {
      actionTimestamp: 1704153600, // 2024-01-02
      hash: "0x456...def",
      actionType: "claim",
      smartNodeIds: [2, 3],
      claimedAmountEther: 100,
    },
  ],
};

const mockSetIsOpen = vi.fn();
const mockSetSelectedHash = vi.fn();

describe("HistoryList", () => {
  beforeEach(() => {
    vi.mocked(useHistory).mockReturnValue({
      data: mockHistory,
    } as any);

    vi.mocked(useModal).mockReturnValue({
      setIsOpen: mockSetIsOpen,
      setSelectedHash: mockSetSelectedHash,
    } as any);
  });

  it("should render history list correctly", () => {
    render(<HistoryList page={1} />);

    expect(screen.getAllByText("Date")).toHaveLength(2);
    expect(screen.getAllByText("Hash")).toHaveLength(2);
    expect(screen.getAllByText("Node IDs")).toHaveLength(2);
    expect(screen.getAllByText("Amount of Nodes")).toHaveLength(2);
    expect(screen.getAllByText("Action")).toHaveLength(2);
  });

  it("should display correct action types", () => {
    render(<HistoryList page={1} />);

    expect(screen.getByText("Staked")).toBeDefined();
    expect(screen.getByText("Claimed")).toBeDefined();
  });

  it("should show single node ID when only one node", () => {
    render(<HistoryList page={1} />);

    const nodeIds = screen.getAllByText("1");
    expect(nodeIds[0]).toBeDefined();
  });

  it("should show 'View List' when multiple nodes", () => {
    render(<HistoryList page={1} />);

    expect(screen.getByText("View List")).toBeDefined();
  });

  it("should open modal when clicking 'View List'", () => {
    render(<HistoryList page={1} />);

    const viewListButton = screen.getByText("View List");
    fireEvent.click(viewListButton);

    expect(mockSetSelectedHash).toHaveBeenCalledWith("0x456...def");
    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it("should show claimed amount for claim actions", () => {
    render(<HistoryList page={1} />);

    expect(screen.getByText("100")).toBeDefined();
  });

  it("should format dates correctly", () => {
    render(<HistoryList page={1} />);

    const date = new Date(1704067200 * 1000).toLocaleDateString();
    expect(screen.getByText(date)).toBeDefined();
  });
});
