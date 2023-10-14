import type { Plugin } from "vitepress";
import functions from "../../metadata/functions.json";

const functionNames = functions.map(func => func.name);

export function markdownTransform(): Plugin {
  return {
    name: "@bernankez/utils-md-transform",
    enforce: "pre",
    transform(code, id) {
      if (!id.match(/\.md\b/)) {
        return null;
      }

      code = code.replace(
        new RegExp(`\`(${functionNames.join("|")})\`(.{0,1})`, "g"),
        (_, name, ending) => {
          if (ending === "]") { // already a link
            return _;
          }
          const fn = functions.find(func => func.name === name)!;
          return `[\`${fn.name}\`](${fn.url.doc}) `;
        },
      );

      return code;
    },
  };
}
