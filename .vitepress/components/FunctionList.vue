<template>
  <div class="flex flex-col flex-gap-2">
    <div v-for="category in categoriesOrder" :key="category">
      <div class="w-fit font-bold text-primary-1">
        {{ category }}
      </div>
      <div class="m-l-3 m-t-1 flex flex-gap-2">
        <a v-for="func in functionsWithCategory[category]" :key="func.name" class="w-fit rounded-1 bg-code p-x-2 p-y-.5 font-400! text-default! decoration-none!" :href="func.url.doc.replace(/https?:\/\/utils\.keke\.cc\//g, '/')">
          {{ func.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categoriesOrder, functionsWithCategory } from "~/metadata/functions";
</script>
