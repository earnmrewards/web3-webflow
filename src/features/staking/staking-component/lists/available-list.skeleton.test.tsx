import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvailableListSkeleton } from "./available-list.skeleton";
import { MAX_ITEMS_PER_PAGE } from "../../config";

describe("AvailableListSkeleton", () => {
  it("should render correctly with the right number of items", () => {
    render(<AvailableListSkeleton />);

    const skeletonItems = screen
      .getAllByRole("generic")
      .filter((item) =>
        item.className.includes("flex flex-col border border-[#C5C5C5]")
      );
    expect(skeletonItems).toHaveLength(MAX_ITEMS_PER_PAGE);
  });

  it("should contain the correct column titles", () => {
    render(<AvailableListSkeleton />);

    expect(screen.getAllByText("SmartNode ID")).toHaveLength(
      MAX_ITEMS_PER_PAGE
    );
    expect(screen.getAllByText("Received Date")).toHaveLength(
      MAX_ITEMS_PER_PAGE
    );
  });

  it("should contain pulse animation elements for each item", () => {
    render(<AvailableListSkeleton />);

    const pulseElements = screen
      .getAllByRole("generic")
      .filter((item) => item.className.includes("animate-pulse"));

    expect(pulseElements).toHaveLength(MAX_ITEMS_PER_PAGE * 2);
  });
});
