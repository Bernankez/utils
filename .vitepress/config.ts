import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import functions from "../metadata/functions.json";
import { markdownTransform } from "./plugins/markdownTransform";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR_ROOT = resolve(__dirname, "..");

const categoriesOrder = [
  "Alternative",
  "String",
  "Validate",
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
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
        ...getFunctionsSidebar(),
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Bernankez/utils" },
    ],
    search: {
      provider: "local",
    },
  },
  vite: {
    plugins: [UnoCSS(), markdownTransform()],
    resolve: {
      alias: {
        "@": join(DIR_ROOT, "./functions"),
        "~": join(DIR_ROOT, "./"),
        "@bernankez/utils": join(DIR_ROOT, "./functions"),
        "@bernankez/utils/node": join(DIR_ROOT, "./functions/node.ts"),
        "@bernankez/utils/browser": join(DIR_ROOT, "./functions/browser.ts"),
      },
    },
  },
});

function getFunctionsSidebar() {
  const links: DefaultTheme.Sidebar = [];
  const ungrouped: DefaultTheme.SidebarItem[] = [];
  const categories = {} as Record<string, DefaultTheme.SidebarItem[]>;
  for (const func of functions) {
    if (!func.category) {
      ungrouped.push({
        text: func.name,
        link: `/functions/${func.name}/`,
      });
      continue;
    }
    if (!categoriesOrder.includes(func.category)) {
      categoriesOrder.push(func.category);
    }
    if (!categories[func.category]) {
      categories[func.category] = [];
    }
    categories[func.category].push({
      text: func.name,
      link: `/functions/${func.name}/`,
    });
  }
  links.push(...ungrouped.sort((a, b) => a.text!.localeCompare(b.text!)));
  for (const category of categoriesOrder) {
    links.push({
      text: category,
      items: categories[category].sort((a, b) => a.text!.localeCompare(b.text!)),
    });
  }
  return links;
}
