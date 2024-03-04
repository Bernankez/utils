# Utils

[![npm](https://img.shields.io/npm/v/@bernankez/utils?color=red&label=npm)](https://www.npmjs.com/package/@bernankez/utils)
[![CI](https://github.com/Bernankez/utils/workflows/CI/badge.svg)](https://github.com/Bernankez/utils/actions)
[![LICENSE](https://shields.io/github/license/Bernankez/utils)](https://github.com/Bernankez/utils/blob/master/LICENSE)

<h3>
  <samp>
    Using utils out-of-the-box.
  </samp>
</h3>

> [!WARNING]
> Refactoring
> Todo
- [x] .vitepress/config.ts
- [ ] .vitepress/plugins
- [ ] .vitepress/components/FunctionInfo.vue
- [x] .vitepress/components/FunctionList.vue
- [ ] functions/resolver.ts
- [ ] guide/contributing.md

## Install

```bash
npm add @bernankez/utils
```

## Usage

```ts
import { masking } from "@bernankez/utils";

const pkg = "@bernankez/utils";
const masked = masking(pkg, [3, -3]);
console.log(masked); // @be**********ils
```

Read the [documentations](https://utils.keke.cc) for more details.