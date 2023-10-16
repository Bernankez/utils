import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Badge from "../components/Badge.vue";
import DemoWrapper from "../components/DemoWrapper.vue";
import FunctionInfo from "../components/FunctionInfo.vue";
import FunctionList from "../components/FunctionList.vue";
import "virtual:uno.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component("Badge", Badge);
    ctx.app.component("DemoWrapper", DemoWrapper);
    ctx.app.component("FunctionInfo", FunctionInfo);
    ctx.app.component("FunctionList", FunctionList);
  },
} satisfies Theme;
