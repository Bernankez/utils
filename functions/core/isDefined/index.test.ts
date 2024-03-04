import { describe, expect, it } from "vitest";
import { isDefined } from ".";

describe("isDefined", () => {
  it("should be defined", () => {
    expect(isDefined).toBeDefined();
  });

  it("should support values", () => {
    const definedValue = "test";
    const undefinedValue = undefined;
    const nullValue = null;
    expect(isDefined(definedValue)).toBe(true);
    expect(isDefined(undefinedValue)).toBe(false);
    expect(isDefined(nullValue)).toBe(false);
  });
});
