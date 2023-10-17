import type { Plugin } from "vitepress";
import { functionNames, getFunction } from "../../metadata/functions";

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

      const paths = id.split("/");
      const name = paths.at(-2)!;
      const i = paths.at(-1)!;

      if (!id.includes("functions/") || id.includes("functions/index.md")) {
        // not function folder, skip demo transform
        return null;
      }

      if (!functionNames.includes(name)) {
        console.warn(`Function ${name} mismatched, run \`pnpm run update\` first.`);
      } else if (i === "index.md") {
        const frontmatterEnds = code.indexOf("---\n\n");
        const firstHeader = code.search(/\n#{2,6}\s.+/);
        const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader;
        const func = getFunction(name);

        let header = "";
        const demoPath = func.file.demo;
        if (demoPath) {
          const demoSection = `
<script setup>
import Demo from "./${demoPath}";
</script>

## Demo

<DemoWrapper source=${func.source.demo}>
  <Demo />
</DemoWrapper>
`;
          header += demoSection;
        }
        code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex);

        const source = func.source;
        const footer = `
## Source

${[
  source.index ? ["Source", source.index] : undefined,
  source.browser ? ["Source(Browser)", source.browser] : undefined,
  source.node ? ["Source(Node)", source.node] : undefined,
  source.demo ? ["Demo", source.demo] : undefined,
  source.doc ? ["Docs", source.doc] : undefined,
  source.test ? ["Tests", source.test] : undefined,
].filter(item => !!item).map(src => `<a href="${src![1]}" target="_blank" style="text-decoration: none">${src![0]}</a>`)
          .join(" • ")}
`;
        code += footer;

        code = code.replace(/(# \w+?)\n/, `$1\n\n<FunctionInfo fn="${name}"/>\n`);
      }

      return code;
    },
  };
}
