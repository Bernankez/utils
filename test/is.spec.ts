import { describe, expect, it } from "vitest";
import { isIDNumber } from "../src";

describe("isIDNumber", () => {
  it("with ending 'X'", () => {
    expect(isIDNumber("11010119900307766X")).toBe(true);
  });

  it("18 digits", () => {
    expect(isIDNumber("110101199003076472")).toBe(true);
  });

  it("15 digits", () => {
    expect(isIDNumber("110101900307766")).toBe(true);
  });

  it("invalid check code", () => {
    expect(isIDNumber("110101199003077660")).toBe(false);
  });
});
