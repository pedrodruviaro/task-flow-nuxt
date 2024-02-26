<script setup lang="ts">
import { BASE_TITLE } from "~/constants/siteInfos"
</script>

<template>
  <header class="border-b-2 border-slate-200 py-4">
    <UContainer>
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/logo.svg" width="30" height="30" />
        <span class="font-semibold text-2xl">{{ BASE_TITLE }}</span>
      </NuxtLink>
    </UContainer>
  </header>
</template>
