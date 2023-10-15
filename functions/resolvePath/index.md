---
category: Alternative
---

# resolvePath

CommonJS paths polyfill for esm.

## Usage

```ts
import { resolvePath } from "@bernankez/utils/node";

const { __dirname, __filename, root } = resolvePath(import.meta.url);
```


