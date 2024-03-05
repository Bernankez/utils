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

      <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/node/resolvePath/index.ts\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Source</a> • <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/node/resolvePath/index.md\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Docs</a> • <a href=\\"https://github.com/Bernankez/utils/blob/master/functions/node/resolvePath/index.test.ts\\" target=\\"_blank\\" style=\\"text-decoration: none\\">Tests</a>
      "
    `);
  });
});
