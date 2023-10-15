<template>
  <div class="flex flex-col flex-gap-4">
    <div>
      Origin string: <input v-model="str" type="text" />
    </div>
    <div class="flex flex-gap-3">
      Mask range:
      <input v-model="maskRange" type="text" />
    </div>
    <div class="flex flex-gap-3">
      Mask code:
      <input v-model="maskStr" type="text" />
    </div>
    <div class="flex flex-gap-2">
      Masked: <pre v-if="masked">{{ masked }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue-demi";
import { masking } from ".";

const str = ref("@bernankez/utils");
const maskRange = ref("[2,-2]");
const maskStr = ref("*");
const masked = computed(() => masking(str.value, JSON.parse(maskRange.value), maskStr.value));
</script>
