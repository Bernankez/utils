import { describe, expect, it } from "vitest";
import { UtilsResolver } from "./resolver";

const names = [
  "masking",
  "resolvePath",
  "tryUntilMounted",
  "Prettier",
];

const resolved = [
  "@bernankez/utils",
  "@bernankez/utils/node",
  "@bernankez/utils/vue",
  "@bernankez/utils",
];

const types = [
  false,
  undefined,
  undefined,
  true,
];

const resolver = UtilsResolver().resolve;

describe("resolver", () => {
  it("resolve import entry", () => {
    names.forEach((name, i) => {
      expect(resolver(name)).toEqual({
        name,
        from: resolved[i],
        // type: types[i],
      });
    });
  });
});
