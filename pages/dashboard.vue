<script setup lang="ts">
const title = "Dashboard"
const description =
  "TaskFlow é a solução ideal para organizar projetos e tarefas, mantendo equipes alinhadas e produtivas."

useSeoMeta({ title, description })

definePageMeta({
  redirect: "/dashboard/projects",
})
</script>

<template>
  <div class="grid md:grid-cols-[max-content_1fr] items-start gap-4 lg:gap-12">
    <UCard>
      <DashboardMenu />
    </UCard>
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
