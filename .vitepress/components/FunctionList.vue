<template>
  <div class="flex flex-col flex-gap-2">
    <div v-if="functionsWithoutCategory.length">
      <div class="w-fit font-bold text-primary-1">
        Ungrouped
      </div>
      <div class="m-l-3 m-t-1 flex flex-gap-2">
        <a v-for="func in functionsWithoutCategory" :key="func.name" class="w-fit rounded-1 bg-code p-x-2 p-y-.5 hover:bg-rose-50 font-400! text-default! decoration-none! transition! dark:hover:bg-dark-100" :href="func.doc.replace(/https?:\/\/utils\.keke\.cc\//g, '/')">
          {{ func.name }}
        </a>
      </div>
    </div>
    <div v-for="category in categories" :key="category">
      <div class="w-fit font-bold text-primary-1">
        {{ category }}
      </div>
      <div class="m-l-3 m-t-1 flex flex-gap-2">
        <a v-for="func of functionsWithCategory.find(functions => functions[0] === category)?.[1]" :key="func.name" class="w-fit rounded-1 bg-code p-x-2 p-y-.5 hover:bg-rose-50 font-400! text-default! decoration-none! transition! dark:hover:bg-dark-100" :href="func.doc.replace(/https?:\/\/utils\.keke\.cc\//g, '/')">
          {{ func.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories, functionsWithCategory, functionsWithoutCategory } from "~/metadata/functions";
</script>
