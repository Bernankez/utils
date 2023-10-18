import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      primary: {
        DEFAULT: "var(--vp-c-brand-1)",
        1: "var(--vp-c-brand-1)",
        2: "var(--vp-c-brand-2)",
        3: "var(--vp-c-brand-3)",
      },
      node: "#44883e",
      browser: "#0095dd",
      code: "var(--vp-code-bg)",
      codeBlock: "var(--vp-code-block-bg)",
      default: {
        DEFAULT: "var(--vp-c-text-1)",
        1: "var(--vp-c-text-1)",
      },
    },
  },
});
