import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      primary: "#c14344",
      node: "#44883e",
      browser: "#0095dd",
    },
  },
});
