import { describe, expect, it, Mock, vi } from "vitest";
import { SuccessContainer } from "./success-container";
import { render } from "@testing-library/react";
import { useStore } from "../../contexts/use-store";

const COMPONENT_ID = "web3-success-container";

vi.mock("../../contexts/use-store", () => ({
  useStore: vi.fn(),
}));

describe("SuccessContainer", () => {
  it("should shows the success container when the hash is present", () => {
    (useStore as Mock).mockReturnValue({
      getTransactionHash: () => "0x1234567890abcdef",
    });

    const container = document.createElement("div");
    container.id = COMPONENT_ID;
    document.body.appendChild(container);

    render(<SuccessContainer />);

    expect(container.style.display).toBe("block");

    document.body.removeChild(container);
  });

  it("should hides the success container when the hash is not present", () => {
    (useStore as Mock).mockReturnValue({
      getTransactionHash: () => null,
    });

    const container = document.createElement("div");
    container.id = COMPONENT_ID;
    document.body.appendChild(container);

    render(<SuccessContainer />);

    expect(container.style.display).toBe("none");

    document.body.removeChild(container);
  });
});
