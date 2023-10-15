import { describe, expect, it } from "vitest";
import { masking } from "..";

const char = "1234567890abcdef";

describe("desensitization", () => {
  it("should desensitize from the third to the tenth place.", () => {
    expect(masking(char, [2, 10])).toBe("12********abcdef");
  });

  it("should desensitize from the begining to end ending", () => {
    expect(masking(char, [])).toBe("****************");
  });

  it("should desensitize from the third to the second to last place.", () => {
    expect(masking(char, [2, -2])).toBe("12************ef");
  });

  it("should return origin charactor", () => {
    expect(masking(char, {} as any)).toBe(char);
  });
});
