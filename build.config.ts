import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "functions/index",
    "functions/node/index",
    "functions/browser/index",
    "functions/vue/index",
    "functions/resolver",
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    output: {
      preserveModules: true,
    },
  },
  alias: {
    "@": resolve(__dirname, "./functions"),
    "~": __dirname,
    "@bernankez/utils": resolve(__dirname, "./functions"),
    "@bernankez/utils/node": resolve(__dirname, "./functions/node/index.ts"),
    "@bernankez/utils/browser": resolve(__dirname, "./functions/browser/index.ts"),
    "@bernankez/utils/vue": resolve(__dirname, "./functions/vue/index.ts"),
  },
  hooks: {
    "build:before": (ctx) => {
      ctx.options.entries.forEach((entry) => {
        entry.name = entry.name?.replace(/functions\//, "");
      });
    },
  },
});

