<template>
  <span class="rounded-full p-x-2 p-y-.5 text-3.5" :class="[type, props.class]" :style="{ backgroundColor, color }">
    <slot>
      {{ text }}
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Type = "info" | "tip" | "warning" | "danger" | "node" | "browser";

const props = withDefaults(defineProps<{
  text?: string;
  type?: Type;
  backgroundColor?: string;
  color?: string;
  class?: any;
}>(), {
  type: "info",
});

const text = computed(() => {
  if (props.type === "node") {
    return "Nodejs Only";
  } else if (props.type === "browser") {
    return "Browser Only";
  }
  return props.text;
});
</script>

<style scoped>
.info {
  background-color: var(--vp-badge-info-bg);
}

.tip {
  background-color: var(--vp-badge-tip-bg);
}

.danger {
  background-color: var(--vp-badge-danger-bg);
}

.warning {
  background-color: var(--vp-badge-warning-bg);
}

.node {
  color: white;
  background-color: #44883e;
}

.browser {
  color: white;
  background-color: #0095dd;
}
</style>
