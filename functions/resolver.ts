import type { ResolverFunction } from "unplugin-auto-import/types";
import type { UtilFunction } from "~/metadata/update";
import functions from "~/metadata/functions.json";

const functionNames = functions.map(func => func.name);

function getFunction(name: string) {
  return functions.find(func => func.name === name) as UtilFunction;
}

export const UtilsResolver: ResolverFunction = (name: string) => {
  if (functionNames.includes(name)) {
    const func = getFunction(name);
    if (func.file.index) {
      return "@bernankez/utils";
    } else if (func.file.node) {
      return "@bernankez/utils/node";
    } else if (func.file.browser) {
      return "@bernankez/utils/browser";
    }
  }
  return null;
};
