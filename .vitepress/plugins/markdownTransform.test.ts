import { describe, expect, it } from "vitest";
import { markdownTransform } from "./markdownTransform";

const transform = markdownTransform().transform as (code: string, id: string) => string | null;

const funcWithNodeEnv = `
---
category: Processing
---

# masking

String masking.

## Usage

\`\`\`ts
import { masking } from "@bernankez/utils";

const pkg = "@bernankez/utils";

const masked = masking(pkg, [3, -3]); // "@be**********ils"

const masked1 = masking(pkg, [[2, 4], [6, 8]]); // @b**na**ez/utils

const masked2 = masking(pkg, [3, -3], "-"); // @be----------ils
\`\`\`
`;

const funcWithVueEnv = `
---
category: Vue
---

# tryUntilMounted

## Usage

\`\`\`vue
<script setup >
import { tryUntilMounted } from "@bernankez/utils/vue";

tryUntilMounted(() => {
  // Will excute on mounted
});
</script>
\`\`\`
`;

describe("markdownTransform", () => {
  it("", () => {
    expect(transform(funcWithNodeEnv, "functions/resolvePath/index.md")).toMatchInlineSnapshot(`
      "
      ---
      category: Processing
      ---

      # masking

      <FunctionInfo fn=\\"resolvePath\\"/>

      String masking.

      ## Usage

      \`\`\`ts
      import { masking } from \\"@bernankez/utils\\";

      const pkg = \\"@bernankez/utils\\";

      const masked = masking(pkg, [3, -3]); // \\"@be**********ils\\"

      const masked1 = masking(pkg, [[2, 4], [6, 8]]); // @b**na**ez/utils

      const masked2 = masking(pkg, [3, -3], \\"-\\"); // @be----------ils
      \`\`\`

      ## Source

      <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/resolvePath/index.node.ts\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Source(Node)</a> • <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/resolvePath/index.md\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Docs</a> • <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/resolvePath/index.test.ts\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Tests</a>
      "
    `);

    expect(transform((funcWithVueEnv), "functions/tryUntilMounted/index.md")).toMatchInlineSnapshot(`
      "
      ---
      category: Vue
      ---

      # tryUntilMounted

      <FunctionInfo fn=\\"tryUntilMounted\\"/>

      <script setup>
      import Demo from \\"./demo.vue\\";
      </script>

      ## Demo

      <DemoWrapper source=https://github.com/Bernankez/utils/blob/master/functions/tryUntilMounted/demo.vue>
        <Demo />
      </DemoWrapper>

      ## Usage

      \`\`\`vue
      <script setup >
      import { tryUntilMounted } from \\"@bernankez/utils/vue\\";

      tryUntilMounted(() => {
        // Will excute on mounted
      });
      </script>
      \`\`\`

      ## Source

      <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/tryUntilMounted/index.vuejs.ts\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Source(Vue)</a> • <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/tryUntilMounted/demo.vue\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Demo</a> • <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/tryUntilMounted/index.md\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Docs</a>
      "
    `);
  });
});
