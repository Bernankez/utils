# Contributing

## Development

Clone this repo and install the dependencies.

```bash
$ pnpm install
```

Start VitePress for preview and documenting.

```bash
$ pnpm dev
```

## Contributing

Follow the prompts if you are going to add a new function.

1. Create a directory under `/functions`, naming the directory using your function's name in camelCase. (An exception is if you are creating a type helper function, in which case you can use PascalCase naming). For example.

```
- functions
  - myFunction
  - Prettier /** a type helper function **/
```

2. Create files under your directory.
- [Required] Create an `index.md`. It's your function's document.
- [Required] Create an entry file. (Mostly should be `index.ts`). Export your function using `export { myFunction }`. Do not use default exports such as `export default myFunction`.

:::info
The entry file name should match the runtime environment of your function. Here is a mapping of environment and entry file name.

|Environment|Entry file name|
|:--:|:--:|
| Browser & Node (Default) | `index.ts`|
| Node only | `index.node.ts` |
| Browser only | `index.browser.ts` |
| Vue | `index.vuejs.ts` |
| TypeScript | `index.typescript.ts` |
:::

- [Optional] Create a `demo.vue`. You don't need to manually reference it in the documentation. It will be automatically included in your document. A demo can visually demonsrate the function's purpose.

- [Optional] Create a `index.test.ts`. It's a good practice writing unit tests.

3. Export your function in `/functions/[index|node|browser|vue].ts`. It depends on your function's runtime environment. Type helpers should export from `/functions/index.ts`.

## Reference

### Directory structure reference

An example directory structure might look like this.
```
- functions
  - myFunctionUnivalsal
    - index.ts
    - index.md
    - demo.vue
    - index.test.ts
  - myFunctionNode
    - index.node.ts
    - index.md
  - myFunctionBrowser
    - index.browser.ts
    - index.md
  - myFunctionVue
    - index.vuejs.ts
    - index.md
  - myFunctionTs
    - index.typescript.ts
    - index.md
```

### Documentation reference

``````
---
category: CategoryOfFunction
---

# myFunction

Function description.

## Usage

```ts
import { myFunction } from "@bernankez/utils";

myFunction();
```

``````