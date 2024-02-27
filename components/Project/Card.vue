<script setup lang="ts">
interface Props {
  project: any
}

const props = defineProps<Props>()

const date = computed(() => {
  return props.project.due_date.split("T")[0]
})
</script>

<template>
  <UCard class="grid grid-rows-[max-content_1fr_max-content]">
    <template #header>
      <div class="flex items-start gap-2 justify-between">
        <h2 class="font-semibold text-slate-500">{{ project.title }}</h2>
        <UButton
          variant="ghost"
          icon="i-heroicons-ellipsis-vertical-20-solid"
        />
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

        <UMeter
          :value="35"
          indicator
          icon="i-heroicons-chart-bar"
          label="Completed"
        />
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
</template>
