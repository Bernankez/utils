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
const pkg = masking(pkg, [3, -3]);
console.log(pkg); // @be**********ils
```

See all functions [HERE](/functions/).