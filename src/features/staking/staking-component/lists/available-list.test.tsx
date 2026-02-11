import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AvailableList } from "./available-list";
import { useHeldNodes } from "@/hooks/staking/use-held-nodes";

vi.mock("@/hooks/staking/use-held-nodes");

const mockNodes = {
  nodes: [
    { tokenId: 1, receivedAt: "2024-01-01" },
    { tokenId: 2, receivedAt: "2024-01-02" },
  ],
};

describe("AvailableList", () => {
  beforeEach(() => {
    vi.mocked(useHeldNodes).mockReturnValue({
      data: mockNodes,
    } as any);
  });

  it("should render list of nodes correctly", () => {
    render(
      <AvailableList
        page={1}
        selectionMode={false}
        selectedNodes={[]}
        setSelectedNodes={() => {}}
      />
    );

    expect(screen.getAllByText("SmartNode ID")).toHaveLength(2);
    expect(screen.getAllByText("Received Date")).toHaveLength(2);

    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("should handle node selection when in selection mode", () => {
    const setSelectedNodes = vi.fn();

    render(
      <AvailableList
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
      <AvailableList
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
      <AvailableList
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
      <AvailableList
        page={1}
        selectionMode={false}
        selectedNodes={[]}
        setSelectedNodes={() => {}}
      />
    );

    expect(screen.queryByRole("checkbox")).toBeNull();

    rerender(
      <AvailableList
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
});
