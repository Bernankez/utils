import type { ResolverFunction } from "unplugin-auto-import/types";
import { functionNames, getFunction } from "~/metadata/functions";

export function UtilsResolver(): ResolverFunction {
  return (name: string) => {
    if (functionNames.includes(name)) {
      const func = getFunction(name);
      let pkg = "";
      if (func.file.index || func.file.typescript) {
        pkg = "@bernankez/utils";
      } else if (func.file.node) {
        pkg = "@bernankez/utils/node";
      } else if (func.file.browser) {
        pkg = "@bernankez/utils/browser";
      } else if (func.file.vuejs) {
        pkg = "@bernankez/utils/vue";
      }
      if (pkg) {
        return {
          module: name,
          from: pkg,
        };
      }
    }
    return null;
  };
}
