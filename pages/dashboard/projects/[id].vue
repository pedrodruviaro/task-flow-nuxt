<script setup lang="ts">
import type { Database } from "@/supabase"
import { TASK_STATUS } from "~/constants/tasks/status"

const route = useRoute()
const id = computed(() => Number(route.params.id))
const isTaskModalOpen = ref(false)

const supabase = useSupabaseClient<Database>()

const { data: project } = await useAsyncData("project", async () => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("id", id.value)
    .single()

  if (error) {
    throw createError({
      fatal: true,
      statusCode: 500,
      statusMessage: "Something went wrong, refresh and try again",
    })
  }

  return data
})

const { data: tasks } = await useAsyncData("tasks", async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("project_id", id.value)

  if (error) {
    throw createError({
      fatal: true,
      statusCode: 500,
      statusMessage: "Something went wrong, refresh and try again",
    })
  }

  return data
})

const tasksCompletedPercentage = computed(() => {
  const totalTasks = tasks.value?.length
  const totalCompleteTasks = tasks.value?.filter(
    (t) => t.status == "completed"
  ).length

  if (!totalCompleteTasks || !totalTasks) return 0

  return Math.ceil((100 * totalCompleteTasks) / totalTasks)
})

const tasksCount = computed(() => {
  const rels: any = {
    total: tasks.value?.length,
  }

  tasks.value?.forEach((task) => {
    if (!rels[task.status]) {
      rels[task.status] = 0
    }

    rels[task.status] = rels[task.status] + 1
  })

  return rels
})
</script>

<template>
  <div>
    <!-- infos do projeto -->
    <div class="grid gap-4 lg:grid-cols-2">
      <section class="space-y-4">
        <h1 class="font-bold text-2xl">{{ project?.title }}</h1>
        <p class="text-slate-600">{{ project?.description }}</p>

        <div class="flex flex-wrap gap-2">
          <UBadge
            color="blue"
            v-for="category in project?.categories"
            :key="category"
            >{{ category }}</UBadge
          >
        </div>

        <UBadge variant="soft">Due Date: {{ project?.due_date }}</UBadge>

        <UMeter
          :value="tasksCompletedPercentage"
          indicator
          icon="i-heroicons-chart-bar"
          label="Completed Tasks"
          class="max-w-[20rem]"
        />
      </section>

      <section class="grid gap-2 grid-cols-2">
        <UCard v-for="(stat, key) in TASK_STATUS">
          <h3 class="mb-2 text-slate-600">{{ stat.label }}</h3>
          <p class="font-bold text-4xl text-slate-700">{{ tasksCount[key] }}</p>
        </UCard>
        <UCard>
          <h3 class="mb-2 text-slate-600">Total</h3>
          <p class="font-bold text-4xl text-slate-700">
            {{ tasksCount.total }}
          </p>
        </UCard>
      </section>
    </div>

    <!-- bloco de criacao de tarefa -->
    <section
      class="flex justify-between items-center gap-3 flex-wrap mt-10 lg:mt-14"
    >
      <h2 class="font-bold text-2xl">Tasks</h2>
      <UButton trailingIcon="i-heroicons-plus">Create</UButton>
    </section>

    <!-- Listagem das tarefas -->
    <section class="mt-4">
      <div v-if="tasks && tasks.length > 0">
        <div class="grid gap-4">
          <TaskPreviewCard
            v-for="task in tasks"
            :task="task"
            @openDetails="isTaskModalOpen = true"
          />
        </div>
      </div>
    </section>

    <!-- Task Details -->
    <TaskDetailsModal v-model="isTaskModalOpen" />
  </div>
</template>
