import { describe, expect, it } from "vitest";
import { isNumber } from ".";

describe("isDefined", () => {
  it("should be defined", () => {
    expect(isNumber).toBeDefined();
  });

  it("should support values", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(true);
    expect(isNumber("1")).toBe(false);
  });
});
