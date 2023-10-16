import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#c14344",
        1: "#c14344",
        2: "#ce696a",
        3: "#c75657",
      },
      node: "#44883e",
      browser: "#0095dd",
    },
  },
});
