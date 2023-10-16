import _functions from "./functions.json";
import type { UtilFunction } from "./update";

export const functions = _functions as UtilFunction[];

export const functionNames = _functions.map(func => func.name);

export function getFunction(name: string) {
  return _functions.find(func => func.name === name) as UtilFunction;
}

function getFunctionsWithCategory() {
  const categoriesOrder = [
    "Alternative",
    "String",
    "Validate",
  ];
  const functionsWithCategory = {} as Record<string, UtilFunction[]>;
  const ungrouped: UtilFunction[] = [];
  for (const func of _functions) {
    if (!func.category) {
      ungrouped.push(func);
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
  };
}

export const { categoriesOrder, functionsWithCategory } = getFunctionsWithCategory();
