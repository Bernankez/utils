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

// async function readFunctionMetadata1() {
//   const functionNames = readdirSync(DIR_FUNCTION, "utf-8");
//   const functions: UtilFunction[] = [];
//   for (const name of functionNames) {
//     if (!name.startsWith("_") && !name.startsWith(".")) {
//       const dirPath = join(DIR_FUNCTION, name);
//       const stat = statSync(dirPath);

//       if (stat.isDirectory()) {
//         // Check index file
//         const childrenNames = readdirSync(dirPath, "utf-8");
//         const hasIndexFile = childrenNames.some(name => FUNCTION_REG.test(name));
//         if (!hasIndexFile) {
//           console.warn(`[meta update] ${name} does not provide an index.ts file, ignored.`);
//           continue;
//         }

//         // Check doc file
//         const docPath = join(dirPath, "index.md");
//         const doc = readFileSync(docPath, "utf-8");
//         if (!doc) {
//           console.warn(`[metadata update] ${name} doc not found, ignored!`);
//           continue;
//         }

//         // envName: filepath
//         const indexPaths: Record<string, string> = {};
//         // Handle index files
//         childrenNames.forEach((indexName) => {
//           const match = indexName.match(FUNCTION_REG);
//           if (match) {
//             const [full, envName] = match;
//             if (envName) {
//               // Ignore test file
//               if (envName === ".test") {
//                 return;
//               }
//               indexPaths[envName.slice(1)] = join(dirPath, full);
//             } else {
//               indexPaths.index = join(dirPath, full);
//             }
//           }
//         });

//         const relativeDirPath = relative(DIR_ROOT, dirPath);
//         const demoPath = childrenNames.includes(defaultNames.demo) ? join(dirPath, defaultNames.demo) : undefined;
//         const testPath = childrenNames.includes(defaultNames.test) ? join(dirPath, defaultNames.test) : undefined;

//         // Handle lastUpdated time
//         const lastUpdates: Record<string, number> = {};
//         for (const [envName, filepath] of Object.entries(indexPaths)) {
//           // Convert to number
//           lastUpdates[envName] = +await git.raw(["log", "-1", "--format=%at", filepath]) * 1000;
//         }
//         const func: UtilFunction = {
//           path: normalizePath(relativeDirPath),
//           name,
//           lastUpdated: lastUpdates as UtilFunction["lastUpdated"],
//           file: {
//             doc: "index.md",
//             demo: demoPath ? defaultNames.demo : undefined,
//             test: testPath ? defaultNames.test : undefined,
//             ...Object.entries(indexPaths).map(([envName]) => ({
//               [envName]: envName === "index" ? "index.ts" : `index.${envName}.ts`,
//             })).reduce((pre, cur) => ({ ...pre, ...cur }), {}),
//           } as UtilFunction["file"],
//           source: {
//             doc: GITHUB_REPO + normalizePath(relative(DIR_ROOT, docPath)),
//             demo: demoPath ? GITHUB_REPO + normalizePath(relative(DIR_ROOT, demoPath)) : undefined,
//             test: testPath ? GITHUB_REPO + normalizePath(relative(DIR_ROOT, testPath)) : undefined,
//             ...Object.entries(indexPaths).map(([envName, filepath]) => ({
//               [envName]: GITHUB_REPO + normalizePath(relative(DIR_ROOT, filepath)),
//             })).reduce((pre, cur) => ({ ...pre, ...cur }), {}),
//           } as UtilFunction["source"],
//           url: {
//             doc: `${DOC_URL + normalizePath(relativeDirPath)}/`,
//           },
//         };

//         const { data = {} } = matter(doc);
//         const { category } = data;

//         if (category) {
//           func.category = data.category;
//         }

//         functions.push(func);
//       }
//     }
//   }
//   return functions;
// }
