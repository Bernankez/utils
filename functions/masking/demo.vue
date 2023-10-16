<template>
  <div class="flex flex-col flex-gap-4">
    <div class="line">
      <span class="title">Origin string:</span>
      <input v-model="str" type="text" />
    </div>
    <div class="line">
      <span class="title">Mask range:</span>
      <TransitionGroup name="range-list" tag="div" class="flex flex-col flex-gap-3">
        <div v-for="(r, i) in maskRange" :key="i" class="flex flex-gap-5">
          <div class="flex items-center flex-gap-2">
            from
            <input v-model="r[0]" class="w-full" type="number" />
          </div>
          <div class="flex items-center flex-gap-2">
            to
            <input v-model="r[1]" class="w-full" type="number" />
          </div>
          <button v-if="maskRange.length > 1" @click="maskRange.splice(i, 1)">
            <div class="i-ph:minus-square"></div>
          </button>
        </div>
        <button class="w-fit" @click="addRange">
          <div class="i-ph:plus-square"></div>
        </button>
      </TransitionGroup>
    </div>
    <div class="line">
      <span class="title">Mask code:</span>
      <input v-model="maskStr" type="text" />
    </div>
    <div class="line">
      <span class="title">Masked:</span>
      <pre v-if="masked">{{ masked }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue-demi";
import { masking } from ".";

const str = ref("@bernankez/utils");
const maskRange = ref<[number, number][]>([[2, -2]]);
const maskStr = ref("*");
const masked = computed(() => masking(str.value, maskRange.value, maskStr.value));

function addRange() {
  maskRange.value.push([0, 0]);
}
</script>

<style scoped>
.range-list-move,
.range-list-enter-active,
.range-list-leave-active {
  transition: all 0.3s ease;
}

.range-list-enter-from,
.range-list-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.range-list-leave-active {
  position: absolute;
}

.line {
  display: flex;
  gap: 0.5rem;
}

.title {
  flex-shrink: 0;
  width: 150px;
  font-weight: 700;
}
</style>
