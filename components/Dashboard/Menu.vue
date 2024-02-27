<script setup lang="ts">
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
    label: "New Project",
    icon: "i-heroicons-plus-solid",
    to: "/dashboard/new-project",
  },
]
</script>

<template>
  <UVerticalNavigation :links="links">
    <template #default="{ link }">
      <span class="group-hover:text-primary relative">{{ link.label }}</span>
    </template>
  </UVerticalNavigation>
</template>
