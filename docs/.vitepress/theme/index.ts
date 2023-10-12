import DefaultTheme from "vitepress/theme";
import Badge from "../components/Badge.vue";
import "virtual:uno.css";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component("Badge", Badge);
  },
};
