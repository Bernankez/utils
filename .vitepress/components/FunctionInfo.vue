<template>
  <div class="m-t-3 flex flex-col flex-gap-2 rounded-2 bg-blue-50 p-3 text-3.5 dark:bg-blue-900 dark:bg-opacity-20!">
    <div v-if="func.additions.category" class="info">
      <div class="title">
        Category
      </div>
      {{ func.additions.category }}
    </div>
    <div v-for="(addition, i) in additions" :key="i" class="info">
      <div class="title capitalize">
        {{ addition.title }}
      </div>
      {{ addition.value }}
    </div>
    <div class="info">
      <div class="title">
        Environment
      </div>
      {{ envMap[func.entry] }}
    </div>
    <div class="info">
      <div class="title">
        Last updated
      </div>
      {{ dayjs(lastUpdated).format("YYYY/MM/DD HH:mm:ss") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import { getFunction, getFunctionFile } from "~/metadata/functions";
import type { FunctionEntry } from "~/metadata/utils";

const props = defineProps<{
  fn: string;
}>();

const func = computed(() => getFunction(props.fn));

const envMap: Record<FunctionEntry, string> = {
  core: "Node & Browser",
  node: "Node",
  vue: "Vue",
  browser: "Browser",
};

const additions = computed(() => {
  const { category, ...rest } = func.value.additions;
  return Object.entries(rest).map(([title, value]) => ({
    title,
    value,
  })).sort((a, b) => a.title.localeCompare(b.title));
});

const lastUpdated = computed(() => getFunctionFile(func.value, "lib")?.lastUpdated);
</script>

<style scoped>
.info {
  display: flex;
}

.title {
  width: 7rem;
  font-weight: 600;
}
</style>
