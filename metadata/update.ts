import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
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

const defaultNames = {
  index: "index.ts",
  node: "index.node.ts",
  browser: "index.browser.ts",
  demo: "demo.vue",
  test: "index.test.ts",
};

export interface UtilFunction {
  /** Relative path to project root */
  path: string;
  /** Function name */
  name: string;
  /** Category */
  category?: string;
  lastUpdated: {
    index?: number;
    node?: number;
    browser?: number;
  };
  /** File names */
  file: {
    doc: string;
    index?: string;
    node?: string;
    browser?: string;
    test?: string;
    demo?: string;
  };
  /** Source url for function */
  source: {
    doc: string;
    index?: string;
    node?: string;
    browser?: string;
    test?: string;
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
      const dirPath = join(DIR_FUNCTION, name);
      const stat = statSync(dirPath);

      if (stat.isDirectory()) {
        const indexPath = hasFile(dirPath, defaultNames.index) ? join(dirPath, defaultNames.index) : undefined;
        const nodePath = hasFile(dirPath, defaultNames.node) ? join(dirPath, defaultNames.node) : undefined;
        const browserPath = hasFile(dirPath, defaultNames.browser) ? join(dirPath, defaultNames.browser) : undefined;
        if (!indexPath && !nodePath && !browserPath) {
          continue;
        }

        const docPath = join(dirPath, "index.md");
        const doc = readFileSync(docPath, "utf-8");

        if (!doc) {
          console.warn(`[metadata update] ${name} doc not found, ignored!`);
          continue;
        }

        const relativeDirPath = relative(DIR_ROOT, dirPath);
        const childrenNames = readdirSync(dirPath, "utf-8");

        const func: UtilFunction = {
          path: normalizePath(relativeDirPath),
          name,
          // convert to number
          lastUpdated: {
            index: indexPath ? +await git.raw(["log", "-1", "--format=%at", indexPath]) * 1000 : undefined,
            node: nodePath ? +await git.raw(["log", "-1", "--format=%at", nodePath]) * 1000 : undefined,
            browser: browserPath ? +await git.raw(["log", "-1", "--format=%at", browserPath]) * 1000 : undefined,
          },
          file: {
            doc: "index.md",
            index: indexPath ? defaultNames.index : undefined,
            node: nodePath ? defaultNames.node : undefined,
            browser: browserPath ? defaultNames.browser : undefined,
          },
          source: {
            index: indexPath ? GITHUB_REPO + normalizePath(relative(DIR_ROOT, indexPath)) : undefined,
            node: nodePath ? GITHUB_REPO + normalizePath(relative(DIR_ROOT, nodePath)) : undefined,
            browser: browserPath ? GITHUB_REPO + normalizePath(relative(DIR_ROOT, browserPath)) : undefined,
            doc: GITHUB_REPO + normalizePath(relative(DIR_ROOT, docPath)),
          },
          url: {
            doc: `${DOC_URL + normalizePath(relativeDirPath)}/`,
          },
        };

        const { data = {} } = matter(doc);
        const { demo, test, category } = data;

        if (category) {
          func.category = data.category;
        }

        // test demo doc

        const names = { demo, test };
        for (const _key in names) {
          const key = _key as keyof typeof names;
          // specified file name but not found
          if (names[key] !== undefined && !childrenNames.includes(names[key])) {
            console.warn(`[metadata update] ${name} requires ${key}, but file not found`);
            continue;
          }
          const value = names[key] ?? defaultNames[key];

          if (names[key] === false || !childrenNames.includes(value)) {
            continue;
          }

          func.file[key] = value;

          func.source[key] = GITHUB_REPO + normalizePath(join(relativeDirPath, value));
        }

        functions.push(func);
      }
    }
  }
  return functions;
}

async function run() {
  const functions = await readFunctionMetadata();
  writeFileSync(join(__dirname, "./functions.json"), JSON.stringify(functions, null, 2), "utf-8");
}

run();

function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}

function hasFile(dir: string, filename: string | string[]) {
  const childrenNames = readdirSync(dir, "utf-8");
  if (typeof filename === "string") {
    return childrenNames.includes(filename);
  }
  for (const name of filename) {
    if (childrenNames.includes(name)) {
      return true;
    }
  }
  return false;
}
