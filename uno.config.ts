import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      node: "#44883e",
      browser: "#0095dd",
    },
  },
});
