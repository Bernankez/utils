# Getting Started

::: warning
🚧 This library is still under development. Any APIs may change without notification. Use at your own risk.
:::

## Installation

::: code-group
```bash [npm]
$ npm add @bernankez/utils
```

```bash [pnpm]
$ pnpm add @bernankez/utils
```
:::

## Usage

Importing the functions you need from `@bernankez/utils`

```ts
import { masking } from "@bernankez/utils";

const email = "bernankeic@gmail.com";
const maskedEmail = masking(email, [2, -3]);
console.log(maskedEmail); // be*************com
```

See all functions [HERE](/functions/).