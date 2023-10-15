<template>
  <input v-model="i" type="text" />
  <pre>{{ res }}</pre>
</template>

<script setup lang="ts">
import { computed, ref } from "vue-demi";
import { masking } from ".";

const i = ref("fdfdf");
const res = computed(() => masking(i.value, [2, -2]));
</script>
