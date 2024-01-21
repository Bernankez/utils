import _functions from "./functions.json";
import type { UtilFunction } from "./update";

export const functions = _functions as unknown as UtilFunction[];

export const functionNames = _functions.map(func => func.name);

export function getFunction(name: string) {
  return functions.find(func => func.name === name) as UtilFunction;
}

function getFunctions() {
  const categoriesOrder = [
    "Alternative",
    "Processing",
    "Stuff",
    "Validation",
    "Vue",
    "Type",
  ];
  const functionsWithCategory = {} as Record<string, UtilFunction[]>;
  const functionsWithoutCategory: UtilFunction[] = [];
  for (const func of functions) {
    if (!func.category) {
      functionsWithoutCategory.push(func);
      continue;
    }
    if (!categoriesOrder.includes(func.category)) {
      categoriesOrder.push(func.category);
    }
    if (!functionsWithCategory[func.category]) {
      functionsWithCategory[func.category] = [];
    }
    functionsWithCategory[func.category].push(func);
  }
  for (const category in functionsWithCategory) {
    functionsWithCategory[category] = functionsWithCategory[category].sort((a, b) => a.name.localeCompare(b.name));
  }

  return {
    categoriesOrder,
    functionsWithCategory,
    functionsWithoutCategory,
  };
}

export const { categoriesOrder, functionsWithCategory, functionsWithoutCategory } = getFunctions();
