import { useUser } from "@account-kit/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useNavigate } from "../../../contexts/use-navigate";
import { fireEvent, render } from "@testing-library/react";
import { OrderContainer } from "./order-container";
import {
  AMOUNT_FINAL_LABEL_ID,
  BACK_BUTTON_ID,
  BONUS_FINAL_LABEL_ID,
  ERROR_COMPONENT_ID,
  LOADING_COMPONENT_ID,
  ORDER_CONTAINER_ID,
  ORDER_REVIEW_BUTTON_ID,
  PHONE_FINAL_LABEL_ID,
} from "../config";
import { useSmartNodesMint } from "../../../hooks/use-smart-nodes-mint";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

vi.mock("../../contexts/use-navigate", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../hooks/use-smart-nodes-mint", () => ({
  useSmartNodesMint: vi.fn(),
}));

const mockNavigate = {
  back: vi.fn(),
  searchParams: new URLSearchParams({ amount: "3" }),
};

const mockMint = {
  mint: vi.fn(),
  error: "",
  loading: false,
};

describe("OrderContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="${ORDER_CONTAINER_ID}">
        <button id="${BACK_BUTTON_ID}"></button>
        <span id="${AMOUNT_FINAL_LABEL_ID}"></span>
        <span id="${BONUS_FINAL_LABEL_ID}"></span>
        <span id="${PHONE_FINAL_LABEL_ID}"></span>
        <input />
        <input />
        <button id="${ORDER_REVIEW_BUTTON_ID}"></button>
      </div>
      <div id="${ERROR_COMPONENT_ID}"></div>
      <div id="${LOADING_COMPONENT_ID}"></div>
    `;

    (useUser as Mock).mockReturnValue({ address: "0x123" });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useSmartNodesMint as Mock).mockReturnValue(mockMint);
  });

  it("should display the container if user is logged in, amount > 0", () => {
    render(<OrderContainer />);

    const container = document.getElementById(ORDER_CONTAINER_ID);
    expect(container?.style.display).toBe("block");
  });

  it("should hide the container if there is a hash in search params", () => {
    mockNavigate.searchParams.set("hash", "0x123");
    render(<OrderContainer />);

    const container = document.getElementById(ORDER_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });

  it("should handle back button click event", () => {
    render(<OrderContainer />);

    const backButton = document.getElementById(BACK_BUTTON_ID);
    fireEvent.click(backButton!);

    expect(mockNavigate.back).toHaveBeenCalled();
  });

  it("should update label values when amount is provided", () => {
    render(<OrderContainer />);

    const amountLabel = document.getElementById(AMOUNT_FINAL_LABEL_ID);
    const bonusLabel = document.getElementById(BONUS_FINAL_LABEL_ID);
    const phoneLabel = document.getElementById(PHONE_FINAL_LABEL_ID);

    expect(amountLabel?.innerText).toBe("3");
    expect(bonusLabel?.innerText).toBe("1");
    expect(phoneLabel?.innerText).toBe("Yes");
  });

  it("should handle input change for referral code and email", () => {
    render(<OrderContainer />);

    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      `#${ORDER_CONTAINER_ID} input`
    );
    expect(inputs.length).toBe(2);

    const [referralInput, emailInput] = inputs;

    fireEvent.input(referralInput, { target: { value: "ref123" } });
    fireEvent.input(emailInput, { target: { value: "email" } });

    expect(referralInput.value).toBe("ref123");
    expect(emailInput.value).toBe("email");
  });

  it("should handle review order button click", () => {
    render(<OrderContainer />);

    const reviewButton = document.getElementById(ORDER_REVIEW_BUTTON_ID);
    fireEvent.click(reviewButton!);

    expect(mockMint.mint).toHaveBeenCalled();
  });

  it("should display error text when there is an error", () => {
    (useSmartNodesMint as Mock).mockReturnValue({
      ...mockMint,
      error: "Error",
    });

    render(<OrderContainer />);

    const errorLabel = document.getElementById(ERROR_COMPONENT_ID);
    expect(errorLabel?.innerText).toBe("Error");
  });

  it("should show the loading container when loading is true", () => {
    (useSmartNodesMint as Mock).mockReturnValue({
      ...mockMint,
      loading: true,
    });

    render(<OrderContainer />);

    const loadingContainer = document.getElementById(LOADING_COMPONENT_ID);
    expect(loadingContainer?.style.display).toBe("block");
  });

  it("should hide the loading container when loading is false", () => {
    render(<OrderContainer />);

    const loadingContainer = document.getElementById(LOADING_COMPONENT_ID);
    expect(loadingContainer?.style.display).toBe("none");
  });
});
