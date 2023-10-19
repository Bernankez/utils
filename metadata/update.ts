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
const FUNCTION_REG = /^index(\.\w*){0,1}\.ts$/;

const defaultNames = {
  demo: "demo.vue",
  test: "index.test.ts",
};

export type ImportEntry = "index" | "node" | "browser" | "vuejs" | "typescript";

export interface UtilFunction {
  /** Relative path to project root */
  path: string;
  /** Function name */
  name: string;
  /** Category */
  category?: string;
  lastUpdated: {
    [env in ImportEntry]: number | undefined;
  };
  /** File names */
  file: {
    doc: string;
    demo?: string;
    test?: string;
  } & {
    [env in ImportEntry]: string | undefined;
  };
  /** Source url for function */
  source: {
    doc: string;
    demo?: string;
    test?: string;
  } & {
    [env in ImportEntry]: string | undefined;
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
        // Check index file
        const childrenNames = readdirSync(dirPath, "utf-8");
        const hasIndexFile = childrenNames.some(name => FUNCTION_REG.test(name));
        if (!hasIndexFile) {
          console.warn(`[meta update] ${name} does not provide an index.ts file, ignored.`);
          continue;
        }

        // Check doc file
        const docPath = join(dirPath, "index.md");
        const doc = readFileSync(docPath, "utf-8");
        if (!doc) {
          console.warn(`[metadata update] ${name} doc not found, ignored!`);
          continue;
        }

        // envName: filepath
        const indexPaths: Record<string, string> = {};
        // Handle index files
        childrenNames.forEach((indexName) => {
          const match = indexName.match(FUNCTION_REG);
          if (match) {
            const [full, envName] = match;
            if (envName) {
              // Ignore test file
              if (envName === ".test") {
                return;
              }
              indexPaths[envName.slice(1)] = join(dirPath, full);
            } else {
              indexPaths.index = join(dirPath, full);
            }
          }
        });

        const relativeDirPath = relative(DIR_ROOT, dirPath);
        const demoPath = childrenNames.includes(defaultNames.demo) ? join(dirPath, defaultNames.demo) : undefined;
        const testPath = childrenNames.includes(defaultNames.test) ? join(dirPath, defaultNames.test) : undefined;

        // Handle lastUpdated time
        const lastUpdates: Record<string, number> = {};
        for (const [envName, filepath] of Object.entries(indexPaths)) {
          // Convert to number
          lastUpdates[envName] = +await git.raw(["log", "-1", "--format=%at", filepath]) * 1000;
        }
        const func: UtilFunction = {
          path: normalizePath(relativeDirPath),
          name,
          lastUpdated: lastUpdates as UtilFunction["lastUpdated"],
          file: {
            doc: "index.md",
            demo: demoPath ? defaultNames.demo : undefined,
            test: testPath ? defaultNames.test : undefined,
            ...Object.entries(indexPaths).map(([envName]) => ({
              [envName]: envName === "index" ? "index.ts" : `index.${envName}.ts`,
            })).reduce((pre, cur) => ({ ...pre, ...cur }), {}),
          } as UtilFunction["file"],
          source: {
            doc: GITHUB_REPO + normalizePath(relative(DIR_ROOT, docPath)),
            demo: demoPath ? GITHUB_REPO + normalizePath(relative(DIR_ROOT, demoPath)) : undefined,
            test: testPath ? GITHUB_REPO + normalizePath(relative(DIR_ROOT, testPath)) : undefined,
            ...Object.entries(indexPaths).map(([envName, filepath]) => ({
              [envName]: GITHUB_REPO + normalizePath(relative(DIR_ROOT, filepath)),
            })).reduce((pre, cur) => ({ ...pre, ...cur }), {}),
          } as UtilFunction["source"],
          url: {
            doc: `${DOC_URL + normalizePath(relativeDirPath)}/`,
          },
        };

        const { data = {} } = matter(doc);
        const { category } = data;

        if (category) {
          func.category = data.category;
        }

        functions.push(func);
      }
    }
  }
  return functions;
}

async function run() {
  const functions = await readFunctionMetadata();
  writeFileSync(join(__dirname, "./functions.json"), `${JSON.stringify(functions, null, 2)}\n`, "utf-8");
}

run();

function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}
