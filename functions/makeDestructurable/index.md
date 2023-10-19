---
category: Processing
---

# makeDestructurable

Same as VueUse's [`makeDestructurable`](https://vueuse.org/shared/makeDestructurable/). See [antfu's posts](https://antfu.me/posts/destructuring-with-object-or-array) for more detail.

## Usage

```ts
import { makeDestructurable } from "@bernankez/utils";

const foo = { name: "foo" };
const bar = 1024;

const obj = makeDestructurable(
  { foo, bar } as const,
  [foo, bar] as const
);
```

Use

```ts
let { foo, bar } = obj;
let [foo, bar] = obj;
```