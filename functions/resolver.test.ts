import { describe, expect, it } from "vitest";
import { UtilsResolver } from "./resolver";

const names = [
  "masking",
  "resolvePath",
  "tryUntilMounted",
];

const resolved = [
  "@bernankez/utils",
  "@bernankez/utils/node",
  "@bernankez/utils/vue",
];

const resolver = UtilsResolver();

describe("resolver", () => {
  it("resolve import entry", () => {
    names.forEach((name, i) => {
      expect(resolver(name)).toEqual({
        module: name,
        from: resolved[i],
      });
    });
  });
});
