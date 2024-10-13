import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { LOG_IN_CONTAINER_ID } from "../config";
import { render } from "@testing-library/react";
import { LogInContainer } from "./log-in-container";
import { useUser } from "@account-kit/react";
import { useStore } from "@/contexts/use-store";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

vi.mock("@/contexts/use-store", () => ({
  useStore: vi.fn(),
}));

const mockUser = { address: "0x123" };
const mockStore = {
  get: vi.fn(),
};

describe("LogInContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="${LOG_IN_CONTAINER_ID}" />
    `;

    (useUser as Mock).mockReturnValue(null);
    (useStore as Mock).mockReturnValue(mockStore);
  });

  it("should show the container when there is a stored email and no user", () => {
    mockStore.get.mockReturnValue("test@test.test");

    render(<LogInContainer />);

    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    expect(container?.style.display).toBe("block");
  });

  it("should hide the container when the user is logged in", () => {
    (useUser as Mock).mockReturnValue(mockUser);
    mockStore.get.mockReturnValue("test@test.test");

    render(<LogInContainer />);

    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });

  it("should hide the container when there is no stored email", () => {
    mockStore.get.mockReturnValue(null);

    render(<LogInContainer />);

    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });

  it("should hide the container when both user and stored email are missing", () => {
    (useUser as Mock).mockReturnValue(null);
    mockStore.get.mockReturnValue(null);

    render(<LogInContainer />);

    const container = document.getElementById(LOG_IN_CONTAINER_ID);
    expect(container?.style.display).toBe("none");
  });
});
