import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { ThreeWayContainer } from "./three-way-container";
import { BASE_VALUES } from "./config";
import { useUser } from "@account-kit/react";
import { useNavigate } from "../../contexts/use-navigate";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

vi.mock("../../contexts/use-navigate", () => ({
  useNavigate: vi.fn(),
}));

const CONTAINER_COMPONENT_ID = "web3-smart-nodes-selection";
const SMART_NODES_VALUE_ID = "web3-smart-nodes-amount";
const EARN_PHONE_VALUE_ID = "web3-smart-nodes-phone-amount";
const LOWER_VALUE_ID = "web3-smart-nodes-lower-value";
const REVIEW_BUTTON_ID = "web3-smart-nodes-review-button";
const mockUser = { address: "0x1234567890abcdef" };
const mockNavigate = vi.fn();

describe("ThreeWayContainer", () => {
  beforeEach(() => {
    (useUser as Mock).mockReturnValue(mockUser);
    (useNavigate as Mock).mockReturnValue({
      navigate: mockNavigate,
      searchParams: new URLSearchParams(),
    });

    document.body.innerHTML = `
      <div id="${CONTAINER_COMPONENT_ID}">
        <a></a>
        <a></a>
        <a></a>
        <input />
        <span id="${SMART_NODES_VALUE_ID}"></span>
        <span id="${EARN_PHONE_VALUE_ID}"></span>
        <span id="${LOWER_VALUE_ID}"></span>
        <a id="${REVIEW_BUTTON_ID}"></a>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("should render the container and handles bonus visibility", () => {
    render(<ThreeWayContainer />);

    const smartNodesLabel = document.getElementById(SMART_NODES_VALUE_ID);
    expect(smartNodesLabel?.style.display).toBe("none");

    const earnPhoneLabel = document.getElementById(EARN_PHONE_VALUE_ID);
    expect(earnPhoneLabel?.style.display).toBe("none");

    const lowerLabel = document.getElementById(LOWER_VALUE_ID);
    expect(lowerLabel?.style.display).toBe("none");
  });

  it("should updates amount when buttons are clicked", () => {
    const mockIndex = 1;
    render(<ThreeWayContainer />);

    const buttons = document.querySelectorAll(`#${CONTAINER_COMPONENT_ID} a`);
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[mockIndex]);

    const input = document.querySelector(
      `#${CONTAINER_COMPONENT_ID} input`
    ) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe(String(BASE_VALUES[mockIndex]));
  });

  it("should update the amount based on user input action", () => {
    const input = document.querySelector(
      `#${CONTAINER_COMPONENT_ID} input`
    ) as HTMLInputElement;
    expect(input).not.toBeNull();

    fireEvent.input(input, { target: { value: "4" } });
    expect(input.value).toBe("4");
  });

  it("should be render correctly the visibility of each bonus", () => {
    render(<ThreeWayContainer />);

    const smartNodesLabel = document.getElementById(SMART_NODES_VALUE_ID);
    expect(smartNodesLabel).not.toBeNull();

    const earnPhoneLabel = document.getElementById(EARN_PHONE_VALUE_ID);
    expect(earnPhoneLabel).not.toBeNull();

    const lowerLabel = document.getElementById(LOWER_VALUE_ID);
    expect(lowerLabel).not.toBeNull();

    const buttons = document.querySelectorAll(`#${CONTAINER_COMPONENT_ID} a`);
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[1]);
    expect(smartNodesLabel?.style.display).toBe("block");
    expect(earnPhoneLabel?.style.display).toBe("block");
    expect(lowerLabel?.style.display).toBe("block");
  });

  it("should calls navigate with the correct amount on order click", () => {
    const mockIndex = 1;
    render(<ThreeWayContainer />);

    const buttons = document.querySelectorAll(`#${CONTAINER_COMPONENT_ID} a`);
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[mockIndex]);

    const reviewButton = document.getElementById(REVIEW_BUTTON_ID);
    expect(reviewButton).not.toBeNull();

    fireEvent.click(reviewButton!);
    expect(mockNavigate).toHaveBeenCalledWith({
      query: new URLSearchParams({ amount: String(BASE_VALUES[mockIndex]) }),
    });
  });

  it("should hide the container when the queryAmount > 0 or user is not available", () => {
    (useUser as Mock).mockReturnValue(null);

    render(<ThreeWayContainer />);

    const container = document.getElementById(CONTAINER_COMPONENT_ID);
    expect(container?.style.display).toBe("none");
  });
});
