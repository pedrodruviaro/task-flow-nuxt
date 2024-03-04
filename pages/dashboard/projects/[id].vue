<script setup lang="ts">
import type { Database } from "@/supabase"
import type { Task } from "~/types"
import { TASK_STATUS } from "~/constants/tasks/status"

const route = useRoute()
const id = computed(() => Number(route.params.id))
const isTaskModalOpen = ref(false)

const supabase = useSupabaseClient<Database>()

function getProject() {
  return supabase.from("projects").select().eq("id", id.value).single()
}

function getTasks() {
  return supabase.from("tasks").select().eq("project_id", id.value)
}

async function getData() {
  try {
    const [project, tasks] = await Promise.all([getProject(), getTasks()])

    return { project, tasks }
  } catch (error) {
    throw createError({
      fatal: true,
      statusCode: 500,
      statusMessage: "Something failed... refresh and try again",
    })
  }
}

const { project, tasks } = await getData()

const tasksCompletedPercentage = computed(() => {
  const totalTasks = tasks?.data?.length
  const totalCompleteTasks = tasks?.data?.filter(
    (t) => t.status == "completed"
  ).length

  if (!totalCompleteTasks || !totalTasks) return 0

  return Math.ceil((100 * totalCompleteTasks) / totalTasks)
})

const tasksCount = computed(() => {
  const rels: any = {
    total: tasks.data?.length,
  }

  tasks.data?.forEach((task) => {
    if (!rels[task.status]) {
      rels[task.status] = 0
    }

    rels[task.status] = rels[task.status] + 1
  })

  return rels
})

const selectedTask = ref()

function handleSelectTask(task: Task) {
  isTaskModalOpen.value = true
  selectedTask.value = task
}
</script>

<template>
  <div>
    <!-- infos do projeto -->
    <div class="grid gap-4 lg:grid-cols-2">
      <section class="space-y-4">
        <h1 class="font-bold text-2xl">{{ project?.data?.title }}</h1>
        <p class="text-slate-600">{{ project?.data?.description }}</p>

        <div class="flex flex-wrap gap-2">
          <UBadge
            color="blue"
            v-for="category in project?.data?.categories"
            :key="category"
            >{{ category }}</UBadge
          >
        </div>

        <UBadge variant="soft">Due Date: {{ project?.data?.due_date }}</UBadge>

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
      <div v-if="tasks.data && tasks?.data?.length > 0">
        <div class="grid gap-4">
          <TaskPreviewCard
            v-for="task in tasks.data"
            :task="task"
            @openDetails="handleSelectTask(task)"
          />
        </div>
      </div>
    </section>

    <!-- Task Details -->
    <TaskDetailsModal
      v-if="isTaskModalOpen"
      v-model="isTaskModalOpen"
      :task="selectedTask"
    />
  </div>
</template>
