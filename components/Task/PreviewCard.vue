<script setup lang="ts">
import { TASK_STATUS } from "~/constants/tasks/status"
import { TASK_PRIORITIES } from "~/constants/tasks/priorities"
import type { TaskPriorities, TaskStatus } from "~/types"

interface Props {
  task: any
}

interface Emits {
  (e: "openDetails", value: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

function openDetailsModal() {
  emits("openDetails", true)
}
</script>

<template>
  <div
    @click="openDetailsModal"
    class="cursor-pointer hover:opacity-70 hover:shadow-md transition-all"
  >
    <UCard>
      <div
        class="grid gap-2 justify-items-start lg:items-center lg:grid-cols-[1fr_1fr_max-content]"
      >
        <p class="font-semibold text-lg lg:truncate lg:max-w-80 xl:max-w-96">
          {{ task.title }}
        </p>

        <span class="flex items-center gap-2 text-sm">
          <span
            class="block w-2 h-2 rounded-full"
            :style="{ background: TASK_STATUS[task.status as TaskStatus].color }"
          ></span>
          {{ TASK_STATUS[task.status as TaskStatus].label }}
        </span>

        <UBadge :color="TASK_PRIORITIES[task.priority as TaskPriorities].color">
          {{ TASK_PRIORITIES[task.priority as TaskPriorities].label }}
        </UBadge>
      </div>
    </UCard>
  </div>
</template>
