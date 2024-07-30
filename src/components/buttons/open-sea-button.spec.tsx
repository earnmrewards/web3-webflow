import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OpenSeaButton } from "./open-sea-button";

const COMPONENT_ID = "web3-open-sea-button";
const openSeaUrl =
  "https://testnets.opensea.io/account?search%5Bcollections%5D%5B0%5D=";
const collection = "dropbox-1";

describe("OpenSeaButton", () => {
  it("should set the correct href on the anchor element", () => {
    const anchor = document.createElement("a");
    anchor.id = COMPONENT_ID;
    document.body.appendChild(anchor);

    render(<OpenSeaButton />);

    expect(anchor.href).toBe(`${openSeaUrl}${collection}`);

    document.body.removeChild(anchor);
  });

  it("should handle the absence of anchor element gracefully", () => {
    render(<OpenSeaButton />);
  });
});
