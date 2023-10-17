import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "functions/index",
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
  },
  hooks: {
    "build:before": (ctx) => {
      ctx.options.entries.forEach((entry) => {
        entry.name = entry.name?.replace(/functions\//, "");
      });
    },
  },
});

