import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import Git from "simple-git";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR_ROOT = resolve(__dirname, "..");
const DIR_FUNCTION = resolve(DIR_ROOT, "./functions");
const DOC_URL = "https://utils.keke.cc/";
const GITHUB_REPO = "https://github.com/Bernankez/utils/blob/master/";
const git = Git(DIR_ROOT);

const fileMap = {
  test: "index.test.ts",
  doc: "index.md",
  demo: "demo.vue",
} as const;

export interface UtilFunction {
  /** Relative path to project root */
  path: string;
  /** Function name */
  name: string;
  /** Category */
  category?: string;
  lastUpdated: number;
  /** Source url for function */
  source: {
    file: string;
    test?: string;
    doc?: string;
    demo?: string;
  };
  url: {
    doc: string;
  };
}

async function readFunctionMetadata() {
  const functionNames = readdirSync(DIR_FUNCTION, "utf-8");
  const functions: UtilFunction[] = [];
  for (const name of functionNames) {
    if (!name.startsWith("_") && !name.startsWith(".")) {
      const path = resolve(DIR_FUNCTION, name);
      const stat = statSync(path);

      if (stat.isDirectory()) {
        const relativePath = normalizePath(relative(DIR_ROOT, path));
        const filePath = join(relativePath, "index.ts");

        if (!existsSync(filePath)) {
          continue;
        }

        const func: UtilFunction = {
          path: relativePath,
          name,
          // convert to number
          lastUpdated: +await git.raw(["log", "-1", "--format=%at", filePath]) * 1000,
          source: {
            file: GITHUB_REPO + normalizePath(filePath),
          },
          url: {
            doc: `${DOC_URL + relativePath}/`,
          },
        };

        // test demo doc
        const childrenNames = readdirSync(path, "utf-8");
        for (const _key in fileMap) {
          const key = _key as keyof typeof fileMap;
          if (childrenNames.includes(fileMap[key])) {
            func.source[key] = GITHUB_REPO + normalizePath(join(relativePath, fileMap[key]));
          }
        }

        // category
        const doc = readFileSync(join(path, "./index.md"), "utf-8");
        if (doc) {
          const { data } = matter(doc);
          if (data.category) {
            func.category = data.category;
          }
        }

        functions.push(func);
      }
    }
  }
  return functions;
}

function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}

async function run() {
  const functions = await readFunctionMetadata();
  writeFileSync(join(__dirname, "./functions.json"), JSON.stringify(functions, null, 2), "utf-8");
}

run();
