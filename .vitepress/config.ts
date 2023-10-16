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
        "@": join(DIR_ROOT, "./functions"),
        "~": join(DIR_ROOT, "./"),
        "@bernankez/utils": join(DIR_ROOT, "./functions"),
        "@bernankez/utils/node": join(DIR_ROOT, "./functions/node.ts"),
        "@bernankez/utils/browser": join(DIR_ROOT, "./functions/browser.ts"),
      },
    },
  },
});

function getGuideSidebar() {
  return {
    text: "Guide",
    items: [
      { text: "Getting Started", link: "/guide/" },
    ],
  };
}

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
  return [
    { text: "All functions", link: "/functions/" },
    ...links,
  ];
}
