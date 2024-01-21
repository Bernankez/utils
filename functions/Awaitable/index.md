---
category: Type
---

# Awaitable

Awaitable type.

## Usage

```ts
import type { Awaitable } from "@bernankez/utils";

type MaybePromise = Awaitable<string>; // string | Promise<string>
```