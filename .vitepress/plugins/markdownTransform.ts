import type { Plugin } from "vitepress";
import functions from "../../metadata/functions.json";

const functionNames = functions.map(func => func.name);

function getFunction(name: string) {
  return functions.find(func => func.name === name)!;
}

export function markdownTransform(): Plugin {
  return {
    name: "@bernankez/utils-md-transform",
    enforce: "pre",
    transform(code, id) {
      if (!id.match(/\.md\b/)) {
        return null;
      }

      // link transform
      code = code.replace(
        new RegExp(`\`(${functionNames.join("|")})\`(.{0,1})`, "g"),
        (_, name, ending) => {
          if (ending === "]") { // already a link
            return _;
          }
          const fn = getFunction(name);
          return `[\`${fn.name}\`](${fn.url.doc}) `;
        },
      );

      // convert links to relative
      code = code.replace(/https?:\/\/utils\.keke\.cc\//g, "/");

      // add demo

      const paths = id.split("/");
      const name = paths.at(-2)!;
      const i = paths.at(-1)!;
      if (!functionNames.includes(name)) {
        console.warn(`Function ${name} mismatched, run \`pnpm run update\` first.`);
      } else if (i === "index.md") {
        const frontmatterEnds = code.indexOf("---\n\n");
        const firstHeader = code.search(/\n#{2,6}\s.+/);
        const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader;
        const func = getFunction(name);
        const demoPath = func.file.demo;
        if (demoPath) {
          const demoSection = `
<script setup>
import Demo from "./${demoPath}";
</script>

## Demo

<div>
Demo
  <Demo />
</div>
          `;
          code = code.slice(0, sliceIndex) + demoSection + code.slice(sliceIndex);
        }
      }

      // add source

      return code;
    },
  };
}
