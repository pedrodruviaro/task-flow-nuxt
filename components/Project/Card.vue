<script setup lang="ts">
interface Props {
  project: any
}

const props = defineProps<Props>()

const date = computed(() => {
  return props.project.due_date.split("T")[0]
})

const projectLink = computed(() => {
  return `/dashboard/projects/${props.project.id}`
})
</script>

<template>
  <NuxtLink :to="projectLink" class="grid">
    <UCard class="grid grid-rows-[max-content_1fr_max-content]">
      <template #header>
        <div>
          <h2 class="font-semibold text-slate-500">{{ project.title }}</h2>
        </div>
      </template>

      <template #default>
        <div class="grid gap-4 grid-rows-[1fr_max-content_max-content] h-full">
          <p class="text-sm">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              color="blue"
              v-for="category in project.categories"
              :key="category"
              >{{ category }}</UBadge
            >
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end">
          <UBadge variant="soft"
            ><strong class="pr-1">Due Date: </strong>{{ date }}</UBadge
          >
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
