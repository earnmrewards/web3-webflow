import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NodeListModal } from "./node-list-modal";
import { useHistory } from "@/hooks/staking/use-history";
import { useModal } from "@/contexts/use-modal";

vi.mock("@/hooks/staking/use-history");
vi.mock("@/contexts/use-modal");

const mockHistory = {
  history: [
    {
      actionHash: "0x123",
      smartNodeIds: [1, 2, 3],
    },
    {
      actionHash: "0x456",
      smartNodeIds: [4, 5],
    },
  ],
};

const mockSetIsOpen = vi.fn();

describe("NodeListModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";

    vi.mocked(useHistory).mockReturnValue({
      data: mockHistory,
    } as any);

    vi.mocked(useModal).mockReturnValue({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      selectedHash: "0x123",
      setSelectedHash: vi.fn(),
    } as any);
  });

  it("should render modal with correct title", () => {
    render(<NodeListModal page={1} />);
    expect(screen.getByText("Smart Nodes List")).toBeDefined();
  });

  it("should display list of node IDs for selected hash", () => {
    render(<NodeListModal page={1} />);

    expect(screen.getAllByText("ID")).toHaveLength(3);
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
  });

  it("should add stop-scrolling class to body when modal is open", () => {
    render(<NodeListModal page={1} />);
    expect(document.body.classList.contains("stop-scrolling")).toBe(true);
  });

  it("should remove stop-scrolling class when modal is closed", () => {
    vi.mocked(useModal).mockReturnValue({
      isOpen: false,
      setIsOpen: mockSetIsOpen,
      selectedHash: "0x123",
      setSelectedHash: vi.fn(),
    } as any);

    render(<NodeListModal page={1} />);
    expect(document.body.classList.contains("stop-scrolling")).toBe(false);
  });

  it("should close modal when clicking close button", () => {
    render(<NodeListModal page={1} />);

    const closeButton = screen.getByTestId("close-icon");
    fireEvent.click(closeButton);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("should close modal when clicking outside content", () => {
    render(<NodeListModal page={1} />);

    const modalBackground = screen.getByTestId("modal-background");
    fireEvent.click(modalBackground);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("should not close modal when clicking modal content", () => {
    render(<NodeListModal page={1} />);

    const modalContent = screen.getByText("Smart Nodes List").closest("div");
    fireEvent.click(modalContent!);

    expect(mockSetIsOpen).not.toHaveBeenCalled();
  });

  it("should render correct NFT collection URLs for each node", () => {
    render(<NodeListModal page={1} />);

    const nodeLinks = screen.getAllByRole("link");
    expect(nodeLinks).toHaveLength(3);

    nodeLinks.forEach((link, index) => {
      expect(link.getAttribute("href")).toBe(
        `https://testnets.opensea.io/assets/arbitrum_sepolia/0x17fae73f734d77cc1015b21d0e437a23932c05fa/${
          index + 1
        }`
      );
      expect(link.getAttribute("target")).toBe("_blank");
    });
  });

  it("should not render anything when no data is available", () => {
    vi.mocked(useHistory).mockReturnValue({
      data: null,
    } as any);

    render(<NodeListModal page={1} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("should not render anything when no selectedHash is provided", () => {
    vi.mocked(useModal).mockReturnValue({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      selectedHash: undefined,
      setSelectedHash: vi.fn(),
    } as any);

    render(<NodeListModal page={1} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
