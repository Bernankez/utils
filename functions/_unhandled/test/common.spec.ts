import { describe, expect, it } from "vitest";
import { hasOwn } from "..";

describe("common", () => {
  it("should be true", () => {
    const obj = { a: 1 };
    expect(hasOwn(obj, "a")).toBe(true);
  });

  it("should be false", () => {
    const obj = Object.create({ a: 1 });
    expect(hasOwn(obj, "a")).toBe(false);
  });
});
