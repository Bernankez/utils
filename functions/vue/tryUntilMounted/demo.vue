<template>
  <div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue-demi";
import { tryUntilMounted } from "@bernankez/utils/vue";

const text = ref("unmount");

tryUntilMounted(() => {
  text.value = "mounted";
});
</script>
