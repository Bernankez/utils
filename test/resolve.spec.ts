import { describe, expect, it } from "vitest";
import { resolvePath } from "../src";

const url = "file:///Users/username/Public/Projects/utils/src/resolve.ts";

const { __dirname, __filename } = resolvePath(url);

describe("resolvePath", () => {
  it("check __filename", () => {
    expect(__filename).toBe("/Users/username/Public/Projects/utils/src/resolve.ts");
  });

  it("check __dirname", () => {
    expect(__dirname).toBe("/Users/username/Public/Projects/utils/src");
  });
});
