import { describe, expect, it, vi } from "vitest";
import { blockNativeSubmitEvent } from "./block-native-submit-event";

describe("blockNativeSubmitEvent", () => {
  it("should call preventDefault when Enter key is pressed", () => {
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    event.preventDefault = vi.fn();

    blockNativeSubmitEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("should not call preventDefault when another key is pressed", () => {
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    event.preventDefault = vi.fn();

    blockNativeSubmitEvent(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
