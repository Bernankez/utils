import { describe, expect, it } from "vitest";
import { getPlatform, resolvePath } from "../src";

const isWindows = getPlatform() === "Win32";

const url = isWindows ? "file:///C:/Projects/utils/src/resolve.ts" : "file:///Users/username/Public/Projects/utils/src/resolve.ts";
const filenameUrl = isWindows ? "C:\\Projects\\utils\\src\\resolve.ts" : "/Users/username/Public/Projects/utils/src/resolve.ts";
const dirnameUrl = isWindows ? "C:\\Projects\\utils\\src" : "/Users/username/Public/Projects/utils/src";

const { __dirname, __filename } = resolvePath(url);

describe("resolvePath", () => {
  it("check __filename", () => {
    expect(__filename).toBe(filenameUrl);
  });

  it("check __dirname", () => {
    expect(__dirname).toBe(dirnameUrl);
  });
});
