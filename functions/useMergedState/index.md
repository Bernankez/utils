---
category: Vue
---

# useMergedState

Use state both with controlled and uncontrolled.

## Usage

With computed

```ts
import { computed, ref } from "vue";
import { useMergedState } from "@bernankez/utils/vue";

const props = withDefaults(defineProps<{
  defaultValue?: boolean;
  modelValue?: boolean;
}>(), {
  defaultValue: true,
  modelValue: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const controlled = computed(() => props.modelValue);
const uncontrolled = ref(props.defaultValue);
const mergedState = useMergedState(controlled, uncontrolled, (value) => {
  if (value !== undefined) {
    emit("update:modelValue", value);
  }
});
```

With writable computed

```ts
import { computed, ref } from "vue";
import { useMergedState } from "@bernankez/utils/vue";

const props = withDefaults(defineProps<{
  defaultValue?: boolean;
  modelValue?: boolean;
}>(), {
  defaultValue: true,
  modelValue: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const controlled = computed({
  get: () => props.modelValue,
  set: value => value !== undefined && emit("update:modelValue", value)
});
const uncontrolled = ref(props.defaultValue);
const mergedState = useMergedState(controlled, uncontrolled);
```