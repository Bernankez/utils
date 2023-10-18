import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./functions"),
        "*": __dirname,
        "@bernankez/utils": resolve(__dirname, "./functions"),
        "@bernankez/utils/node": resolve(__dirname, "./functions/node.ts"),
        "@bernankez/utils/browser": resolve(__dirname, "./functions/browser.ts"),
        "@bernankez/utils/vue": resolve(__dirname, "./functions/vue.ts"),
      },
    },
  };
});
