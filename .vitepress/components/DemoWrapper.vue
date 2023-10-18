<template>
  <div class="demo-wrapper relative rounded-0 bg-code-block p-x-6 p-y-4 -m-x-24px sm:m-x-0 sm:rounded-2">
    <a :href="source" target="_blank" class="absolute right-2 top-1 text-3.5 decoration-none!">
      source
    </a>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import "@unocss/reset/tailwind-compat.css";

defineProps<{
  source: string;
}>();
</script>

<style scoped>
.demo-wrapper {
  font-family: Avenir, system-ui, -apple-system, "Segoe UI", Rototo, Emoji, Helvetica, Arial, sans-serif;
}

.demo-wrapper :deep(input) {
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
}

.dark .demo-wrapper :deep(input) {
  background-color: #333 !important;
}

.demo-wrapper :deep(button) {
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease;
}

.demo-wrapper :deep(button:hover) {
  background-color: #e9e9e9;
}

.dark .demo-wrapper :deep(button:hover) {
  background-color: #222;
}

.demo-wrapper :deep(button:active) {
  background-color: #ddd;
}

.dark .demo-wrapper :deep(button:active) {
  background-color: #333;
}
</style>
