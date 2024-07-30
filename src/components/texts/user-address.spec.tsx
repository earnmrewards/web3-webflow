import { useUser } from "@account-kit/react";
import { describe, expect, it, Mock, vi } from "vitest";
import { UserAddress } from "./user-address";
import { render } from "@testing-library/react";

vi.mock("@account-kit/react", () => ({
  useUser: vi.fn(),
}));

const COMPONENT_ID = "web3-user-address";

describe("UserAddress", () => {
  it(`should display "Not Connected" when no user is present`, () => {
    (useUser as Mock).mockReturnValue(null);

    render(
      <>
        <UserAddress />
        <span id={COMPONENT_ID}></span>
      </>
    );

    const textField = document.getElementById(COMPONENT_ID);
    expect(textField).toHaveTextContent("Not Connected");
  });

  it("should display shortened address when user is present", () => {
    (useUser as Mock).mockReturnValue({ address: "0x1234567890abcdef" });

    render(
      <>
        <UserAddress />
        <span id={COMPONENT_ID}></span>
      </>
    );

    const textField = document.getElementById(COMPONENT_ID);
    expect(textField).toHaveTextContent("0x123...bcdef");
  });

  it("should handle the absence of textField gracefully", () => {
    (useUser as Mock).mockReturnValue(null);

    render(<UserAddress />);

    const textField = document.getElementById(COMPONENT_ID);
    expect(textField).toBeNull();
  });
});
