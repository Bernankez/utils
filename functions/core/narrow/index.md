---
category: Type
alias: n
---

# narrow

Get the accurate type of an object or array, without making it readonly.

## Usage

```ts
import { narrow } from "@bernankez/utils";

const a = ["foo", "bar"]; // string[]
const b = ["foo", "bar"] as const; // readonly ["foo", "bar"]
const c = narrow(["foo", "bar"]); // ["foo", "bar"]
```