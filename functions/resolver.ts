import type { ResolverFunction } from "unplugin-auto-import/types";
import { getFunction } from "~/metadata/functions";

export function UtilsResolver(): ResolverFunction {
  return (name) => {
    const func = getFunction(name);
    if (func) {
      if (func.entry === "core") {
        return {
          module: name,
          from: "@bernankez/utils",
        };
      }
      return {
        module: name,
        from: `@bernankez/utils/${func.entry}`,
      };
    }
    return undefined;
  };
}
