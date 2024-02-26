<script setup lang="ts">
import { BASE_TITLE } from "~/constants/siteInfos"

const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<template>
  <footer class="py-6">
    <UContainer class="grid place-items-center">
      <p class="text-sm">
        &copy; Copyright {{ BASE_TITLE }} -
        {{ currentYear }}
      </p>
    </UContainer>
  </footer>
</template>
