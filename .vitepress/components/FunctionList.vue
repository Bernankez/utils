<template>
  <div class="flex flex-col flex-gap-2">
    <div v-for="category in categoriesOrder" :key="category">
      <div class="w-fit font-bold text-primary-1">
        {{ category }}
      </div>
      <div class="m-l-3 m-t-1 flex flex-gap-2">
        <a v-for="func in functionsWithCategory[category]" :key="func.name" class="w-fit rounded-2 bg-gray-100 p-x-2 p-y-1 text-#333!" :href="func.url.doc.replace(/https?:\/\/utils\.keke\.cc\//g, '/')">
          {{ func.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categoriesOrder, functionsWithCategory } from "~/metadata/functions";
</script>
