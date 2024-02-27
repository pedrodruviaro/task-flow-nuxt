<script setup lang="ts">
import { BASE_TITLE } from "~/constants/siteInfos"
</script>

<template>
  <header class="border-b-2 border-slate-200 py-4 bg-white">
    <UContainer class="flex items-center gap-3 flex-wrap justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/logo.svg" width="30" height="30" />
        <span class="font-semibold text-xl md:text-2xl">{{ BASE_TITLE }}</span>
      </NuxtLink>

      <div class="flex items-center gap-4">
        <UChip size="lg">
          <UButton icon="i-heroicons-bell-alert" color="gray" />
        </UChip>
        <ProfileMenu />
      </div>
    </UContainer>
  </header>
</template>
