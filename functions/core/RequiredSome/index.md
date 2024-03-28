---
category: Type
---

# RequiredSome

Pick some keys from an object and make it required.

## Usage

```ts
import type { RequiredSome } from "@bernankez/utils";

interface Foo {
  a?: string;
  b?: number;
  c: string[];
  d?: Record<string, string>;
}

type Bar = RequiredSome<Foo, "c" | "d">;
// {
//     a?: string | undefined;
//     b?: number | undefined;
//     c: string[];
//     d: Record<string, string>;
// }
```