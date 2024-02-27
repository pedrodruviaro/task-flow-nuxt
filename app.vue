<script setup lang="ts">
import { BASE_TITLE } from "@/constants/siteInfos"

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${BASE_TITLE}` : BASE_TITLE
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="4" color="#f97316" />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>

<style>
html,
body {
  @apply bg-slate-100;
  font-family: "Inter", system-ui, Roboto, sans-serif;
}
</style>
