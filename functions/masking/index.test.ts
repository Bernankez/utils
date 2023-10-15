import { describe, expect, it } from "vitest";
import { masking } from ".";

const email = "@bernankez/utils";

describe("isDefined", () => {
  it("should be defined", () => {
    expect(masking).toBeDefined();
  });

  it("should mask from 3 to -3", () => {
    expect(masking(email, [3, -3])).toBe("@be**********ils");
  });

  it("should mask from 2 to 4, 6 to 8", () => {
    expect(masking(email, [[2, 4], [6, 8]])).toBe("@b**na**ez/utils");
  });

  it("should mask with `-`", () => {
    expect(masking(email, [3, -3], "-")).toBe("@be----------ils");
  });
});
