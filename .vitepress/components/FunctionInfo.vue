<template>
  <div class="m-t-3 flex flex-col flex-gap-2 rounded-2 bg-blue-50 p-3 text-3.5 dark:bg-blue-900 dark:bg-opacity-20!">
    <div class="info">
      <div class="title">
        Category
      </div>
      {{ func?.category }}
    </div>
    <div class="info">
      <div class="title">
        Environment
      </div>
      <div class="flex flex-col flex-gap-2">
        <div v-for="_env in env" :key="_env.title">
          <div class="font-500">
            {{ _env.title }}
          </div>
          <div class="flex flex-gap-3">
            <div class="font-500">
              Last updated
            </div>
            <div>{{ dayjs(_env.lastUpdated).format("YYYY/MM/DD HH:mm:ss") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import functions from "~/metadata/functions.json";
import type { UtilFunction } from "~/metadata/update";

const props = defineProps<{
  fn: string;
}>();

const func = computed(() => functions.find(func => func.name === props.fn) as UtilFunction | undefined);

const env = computed(() => {
  const envs: { title: string; lastUpdated: number }[] = [];
  if (func.value?.file.index) {
    envs.push({
      title: "Browser & Node",
      lastUpdated: func.value.lastUpdated.index!,
    });
  }
  if (func.value?.file.browser) {
    envs.push({
      title: "Browser",
      lastUpdated: func.value.lastUpdated.browser!,
    });
  }
  if (func.value?.file.node) {
    envs.push({
      title: "Node",
      lastUpdated: func.value.lastUpdated.node!,
    });
  }
  return envs;
});
</script>

<style scoped>
.info {
  display: flex;
}

.title {
  width: 6rem;
  font-weight: 600;
}
</style>
