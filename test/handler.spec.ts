import { describe, expect, it } from "vitest";
import { desensitization } from "../src";

const char = "1234567890abcdef";

describe("desensitization", () => {
  it("should desensitize from the third to the tenth place.", () => {
    expect(desensitization(char, [2, 10])).toBe("12********abcdef");
  });

  it("should desensitize from the begining to end ending", () => {
    expect(desensitization(char, [])).toBe("****************");
  });

  it("should desensitize from the third to the second to last place.", () => {
    expect(desensitization(char, [2, -2])).toBe("12************ef");
  });

  it("should return origin charactor", () => {
    expect(desensitization(char, {} as any)).toBe(char);
  });
});
