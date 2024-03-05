<script setup lang="ts">
import type { Database } from "@/supabase"
import type { Project, Task, TaskStatus } from "~/types"
import { TASK_STATUS } from "~/constants/tasks/status"

const route = useRoute()
const id = computed(() => Number(route.params.id))

const supabase = useSupabaseClient<Database>()

function getProject() {
  return supabase.from("projects").select().eq("id", id.value).single()
}

function getTasks() {
  return supabase
    .from("tasks")
    .select()
    .eq("project_id", id.value)
    .order("created_at", { ascending: true })
}

async function getData() {
  try {
    const [project, tasks] = await Promise.all([getProject(), getTasks()])

    return { fetchedProject: project, fetchedTasks: tasks }
  } catch (error) {
    throw createError({
      fatal: true,
      statusCode: 500,
      statusMessage: "Something failed... refresh and try again",
    })
  }
}

const project = ref<Project>()
const tasks = ref<Task[]>([])

const { fetchedProject, fetchedTasks } = await getData()

if (!fetchedProject.error && !fetchedTasks.error) {
  project.value = fetchedProject.data
  tasks.value = fetchedTasks.data
}

const tasksCompletedPercentage = computed(() => {
  const totalTasks = tasks?.value?.length
  const totalCompleteTasks = tasks?.value?.filter(
    (t) => t.status == "completed"
  ).length

  if (!totalCompleteTasks || !totalTasks) return 0

  return Math.ceil((100 * totalCompleteTasks) / totalTasks)
})

const tasksCount = computed(() => {
  const rels: Record<TaskStatus, number> = {
    completed: 0,
    in_progress: 0,
    on_review: 0,
  }

  tasks.value?.forEach((task) => {
    rels[task.status as TaskStatus]++
  })

  return rels
})

// open task details
const selectedTask = ref()
const isTaskModalOpen = ref(false)

function handleSelectTask(task: Task) {
  isTaskModalOpen.value = true
  selectedTask.value = task
}

// open new task form
const { notify } = useNotifications()

const isTaskFormModalOpen = ref(false)
const isLoadingTasks = ref(false)

async function handleRefetchTasks() {
  isTaskFormModalOpen.value = false

  try {
    isLoadingTasks.value = true

    const { data, error } = await getTasks()

    if (!error) {
      tasks.value = data
    }
  } catch (error) {
    notify({
      title: "Something failed... please refresh the page",
      type: "error",
    })
  } finally {
    isLoadingTasks.value = false
  }
}
</script>

<template>
  <div>
    <!-- infos do projeto -->
    <UCard class="mb-10">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <ProjectDueDate v-if="project?.due_date" :dueDate="project.due_date" />

        <div class="flex items-center gap-1">
          <UButton
            variant="ghost"
            icon="i-heroicons-pencil-square-solid"
            color="gray"
          />

          <UButton variant="ghost" icon="i-heroicons-trash" color="gray" />
        </div>
      </div>
    </UCard>

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
            {{ tasks?.length }}
          </p>
        </UCard>
      </section>
    </div>

    <!-- bloco de criacao de tarefa -->
    <section
      class="flex justify-between items-center gap-3 flex-wrap mt-10 lg:mt-14"
    >
      <h2 class="font-bold text-2xl">Tasks</h2>
      <UButton
        trailingIcon="i-heroicons-plus"
        @click="isTaskFormModalOpen = true"
        >Create</UButton
      >
    </section>

    <!-- Listagem das tarefas -->
    <section class="mt-4">
      <div v-if="tasks && !isLoadingTasks">
        <div class="grid gap-4">
          <TaskPreviewCard
            v-for="task in tasks"
            :task="task"
            @openDetails="handleSelectTask(task)"
          />
        </div>
      </div>

      <div class="grid gap-4" v-else>
        <USkeleton
          class="w-full h-[100px] bg-slate-200"
          v-for="i in 4"
          :key="i"
        />
      </div>
    </section>

    <!-- Task Details -->
    <TaskDetailsModal
      v-if="isTaskModalOpen"
      v-model="isTaskModalOpen"
      :task="selectedTask"
    />

    <!-- Task new modal -->
    <UModal v-if="isTaskFormModalOpen && project" v-model="isTaskFormModalOpen">
      <UCard>
        <template #header>
          <h2>Add Task</h2>
        </template>
        <TaskForm :projectId="project?.id" @submited="handleRefetchTasks" />
      </UCard>
    </UModal>
  </div>
</template>
