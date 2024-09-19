import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThreeWayContainer } from "./three-way-container";

const CONTAINER_COMPONENT_ID = "web3-smart-nodes-selection";
const SMART_NODES_VALUE_ID = "web3-smart-nodes-amount";
const EARN_PHONE_VALUE_ID = "web3-smart-nodes-phone-amount";
const BASE_VALUES = [1, 3, 6];

describe("ThreeWayContainer", () => {
  beforeEach(() => {
    const container = document.createElement("div");
    container.id = CONTAINER_COMPONENT_ID;

    const input = document.createElement("input");
    container.appendChild(input);

    BASE_VALUES.forEach(() => {
      const button = document.createElement("button");
      container.appendChild(button);
    });

    const smartNodesSpan = document.createElement("span");
    smartNodesSpan.id = SMART_NODES_VALUE_ID;
    container.appendChild(smartNodesSpan);

    const earnPhoneSpan = document.createElement("span");
    earnPhoneSpan.id = EARN_PHONE_VALUE_ID;
    container.appendChild(earnPhoneSpan);

    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should update the amount when the user click in a button", () => {
    render(<ThreeWayContainer />);

    const buttons = document.querySelectorAll("button");
    let index = 1;

    fireEvent.click(buttons[index]);

    const input = document.querySelector(
      `#${CONTAINER_COMPONENT_ID} input`
    ) as HTMLInputElement;
    expect(input).not.toBeNull();

    expect(input.value).toBe(String(BASE_VALUES[index]));

    index = 2;
    fireEvent.click(buttons[index]);
    expect(input.value).toBe(String(BASE_VALUES[index]));
  });

  it("should update the amount based on user input action", () => {
    const input = document.querySelector(
      `#${CONTAINER_COMPONENT_ID} input`
    ) as HTMLInputElement;
    expect(input).not.toBeNull();

    fireEvent.input(input, { target: { value: "4" } });
    expect(input.value).toBe("4");
  });

  it("should be visible the smart nodes and earn phone label based on amount", () => {
    render(<ThreeWayContainer />);

    const smartNodesLabel = document.getElementById(
      SMART_NODES_VALUE_ID
    ) as HTMLSpanElement;
    expect(smartNodesLabel).not.toBeNull();
    expect(smartNodesLabel.style.display).toBe("none");

    const earnPhoneLabel = document.getElementById(
      EARN_PHONE_VALUE_ID
    ) as HTMLSpanElement;
    expect(earnPhoneLabel).not.toBeNull();
    expect(smartNodesLabel.style.display).toBe("none");

    const buttons = document.querySelectorAll("button");
    expect(buttons.length).not.toBe(0);

    fireEvent.click(buttons[1]);
    expect(smartNodesLabel.style.display).toBe("block");
    expect(earnPhoneLabel.style.display).toBe("none");

    fireEvent.click(buttons[2]);
    expect(smartNodesLabel.style.display).toBe("block");
    expect(earnPhoneLabel.style.display).toBe("block");
  });
});
