<template>
  <div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue-demi";
import { tryUntilMounted } from "@bernankez/utils";

const text = ref("unmounted");

tryUntilMounted(() => {
  text.value = "mounted";
});
</script>
