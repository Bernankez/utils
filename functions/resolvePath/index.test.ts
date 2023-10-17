import { describe, expect, it } from "vitest";
import { resolvePath } from "@bernankez/utils";

const isWindows = process.platform === "win32";

const url = isWindows ? "file:///C:/Projects/utils/functions/resolve.ts" : "file:///Users/username/Public/Projects/utils/functions/resolve.ts";
const filenameUrl = isWindows ? "C:\\Projects\\utils\\functions\\resolve.ts" : "/Users/username/Public/Projects/utils/functions/resolve.ts";
const dirnameUrl = isWindows ? "C:\\Projects\\utils\\functions" : "/Users/username/Public/Projects/utils/functions";

const { __dirname, __filename } = resolvePath(url);

describe("resolvePath", () => {
  it("check __filename", () => {
    expect(__filename).toBe(filenameUrl);
  });

  it("check __dirname", () => {
    expect(__dirname).toBe(dirnameUrl);
  });
});
