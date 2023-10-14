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

const defaultNames = {
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
  lastUpdated: number;
  /** File names */
  file: {
    file: string;
    doc: string;
    test?: string;
    demo?: string;
  };
  /** Source url for function */
  source: {
    file: string;
    doc: string;
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
        const relativeDirPath = relative(DIR_ROOT, dirPath);
        const tsPath = join(dirPath, "index.ts");

        if (!existsSync(tsPath)) {
          continue;
        }

        const docPath = join(dirPath, "index.md");
        const doc = readFileSync(docPath, "utf-8");

        if (!doc) {
          console.warn(`[metadata update] ${name} doc not found, ignored!`);
          continue;
        }

        const func: UtilFunction = {
          path: normalizePath(relativeDirPath),
          name,
          // convert to number
          lastUpdated: +await git.raw(["log", "-1", "--format=%at", tsPath]) * 1000,
          file: {
            file: "index.ts",
            doc: "index.md",
          },
          source: {
            file: GITHUB_REPO + normalizePath(relative(DIR_ROOT, tsPath)),
            doc: GITHUB_REPO + normalizePath(relative(DIR_ROOT, docPath)),
          },
          url: {
            doc: `${DOC_URL + relativeDirPath}/`,
          },
        };

        const { data = {} } = matter(doc);
        const { demo, test, category } = data;

        if (category) {
          func.category = data.category;
        }

        // test demo doc
        const childrenNames = readdirSync(dirPath, "utf-8");
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

function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}

async function run() {
  const functions = await readFunctionMetadata();
  writeFileSync(join(__dirname, "./functions.json"), JSON.stringify(functions, null, 2), "utf-8");
}

run();
