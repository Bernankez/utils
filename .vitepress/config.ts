import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { functionsWithCategory, functionsWithoutCategory } from "../metadata/functions";
import { version } from "../package.json";
import { markdownTransform } from "./plugins/markdownTransform";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dirRoot = resolve(__dirname, "..");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "Cole's Utils",
  titleTemplate: ":title · utils",
  description: "Cole's utils preset",
  head: [["link", { rel: "icon", href: "/package.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      getGuideSidebar(),
      {
        text: "Functions",
        items: [
          ...(getFunctionsSidebar() as DefaultTheme.NavItemChildren[]),
        ],
      },
      {
        text: `v${version}`,
        items: [
          {
            text: "Release Notes",
            link: "https://github.com/Bernankez/utils/releases",
          },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        getGuideSidebar(),
      ],
      "/functions/": [
        ...getFunctionsSidebar(),
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Bernankez/utils" },
    ],
    search: {
      provider: "local",
    },
    logo: "/package.svg",
  },
  vite: {
    plugins: [UnoCSS(), markdownTransform()],
    resolve: {
      alias: {
        "@": join(dirRoot, "./functions"),
        "~": join(dirRoot, "./"),
        "@bernankez/utils": join(dirRoot, "./functions"),
        "@bernankez/utils/node": join(dirRoot, "./functions/node/index.ts"),
        "@bernankez/utils/browser": join(dirRoot, "./functions/browser/index.ts"),
        "@bernankez/utils/vue": join(dirRoot, "./functions/vue/index.ts"),
      },
    },
  },
});

function getGuideSidebar() {
  return {
    text: "Guide",
    items: [
      { text: "Getting Started", link: "/guide/" },
      { text: "Contributing", link: "/guide/contributing" },
    ],
  };
}

function getFunctionsSidebar() {
  const links: DefaultTheme.Sidebar = [];
  for (const category of functionsWithCategory) {
    links.push({
      text: category[0],
      items: category[1].map(func => ({
        text: func.name,
        link: `/${func.path}/`,
      })),
    });
  }
  return [
    { text: "All functions", link: "/functions/" },
    functionsWithoutCategory.length
      ? {
          text: "Non Category",
          items: functionsWithoutCategory.map(func => ({
            text: func.name,
            link: `/${func.path}/`,
          })),
        }
      : undefined!,
    ...links,
  ].filter(item => !!item);
}
