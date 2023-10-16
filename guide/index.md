# Getting Started

::: warning
🚧 This library is still under development. Any APIs may change without notification. Use at your own risk. 🚧
:::

## Installation

::: code-group
```bash [npm]
$ npm add @bernankez/utils
```

```bash [pnpm]
$ pnpm add @bernankez/utils
```

```bash [yarn]
$ yarn add @bernankez/utils
```

```bash [bun]
$ bun add @bernankez/utils
```
:::

## Usage

Importing the functions you need from `@bernankez/utils`

```ts
import { masking } from "@bernankez/utils";

const pkg = "@bernankez/utils";
const masked = masking(pkg, [3, -3]);
console.log(masked); // @be**********ils
```

### Using with `unplugin-auto-import`

First, follow the [`unplugin-auto-import` installation](https://github.com/unplugin/unplugin-auto-import#install).

And then

```ts
// vite.config.ts
import AutoImport from "unplugin-auto-import/vite";
import { UtilsResolver } from "@bernankez/utils/resolver"; // [!code ++]

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [UtilsResolver()] // [!code ++]
    }),
  ],
});
```

---

See all functions [HERE](/functions/).