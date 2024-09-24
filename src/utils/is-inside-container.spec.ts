import { beforeEach, describe, expect, it } from "vitest";
import { isInsideContainer } from "./is-inside-container";

describe("isInsideContainer", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-container">
        <div id="element" />
      </div>
    `;
  });

  it("should be false when the container is not available", () => {
    const invalidContainerId = "invalid-id";

    expect(isInsideContainer(invalidContainerId, "element")).toBeFalsy();
  });

  it("should be false when the element is not inside the container", () => {
    const nonExistElementId = "non-exist-id";

    expect(isInsideContainer("test-container", nonExistElementId)).toBeFalsy();
  });

  it("should be true when the element is inside of the container", () => {
    expect(isInsideContainer("test-container", "element")).toBeTruthy();
  });
});
