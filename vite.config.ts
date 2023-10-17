import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./functions"),
        "*": __dirname,
        "@bernankez/utils": resolve(__dirname, "./functions"),
      },
    },
  };
});
