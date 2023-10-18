<template>
  <div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue-demi";
import { waitUntilMounted } from "@bernankez/utils/vue";

const text = ref("unmount");

async function init() {
  await waitUntilMounted();
  text.value = "mounted";
}

init();
</script>
