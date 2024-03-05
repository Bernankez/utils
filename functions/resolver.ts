import type { ResolverResultObject } from "unplugin-auto-import/types";
import { getFunction } from "~/metadata/functions";

export function UtilsResolver(): ResolverResultObject {
  return {
    type: "directive",
    resolve(name: string) {
      const func = getFunction(name);
      if (func) {
        if (func.entry === "core") {
          return {
            from: "@bernankez/utils",
            name,
          // type: func.additions.category === "Type",
          };
        } else {
          return {
            from: `@bernankez/utils/${func.entry}`,
            name,
          };
        }
      }
      return undefined;
    },
  };
}
