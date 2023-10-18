import { describe, expect, it } from "vitest";
import { isDefined, masking } from "@bernankez/utils";
import { resolvePath } from "./node";
import { tryUntilMounted } from "./vue";

describe("check exports", () => {
  it("default exports", () => {
    expect(isDefined(masking)).toBe(true);
  });

  it("node exports", () => {
    expect(isDefined(resolvePath)).toBe(true);
  });

  it("vue exports", () => {
    expect(isDefined(tryUntilMounted)).toBe(true);
  });
});
