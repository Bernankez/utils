import type { ResolverFunction } from "unplugin-auto-import/types";
import type { UtilFunction } from "~/metadata/update";
import functions from "~/metadata/functions.json";

const functionNames = functions.map(func => func.name);

function getFunction(name: string) {
  return functions.find(func => func.name === name) as UtilFunction;
}

export function UtilsResolver(): ResolverFunction {
  return (name: string) => {
    if (functionNames.includes(name)) {
      const func = getFunction(name);
      let pkg = "";
      if (func.file.index) {
        pkg = "@bernankez/utils";
      } else if (func.file.node) {
        pkg = "@bernankez/utils/node";
      } else if (func.file.browser) {
        pkg = "@bernankez/utils/browser";
      }
      if (pkg) {
        return {
          module: pkg,
          from: name,
        };
      }
    }
    return null;
  };
}
