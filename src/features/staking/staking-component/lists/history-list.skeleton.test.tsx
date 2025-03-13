import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HistoryListSkeleton } from "./history-list.skeleton";
import { MAX_ITEMS_PER_PAGE } from "../../config";

describe("HistoryListSkeleton", () => {
  it("should render correctly with the right number of items", () => {
    render(<HistoryListSkeleton />);

    const skeletonItems = screen
      .getAllByRole("generic")
      .filter((item) =>
        item.className.includes("min-w-fit w-full flex flex-row")
      );
    expect(skeletonItems).toHaveLength(MAX_ITEMS_PER_PAGE);
  });

  it("should contain the correct column titles", () => {
    render(<HistoryListSkeleton />);

    expect(screen.getAllByText("Date")).toHaveLength(MAX_ITEMS_PER_PAGE);
    expect(screen.getAllByText("Hash")).toHaveLength(MAX_ITEMS_PER_PAGE);
    expect(screen.getAllByText("Node IDs")).toHaveLength(MAX_ITEMS_PER_PAGE);
    expect(screen.getAllByText("Amount of Nodes")).toHaveLength(
      MAX_ITEMS_PER_PAGE
    );
    expect(screen.getAllByText("Action")).toHaveLength(MAX_ITEMS_PER_PAGE);
  });

  it("should contain pulse animation elements for each item", () => {
    render(<HistoryListSkeleton />);

    const pulseElements = screen
      .getAllByRole("generic")
      .filter((item) => item.className.includes("animate-pulse"));

    expect(pulseElements).toHaveLength(MAX_ITEMS_PER_PAGE * 5);
  });
});
