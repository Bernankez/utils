---
category: Type
---

# Prettier

Prettier type hints.

## Usage

```ts
import type { Prettier } from "@bernankez/utils";

interface Foo {
  type: string;
}

interface Bar {
  count: number;
}

type Combined = Foo & Bar; // type Combined = Foo & Bar

type Pretty = Prettier<Combined>; // type Pretty = { type: string; count: number; }
```