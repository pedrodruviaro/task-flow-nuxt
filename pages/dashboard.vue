<script setup lang="ts">
const title = "Dashboard"
const description =
  "TaskFlow é a solução ideal para organizar projetos e tarefas, mantendo equipes alinhadas e produtivas."

useSeoMeta({ title, description })

const links = [
  {
    label: "Projects",
    icon: "i-heroicons-window",
    to: "/dashboard/projects",
  },
  {
    label: "Categories",
    icon: "i-heroicons-tag",
    to: "/dashboard/categories",
  },
  {
    label: "Table",
    icon: "i-heroicons-home",
    click: () => console.log("No routes yet"),
  },
]
</script>

<template>
  <div class="grid grid-cols-[max-content_1fr] gap-4 lg:gap-8">
    <section>
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{
            link.label
          }}</span>
        </template>
      </UVerticalNavigation>
    </section>
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
