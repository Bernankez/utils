import type { ResolverFunction } from "unplugin-auto-import/types";
import { functionNames } from "~/metadata/functions";

export function UtilsResolver(): ResolverFunction {
  return (name: string) => {
    if (functionNames.includes(name)) {
      return {
        module: name,
        from: "@bernankez/utils",
      };
    }
    return null;
  };
}
