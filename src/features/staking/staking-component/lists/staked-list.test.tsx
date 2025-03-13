import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StakedList } from "./staked-list";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";

vi.mock("@/hooks/staking/use-staked-nodes");

const mockNodes = {
  nodes: [
    { tokenId: 1, stakedAt: "2024-01-01", reward: 100 },
    { tokenId: 2, stakedAt: "2024-01-02", reward: 200 },
  ],
};

describe("StakedList", () => {
  beforeEach(() => {
    vi.mocked(useStakedNodes).mockReturnValue({
      data: mockNodes,
    } as any);
  });

  it("should render list of staked nodes correctly", () => {
    render(
      <StakedList
        page={1}
        selectionMode={false}
        selectedNodes={[]}
        setSelectedNodes={() => {}}
      />
    );

    expect(screen.getAllByText("SmartNode ID")).toHaveLength(2);
    expect(screen.getAllByText("Staked on")).toHaveLength(2);
    expect(screen.getAllByText("Withdrawable Now")).toHaveLength(2);

    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("should handle node selection when in selection mode", () => {
    const setSelectedNodes = vi.fn();

    render(
      <StakedList
        page={1}
        selectionMode={true}
        selectedNodes={[]}
        setSelectedNodes={setSelectedNodes}
      />
    );

    const firstNode = screen.getByText("1").closest("div[data-mode]");
    fireEvent.click(firstNode!);

    expect(setSelectedNodes).toHaveBeenCalledWith([1]);
  });

  it("should handle node deselection when already selected", () => {
    const setSelectedNodes = vi.fn();

    render(
      <StakedList
        page={1}
        selectionMode={true}
        selectedNodes={[1]}
        setSelectedNodes={setSelectedNodes}
      />
    );

    const firstNode = screen.getByText("1").closest("div[data-mode]");
    fireEvent.click(firstNode!);

    expect(setSelectedNodes).toHaveBeenCalledWith([]);
  });

  it("should not allow selection when not in selection mode", () => {
    const setSelectedNodes = vi.fn();

    render(
      <StakedList
        page={1}
        selectionMode={false}
        selectedNodes={[]}
        setSelectedNodes={setSelectedNodes}
      />
    );

    const firstNode = screen.getByText("1").closest("div[data-mode]");
    fireEvent.click(firstNode!);

    expect(setSelectedNodes).not.toHaveBeenCalled();
  });

  it("should show checkbox only in selection mode", () => {
    const { rerender } = render(
      <StakedList
        page={1}
        selectionMode={false}
        selectedNodes={[]}
        setSelectedNodes={() => {}}
      />
    );

    expect(screen.queryByRole("checkbox")).toBeNull();

    rerender(
      <StakedList
        page={1}
        selectionMode={true}
        selectedNodes={[]}
        setSelectedNodes={() => {}}
      />
    );

    const checkboxContainers = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("rounded-md bg-[#C5C5C5]"));
    expect(checkboxContainers).toHaveLength(2);
  });

  it("should display rewards correctly", () => {
    render(
      <StakedList
        page={1}
        selectionMode={false}
        selectedNodes={[]}
        setSelectedNodes={() => {}}
      />
    );

    expect(screen.getByText("100")).toBeDefined();
    expect(screen.getByText("200")).toBeDefined();
  });

  it("should format dates correctly", () => {
    render(
      <StakedList
        page={1}
        selectionMode={false}
        selectedNodes={[]}
        setSelectedNodes={() => {}}
      />
    );

    const date = new Date("2024-01-01").toLocaleDateString();
    expect(screen.getByText(date)).toBeDefined();
  });
});
