<script setup lang="ts">
import type { Database } from "@/supabase"

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
</script>

<template>
  <div>
    <!-- infos do projeto -->
    <section>
      <h1 class="font-bold text-2xl">{{ project?.title }}</h1>
      <p class="text-slate-600 my-4">{{ project?.description }}</p>
      <UBadge variant="soft">Due Date: {{ project?.due_date }}</UBadge>
      <UMeter
        :value="tasksCompletedPercentage"
        indicator
        icon="i-heroicons-chart-bar"
        label="Completed Tasks"
      />
    </section>

    <!-- 4 blocos com o resumo das tarefas (4 status) -->
    <section></section>

    <!-- bloco de criacao de tarefa -->
    <section class="flex justify-between items-center gap-3 flex-wrap mt-10">
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
