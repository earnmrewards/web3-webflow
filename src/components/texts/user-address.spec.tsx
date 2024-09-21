import { useUser } from "@account-kit/react";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { UserAddress } from "./user-address";
import { render } from "@testing-library/react";
import { shortenAddress } from "../../utils/shorten-address";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

vi.mock("../../utils/shorten-address", () => ({
  shortenAddress: vi.fn((address: string) => `shorten-${address}`),
}));

const COMPONENT_ID = "web3-user-address";

describe("UserAddress", () => {
  beforeEach(() => {
    const textField = document.createElement("span");
    textField.id = COMPONENT_ID;
    document.body.appendChild(textField);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it(`should display "Not Connected" when no user is present`, () => {
    (useUser as Mock).mockReturnValue(null);

    render(<UserAddress />);

    const textField = document.getElementById(COMPONENT_ID);
    expect(textField?.innerText).toBe("Not Connected");
  });

  it("should display shortened address when user is present", () => {
    const mockUser = { address: "0x1234567890abcdef" };
    (useUser as Mock).mockReturnValue(mockUser);

    render(<UserAddress />);

    const textField = document.getElementById(COMPONENT_ID);
    expect(textField?.innerText).toBe(`shorten-${mockUser.address}`);
    expect(shortenAddress).toHaveBeenCalledWith(mockUser.address);
  });
});
