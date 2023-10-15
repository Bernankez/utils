<template>
  <div class="demo-wrapper relative rounded-2 bg-cool-gray-100 p-5 dark:bg-dark-800">
    <a :href="source" target="_blank" class="absolute right-1 top-1 text-3.5 decoration-none!">
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
.demo-wrapper{
  font-family: Avenir,system-ui,-apple-system,"Segoe UI",Rototo,Emoji,Helvetica,Arial,sans-serif;
}
</style>
