import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Git from "simple-git";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const dirRoot = resolve(__dirname, "..");
export const functionRoot = resolve(dirRoot, "./functions");
export const functionEntries = asConst(["core", "node", "browser", "vue"]);

export const docUrl = "https://utils.keke.cc/";
export const githubRepo = "https://github.com/Bernankez/utils/blob/master/";
export const git = Git(dirRoot);

export const functionFileMap = {
  lib: "index.ts",
  doc: "index.md",
  demo: "demo.vue",
  test: "index.test.ts",
};

export type FunctionFileType = keyof typeof functionFileMap;
export type FunctionEntry = typeof functionEntries[number];

export interface UtilFunction {
  /** Function name */
  name: string;
  /** Relative path to project root */
  path: string;
  doc: string;
  entry: FunctionEntry;
  additions: { category?: string } & Record<string, string>;
  files: FunctionFile[];
}

export interface FunctionFile {
  type: FunctionFileType | "unknown";
  filename: string;
  source: string;
  lastUpdated: number;
}

function asConst<T extends string[]>(t: [...T]) {
  return t;
}

export function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}

