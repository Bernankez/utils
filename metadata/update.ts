import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import matter from "gray-matter";
import { type FunctionEntry, type FunctionFile, type FunctionFileType, type UtilFunction, __dirname, dirRoot, docUrl, functionEntries, functionFileMap, functionRoot, git, githubRepo } from "./utils";

async function readFunctionMetadata() {
  const functions: UtilFunction[] = [];
  for (const dir of functionEntries) {
    const functionDir = resolve(functionRoot, dir);
    const functionNames = readdirSync(functionDir, "utf-8");
    for (const name of functionNames) {
      if (!name.startsWith("_") && !name.startsWith(".")) {
        const dirPath = resolve(functionDir, name);
        const stat = statSync(dirPath);

        if (stat.isDirectory()) {
          const childrenNames = readdirSync(dirPath, "utf-8");
          const files: FunctionFile[] = [];
          for (const child of childrenNames) {
            const type = Object.keys(functionFileMap).find(key => child === functionFileMap[key as FunctionFileType]) as FunctionFileType | "unknown";
            files.push({
              type,
              filename: child,
              source: githubRepo + relative(dirRoot, join(dirPath, child)),
              lastUpdated: +await git.raw(["log", "-1", "--format=%at", join(dirPath, child)]) * 1000,
            });
          }
          const relativepath = relative(dirRoot, dirPath);
          const docFile = files.find(file => file.type === "doc");
          let additions = {};
          if (docFile) {
            const docPath = resolve(dirPath, docFile.filename);
            const doc = readFileSync(docPath, "utf-8");
            const { data = {} } = matter(doc);
            additions = data;
          }
          functions.push({
            path: relativepath,
            name,
            doc: `${docUrl + relativepath}/`,
            entry: dir as FunctionEntry,
            additions,
            files,
          });
        }
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
