import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { LOG_IN_CONTAINER_ID } from "../config";
import { render } from "@testing-library/react";
import { LogInContainer } from "./log-in-container";
import { useUser } from "@account-kit/react";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

describe("LogInContainer", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="${LOG_IN_CONTAINER_ID}" />
    `;
  });

  it("should be visible when user is not present", () => {
    render(<LogInContainer />);

    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    expect(container?.style.display).toBe("block");
  });

  it("should be hidden when user is present", () => {
    (useUser as Mock).mockReturnValue({ address: "0x123" });
    render(<LogInContainer />);

    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });
});
