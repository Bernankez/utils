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

1. Directories under `/functions` corresponding to different entry points.

|Directory|Entry|Environment|
|:--:|:--:|:--:|
| core | `@bernankez/utils` | Node & Browser |
| node | `@bernankez/utils/node` | Node |
| browser | `@bernankez/utils/browser` | Browser |
| vue | `@bernankez/utils/vue` | Vue |

Choose your entry point and make a directory. Naming the directory using your function's name in `camelCase`. (An exception is if you are creating a type helper function, in which case you can use `PascalCase` naming). For example

```
- functions
  - core
    - Prettier /** a type helper function */
  - node
    - resolvePath
```

2. Create files under your directory.
- [Required] Create an `index.md`. It's your function's document.
- [Required] Create an entry file. Export your function using `export { myFunction }`. Do not use default exports such as `export default myFunction`.

- [Optional] Create a `demo.vue`. You don't need to manually reference it in the documentation. It will be automatically included in your document. A demo can visually demonsrate the function's purpose.

- [Optional] Create a `index.test.ts`. It's a good practice writing unit tests.

3. Export your function in `/functions/[core|node|browser|vue]/index.ts`. It depends on your function's runtime environment. Type helpers should export from `/functions/core/index.ts`.

4. Restart VitePress. Now you can see your function page and developing your function.

## Reference

### Directory structure reference

An example directory structure might look like this.

```
- functions
  - core
    - myFunction
      - index.ts
      - index.md
      - demo.vue
      - index.test.ts
  - node
    - myNodeOnlyFunction
      - index.ts
      - index.md
      - index.test.ts
```

### Documentation reference

``````
---
category: CategoryOfFunction
alias: mf
---

# myFunction

Function description.

## Usage

```ts
import { myFunction } from "@bernankez/utils";

myFunction();
```

``````