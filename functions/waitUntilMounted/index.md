---
category: Vue
---

# waitUntilMounted

## Usage

```vue
<script setup>
import { waitUntilMounted } from "@bernankez/utils";

async function init() {
  await waitUntilMounted();
  // Will excute on mounted
}

init();
</script>
```