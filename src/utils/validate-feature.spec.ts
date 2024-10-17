import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { validateFeature } from "./validate-feature";

describe("validateFeature", () => {
  beforeEach(() => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  });

  afterEach(() => {
    const root = document.getElementById("root");
    if (root) {
      document.body.removeChild(root);
    }
  });

  it("should return false if the root element is not present", () => {
    document.body.removeChild(document.getElementById("root")!);

    expect(validateFeature("dashboard")).toBeFalsy();
  });

  it("should return false if the attribute feature is not present", () => {
    expect(validateFeature("dashboard")).toBeFalsy();
  });

  it('should return true if the feature matches the "feature" attribute', () => {
    const mockFeature = "dashboard";
    const root = document.getElementById("root");
    root!.setAttribute("feature", mockFeature);

    expect(validateFeature(mockFeature)).toBeTruthy();
  });

  it('should return false if the feature doest not matches the "feature" attribute', () => {
    const root = document.getElementById("root");
    root!.setAttribute("feature", "dashboard");

    expect(validateFeature("partner")).toBeFalsy();
  });

  it("should return true if the feature is part of a space-separated list of features", () => {
    const root = document.getElementById("root");
    root!.setAttribute("feature", "dashboard purchase flow");

    expect(validateFeature("dashboard")).toBeTruthy();
    expect(validateFeature("purchase")).toBeTruthy();
    expect(validateFeature("flow")).toBeTruthy();
  });

  it("should return false if the feature is not part of a space-separated list of features", () => {
    const root = document.getElementById("root");
    root!.setAttribute("feature", "dashboard purchase flow");

    expect(validateFeature("nodes")).toBeFalsy();
  });

  it("should trim spaces in the 'feature' attribute before checking", () => {
    const root = document.getElementById("root");
    root!.setAttribute("feature", "  dashboard purchase  ");

    expect(validateFeature("dashboard")).toBeTruthy();
    expect(validateFeature("purchase")).toBeTruthy();
    expect(validateFeature("flow")).toBeFalsy();
  });
});
