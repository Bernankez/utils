---
category: Alternative
---

# resolvePath

CommonJS paths polyfill for esm.

## Usage

```ts
import { resolvePath } from "@bernankez/utils/node";

const { __dirname, __filename, root, require } = resolvePath(import.meta.url);
```


