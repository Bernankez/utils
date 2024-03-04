---
category: Processing
---

# masking

String masking.

## Usage

```ts
import { masking } from "@bernankez/utils";

const pkg = "@bernankez/utils";

const masked = masking(pkg, [3, -3]); // "@be**********ils"

const masked1 = masking(pkg, [[2, 4], [6, 8]]); // @b**na**ez/utils

const masked2 = masking(pkg, [3, -3], "-"); // @be----------ils
```