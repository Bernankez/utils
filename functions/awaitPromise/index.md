---
category: Processing
---

# awaitPromise

Await promise with return value and error without try catch.

## Usage

```ts
import { awaitPromise } from "@bernankez/utils";

// resolve with array destructuring
const promise = Promise.resolve("Hello World!");
const [data, error] = await awaitPromise(promise); // ["Hello World!", null]

// reject with object destructuring
const promiseWithError = Promise.reject("Hello World!");
const { data, error } = await awaitPromise(promiseWithError); // { data: null, error: "Hello World!" }
```