import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "functions/index",
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  alias: {
    "@": resolve(__dirname, "./functions"),
    "*": __dirname,
  },
});
