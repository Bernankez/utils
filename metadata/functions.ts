import _functions from "./functions.json";
import { type FunctionFile, type UtilFunction } from "./utils";

export const functions = _functions as unknown as UtilFunction[];

export const functionNames = _functions.map(func => func.name);

export function getFunction(name: string) {
  return functions.find(func => func.name === name) as UtilFunction;
}

function getFunctions() {
  const categories = new Set<string>();
  functions.forEach((func) => {
    if (func.additions.category) {
      categories.add(func.additions.category);
    }
  });
  const functionsWithCategory: [string, UtilFunction[]][] = [];
  const functionsWithoutCategory: UtilFunction[] = [];
  for (const func of functions) {
    if (!func.additions.category) {
      functionsWithoutCategory.push(func);
      continue;
    }
    const category = functionsWithCategory.find(([category]) => category === func.additions.category);
    if (category) {
      category[1].push(func);
    } else {
      functionsWithCategory.push([func.additions.category, [func]]);
    }
  }
  functionsWithCategory.sort(([a], [b]) => a.localeCompare(b));
  functionsWithCategory.forEach(([, funcs]) => {
    funcs.sort((a, b) => a.name.localeCompare(b.name));
  });
  functionsWithoutCategory.sort((a, b) => a.name.localeCompare(b.name));

  function getCategory(category: string) {
    return functionsWithCategory.find(([cat]) => cat === category)?.[1] ?? [];
  }

  return {
    categories: Array.from(categories).sort(),
    functionsWithCategory,
    functionsWithoutCategory,
    getCategory,
  };
}

export function getFunctionFile(func: UtilFunction, type: FunctionFile["type"]) {
  return func.files.find(file => file.type === type);
}

export const { categories, functionsWithCategory, functionsWithoutCategory, getCategory } = getFunctions();
