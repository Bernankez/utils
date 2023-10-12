import { resolve } from "node:path";
import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";

const root = process.cwd();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cole's Utils",
  titleTemplate: ":title · utils",
  description: "Cole's utils preset",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Functions", link: "/functions/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/" },
          ],
        },
      ],
      "/functions/": [
        { text: "All functions", link: "/functions/" },
        {
          text: "Alternative",
          items: [
            { text: "resolvePath", link: "/functions/alternative/resolve-path" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Bernankez/utils" },
    ],
  },
  vite: {
    plugins: [UnoCSS()],
    resolve: {
      alias: {
        "@/*": resolve(root, "./src"),
        "~/*": resolve(root, "./"),
        "@bernankez/utils": resolve(root, "./src"),
      },
    },
  },
});
