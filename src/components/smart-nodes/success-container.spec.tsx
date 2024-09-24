import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import {
  HASH_LABEL_ID,
  SUCCESS_CONTAINER_ID,
  USER_REFERRAL_LABEL_ID,
} from "./config";
import { useUser } from "@account-kit/react";
import { useNavigate } from "../../contexts/use-navigate";
import { fireEvent, render } from "@testing-library/react";
import { SuccessContainer } from "./success-container";
import { shortenAddress } from "../../utils/shorten-address";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

vi.mock("../../contexts/use-navigate", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../utils/shorten-address", () => ({
  shortenAddress: vi.fn(),
}));

const mockNavigate = {
  navigate: vi.fn(),
  searchParams: new URLSearchParams({ hash: "0x123" }),
};

describe("SuccessContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="${SUCCESS_CONTAINER_ID}">
        <span id="${HASH_LABEL_ID}"></span>
        <span id="${USER_REFERRAL_LABEL_ID}"></span>
        <button></button>
        <button></button>
        <button></button>
      </div>
    `;

    (useUser as Mock).mockReturnValue({ address: "0x123" });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (shortenAddress as Mock).mockImplementation((address) => address);
  });

  it("should display the success container if user and hash exist", () => {
    render(<SuccessContainer />);

    const container = document.getElementById(SUCCESS_CONTAINER_ID);
    expect(container?.style.display).toBe("block");
  });

  it("should hide the success container if there is no hash", () => {
    mockNavigate.searchParams.delete("hash");
    render(<SuccessContainer />);

    const container = document.getElementById(SUCCESS_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });

  it("should update the hash label and referral label", () => {
    mockNavigate.searchParams.set("hash", "0x123");
    render(<SuccessContainer />);

    const hashLabel = document.getElementById(HASH_LABEL_ID);
    const referralLabel = document.getElementById(USER_REFERRAL_LABEL_ID);

    expect(hashLabel?.innerText).toBe("0x123");
    expect(referralLabel?.innerText).toBe("Coming Soon");
  });

  it("should trigger share button event and open X share intent", () => {
    window.open = vi.fn();
    render(<SuccessContainer />);

    const shareButton = document.querySelectorAll(
      `#${SUCCESS_CONTAINER_ID} button`
    )[0];
    expect(shareButton).toBeDefined();
    fireEvent.click(shareButton);

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining("https://x.com/intent/tweet"),
      "_blank"
    );
  });

  it("should trigger buy more button event and navigate", () => {
    render(<SuccessContainer />);

    const buyMoreButton = document.querySelectorAll(
      `#${SUCCESS_CONTAINER_ID} button`
    )[1];
    expect(buyMoreButton).toBeDefined();
    fireEvent.click(buyMoreButton);

    expect(mockNavigate.navigate).toHaveBeenCalledWith({
      query: new URLSearchParams(),
    });
  });

  it("should trigger OpenSea button event and open OpenSea URL", () => {
    window.open = vi.fn();
    render(<SuccessContainer />);

    const openSeaButton = document.querySelectorAll(
      `#${SUCCESS_CONTAINER_ID} button`
    )[2];
    expect(openSeaButton).toBeDefined();
    fireEvent.click(openSeaButton);

    expect(window.open).toHaveBeenCalledWith(
      "https://opensea.io/collection/smart-nodes",
      "_blank"
    );
  });
});
