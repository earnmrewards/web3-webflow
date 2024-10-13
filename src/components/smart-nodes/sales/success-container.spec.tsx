import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import {
  HASH_LABEL_ID,
  SUCCESS_CONTAINER_ID,
  USER_REFERRAL_LABEL_ID,
} from "../config";
import { useUser } from "@account-kit/react";
import { useNavigate } from "@/contexts/use-navigate";
import { shortenAddress } from "@/utils/shorten-address";
import { getEncryptedData } from "@/utils/get-encrypted-data";
import { getUserReferralCode } from "@/actions/get-user-referral-code";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { SuccessContainer } from "./success-container";
import { encryptData } from "@/utils/encrypt-data";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

vi.mock("@/contexts/use-navigate", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@/actions/get-user-referral-code", () => ({
  getUserReferralCode: vi.fn(() => Promise.resolve("ref123")),
}));

vi.mock("@/utils/shorten-address", () => ({
  shortenAddress: vi.fn(),
}));

vi.mock("@/utils/get-encrypted-data", () => ({
  getEncryptedData: vi.fn(),
}));

const mockNavigate = { navigate: vi.fn(), searchParams: new URLSearchParams() };
const mockUser = { address: "0x123" };
const mockOperationResult = { hash: "0x123", email: "someEmail" };

describe("SuccessContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="${SUCCESS_CONTAINER_ID}">
        <span id="${HASH_LABEL_ID}"></span>
        <span id="${USER_REFERRAL_LABEL_ID}"></span>
        <a></a>
        <a></a>
        <a></a>
      </div>
    `;

    (useUser as Mock).mockReturnValue(mockUser);
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (shortenAddress as Mock).mockImplementation((address) => address);
    (getEncryptedData as Mock).mockReturnValue({
      hash: "0x123",
      email: "someEmail",
    });

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(""),
      },
    });

    mockNavigate.searchParams.set(
      "operationResult",
      encryptData(mockOperationResult)
    );
  });

  it("should display the success container when user and operationResult exist", async () => {
    await act(async () => {
      render(<SuccessContainer />);
    });

    const container = document.getElementById(SUCCESS_CONTAINER_ID);
    expect(container?.style.display).toBe("block");
  });

  it("should hide the success container if operationResult is missing", async () => {
    mockNavigate.searchParams.delete("operationResult");

    await act(async () => {
      render(<SuccessContainer />);
    });

    const container = document.getElementById(SUCCESS_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });

  it("should fetch and display the referral code", async () => {
    await act(async () => {
      render(<SuccessContainer />);
    });

    const referralLabel = document.getElementById(USER_REFERRAL_LABEL_ID);

    await waitFor(() => {
      expect(referralLabel?.innerText).toBe("ref123");
    });

    const { hash, email } = mockOperationResult;
    expect(getUserReferralCode).toHaveBeenCalledWith(hash, email);
  });

  it("should copy the referral code to clipboard when clicked", async () => {
    const writeTextSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();

    await act(async () => {
      render(<SuccessContainer />);
    });

    const referralLabel = document.getElementById(USER_REFERRAL_LABEL_ID);
    expect(referralLabel).not.toBeNull();

    fireEvent.click(referralLabel!);

    await waitFor(() => {
      expect(writeTextSpy).toHaveBeenCalledWith("ref123");
    });
  });

  it("should open the correct transaction link when the hash is clicked", async () => {
    window.open = vi.fn();

    await act(async () => {
      render(<SuccessContainer />);
    });

    const hashLabel = document.getElementById(HASH_LABEL_ID);
    expect(hashLabel).not.toBeNull();

    fireEvent.click(hashLabel!);

    const { hash } = mockOperationResult;
    const expectedUrl = `https://sepolia.arbiscan.io/tx/${hash}`;
    expect(window.open).toHaveBeenCalledWith(expectedUrl, "_blank");
  });

  it("should trigger the share button event correctly", async () => {
    window.open = vi.fn();

    await act(async () => {
      render(<SuccessContainer />);
    });

    const buttons = document.querySelectorAll(`#${SUCCESS_CONTAINER_ID} a`);
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("https://x.com/intent/post"),
        "_blank"
      );
    });
  });

  it("should navigate correctly on 'Buy More' button click", async () => {
    await act(async () => {
      render(<SuccessContainer />);
    });

    const buttons = document.querySelectorAll(`#${SUCCESS_CONTAINER_ID} a`);
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[1]);

    expect(mockNavigate.navigate).toHaveBeenCalledWith({
      query: new URLSearchParams(),
    });
  });

  it("should open the OpenSea link on button click", async () => {
    window.open = vi.fn();

    await act(async () => {
      render(<SuccessContainer />);
    });

    const buttons = document.querySelectorAll(`#${SUCCESS_CONTAINER_ID} a`);
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[2]);

    expect(window.open).toHaveBeenCalledWith(
      "https://opensea.io/collection/earnm-smartnodes",
      "_blank"
    );
  });
});
