import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StakedListSkeleton } from "./staked-list.skeleton";
import { MAX_ITEMS_PER_PAGE } from "../../config";

describe("StakedListSkeleton", () => {
  it("should render correctly with the right number of items", () => {
    render(<StakedListSkeleton />);

    const skeletonItems = screen
      .getAllByRole("generic")
      .filter((item) =>
        item.className.includes("grid grid-cols-2 md:grid-cols-4")
      );
    expect(skeletonItems).toHaveLength(MAX_ITEMS_PER_PAGE);
  });

  it("should contain the correct column titles", () => {
    render(<StakedListSkeleton />);

    expect(screen.getAllByText("SmartNode ID")).toHaveLength(
      MAX_ITEMS_PER_PAGE
    );
    expect(screen.getAllByText("Staked on")).toHaveLength(MAX_ITEMS_PER_PAGE);
    expect(screen.getAllByText("Withdrawable Now")).toHaveLength(
      MAX_ITEMS_PER_PAGE
    );
    expect(screen.getAllByText("More Rewards In")).toHaveLength(
      MAX_ITEMS_PER_PAGE
    );
  });

  it("should contain pulse animation elements for each item", () => {
    render(<StakedListSkeleton />);

    const pulseElements = screen
      .getAllByRole("generic")
      .filter((item) => item.className.includes("animate-pulse"));

    expect(pulseElements).toHaveLength(MAX_ITEMS_PER_PAGE * 4);
  });
});
