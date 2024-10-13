import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { SOLD_OUT_CONTAINER_ID } from "./config";
import { getPartnerData } from "@/actions/get-partner-data";
import { render, waitFor } from "@testing-library/react";
import { SoldOutContainer } from "./sold-out-container";

vi.mock("@/actions/get-partner-data", () => ({
  getPartnerData: vi.fn(),
}));

const mockPartnerId = "partner-test";

describe("SoldOutContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, "location", {
      value: { pathname: `/${mockPartnerId}` },
      writable: true,
    });

    document.body.innerHTML = `
      <div id="${SOLD_OUT_CONTAINER_ID}" style="display: none"></div>
    `;
  });

  it("should fetch partner data and show the container when sold out", async () => {
    (getPartnerData as Mock).mockResolvedValueOnce({ remainingAmount: 0 });

    render(<SoldOutContainer />);

    await waitFor(() => {
      const container = document.getElementById(SOLD_OUT_CONTAINER_ID);
      expect(container?.style.display).toBe("block");
    });

    expect(getPartnerData).toHaveBeenCalledWith(mockPartnerId);
  });

  it("should fetch partner data and hide the container when there are available SN", async () => {
    (getPartnerData as Mock).mockResolvedValueOnce({ remainingAmount: 10 });

    render(<SoldOutContainer />);

    await waitFor(() => {
      const container = document.getElementById(SOLD_OUT_CONTAINER_ID);
      expect(container?.style.display).toBe("none");
    });

    expect(getPartnerData).toHaveBeenCalledWith(mockPartnerId);
  });

  it("should not call getPartnerData if the partner ID is missing", async () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/" },
      writable: true,
    });

    render(<SoldOutContainer />);

    expect(getPartnerData).not.toHaveBeenCalled();
  });
});
